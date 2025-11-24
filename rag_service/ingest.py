"""
PDF Ingestion Script for Local RAG System
Version: 1.0.0
Last Updated: 2024-11-24

Processes the VMware Cloud Foundation 9.0 PDF and creates a FAISS vector index.
"""

import os
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Configuration
PDF_PATH = "../vmware-cloud-foundation-9-0.pdf"
INDEX_PATH = "faiss_index_local"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

def main():
    print("🚀 Starting PDF ingestion process...")
    print(f"📄 Loading PDF: {PDF_PATH}")
    
    # Check if PDF exists
    if not os.path.exists(PDF_PATH):
        print(f"❌ Error: PDF file not found at {PDF_PATH}")
        print("   Please ensure the PDF is in the project root directory.")
        return
    
    # Load PDF
    try:
        loader = PyPDFLoader(PDF_PATH)
        documents = loader.load()
        print(f"✅ Loaded {len(documents)} pages from PDF")
    except Exception as e:
        print(f"❌ Error loading PDF: {e}")
        return
    
    # Split documents into chunks
    print(f"📝 Splitting documents into chunks (size: {CHUNK_SIZE}, overlap: {CHUNK_OVERLAP})...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        length_function=len,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"✅ Created {len(chunks)} text chunks")
    
    # Initialize embeddings model (local HuggingFace)
    print("🤖 Initializing local HuggingFace embeddings model...")
    print("   (This may take a minute on first run - downloading model)")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )
    print("✅ Embeddings model loaded")
    
    # Create FAISS vector store
    print("🔍 Creating FAISS vector index...")
    vectorstore = FAISS.from_documents(chunks, embeddings)
    
    # Save the index
    print(f"💾 Saving index to {INDEX_PATH}...")
    vectorstore.save_local(INDEX_PATH)
    print(f"✅ Index saved successfully!")
    print(f"📊 Total vectors indexed: {len(chunks)}")
    print("\n🎉 Ingestion complete! You can now start the API server.")

if __name__ == "__main__":
    main()

