"""
FastAPI Backend for Local RAG Chatbot
Version: 1.0.0
Last Updated: 2024-11-24

Uses Ollama for LLM and local FAISS index for document retrieval.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage, SystemMessage

import os

# Configuration
INDEX_PATH = "faiss_index_local"
EMBEDDINGS_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
OLLAMA_MODEL = "llama3.2"  # Can be changed to "mistral" or other Ollama models
RELEVANCE_THRESHOLD = 1.2  # Distance score threshold for relevance check

# Initialize FastAPI app
app = FastAPI(title="Local RAG Chatbot API")

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for loaded resources
vectorstore = None
llm = None
embeddings = None

def load_resources():
    """Load the FAISS index and initialize Ollama LLM"""
    global vectorstore, llm, embeddings
    
    print("🔄 Loading resources...")
    
    # Check if index exists
    if not os.path.exists(INDEX_PATH):
        raise FileNotFoundError(
            f"FAISS index not found at {INDEX_PATH}. "
            "Please run 'python ingest.py' first to create the index."
        )
    
    # Load embeddings model
    print("🤖 Loading embeddings model...")
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDINGS_MODEL,
        model_kwargs={'device': 'cpu'}
    )
    
    # Load FAISS index
    print(f"📚 Loading FAISS index from {INDEX_PATH}...")
    vectorstore = FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
    print(f"✅ Loaded {vectorstore.index.ntotal} vectors")
    
    # Initialize Ollama LLM
    print(f"🦙 Initializing Ollama LLM (model: {OLLAMA_MODEL})...")
    try:
        llm = ChatOllama(
            model=OLLAMA_MODEL,
            temperature=0.7,
        )
        print("✅ Ollama LLM initialized")
    except Exception as e:
        print(f"❌ Error initializing Ollama: {e}")
        print(f"   Make sure Ollama is running and you have pulled the model:")
        print(f"   Run: ollama pull {OLLAMA_MODEL}")
        raise
    
    print("✅ All resources loaded successfully!")

# Load resources on startup
@app.on_event("startup")
async def startup_event():
    try:
        load_resources()
    except Exception as e:
        print(f"❌ Startup error: {e}")
        print("   The API will not function until resources are loaded.")

# Request/Response models
class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    sources: list = []

@app.get("/")
async def root():
    return {
        "message": "Local RAG Chatbot API",
        "status": "running",
        "model": OLLAMA_MODEL,
        "index_loaded": vectorstore is not None
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    if vectorstore is None or llm is None:
        return {"status": "unhealthy", "message": "Resources not loaded"}
    return {"status": "healthy", "vectors": vectorstore.index.ntotal}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint that retrieves relevant context and generates a response using Ollama.
    """
    if vectorstore is None or llm is None:
        raise HTTPException(
            status_code=503,
            detail="Service not ready. Resources not loaded. Please check server logs."
        )
    
    question = request.question.strip()
    
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    try:
        # Retrieve relevant documents from FAISS
        print(f"🔍 Searching for: {question}")
        docs_with_scores = vectorstore.similarity_search_with_score(question, k=6)
        
        # Check relevance of the closest match
        if docs_with_scores:
            closest_distance = docs_with_scores[0][1]
            print(f"📊 Closest match distance: {closest_distance:.3f}")
            
            if closest_distance > RELEVANCE_THRESHOLD:
                return ChatResponse(
                    answer="I cannot find that information in the VCF 9.0 documentation. Please try rephrasing your question or asking about a different topic.",
                    sources=[]
                )
        
        # Extract documents (without scores)
        documents = [doc for doc, score in docs_with_scores]
        
        # Build context from retrieved documents
        context = "\n\n".join([doc.page_content for doc in documents])
        
        # Create the prompt
        system_prompt = (
            "You are an expert assistant on VMware Cloud Foundation 9.0. "
            "Answer the user's question strictly based on the provided context from the VCF 9.0 documentation. "
            "If the context does not contain enough information to answer the question, say so clearly. "
            "Be concise, accurate, and helpful. "
            "Do not make up information that is not in the context."
        )
        
        user_prompt = f"Context from VCF 9.0 Documentation:\n\n{context}\n\nQuestion: {question}\n\nAnswer:"
        
        # Try using LangChain chains (newer API)
        try:
            prompt = ChatPromptTemplate.from_messages([
                ("system", system_prompt),
                ("human", "Context: {context}\n\nQuestion: {input}")
            ])
            
            document_chain = create_stuff_documents_chain(llm, prompt)
            retriever = vectorstore.as_retriever(search_kwargs={"k": 6})
            retrieval_chain = create_retrieval_chain(retriever, document_chain)
            
            print("🤖 Generating response with Ollama (using retrieval chain)...")
            result = retrieval_chain.invoke({
                "input": question,
                "chat_history": []
            })
            
            answer = result.get("answer", "I'm sorry, I couldn't generate a response.")
        except Exception as chain_error:
            # Fallback: Direct LLM call with manual prompt construction
            print(f"⚠️ Chain API not available, using direct LLM call: {chain_error}")
            print("🤖 Generating response with Ollama (direct call)...")
            
            # Construct full prompt
            full_prompt = f"{system_prompt}\n\n{user_prompt}"
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=user_prompt)
            ]
            
            # Use invoke with messages
            response = llm.invoke(messages)
            answer = response.content if hasattr(response, 'content') else str(response)
        
        sources = [doc.metadata.get("source", "Unknown") for doc in documents[:3]]  # Top 3 sources
        
        print("✅ Response generated")
        
        return ChatResponse(
            answer=answer,
            sources=list(set(sources))  # Remove duplicates
        )
        
    except Exception as e:
        print(f"❌ Error processing chat request: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

