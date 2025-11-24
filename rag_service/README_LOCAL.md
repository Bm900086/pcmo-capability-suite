# Local RAG Chatbot Setup Guide

This guide will help you set up a **100% local** RAG (Retrieval-Augmented Generation) chatbot that uses:
- **Ollama** for the LLM (no API keys needed!)
- **HuggingFace** for embeddings (runs locally)
- **FAISS** for vector storage (local index)

## Prerequisites

1. **Python 3.8+** installed
2. **Ollama** installed (download from [ollama.com](https://ollama.com))
3. **Node.js** and npm (for the frontend - already set up)

## Step 1: Install Ollama

1. Download Ollama from [https://ollama.com](https://ollama.com)
2. Install it following the instructions for your operating system
3. Verify installation by opening a terminal and running:
   ```bash
   ollama --version
   ```

## Step 2: Download the LLM Model

Ollama needs to download the "brain" (the language model). Run this command:

```bash
ollama pull llama3.2
```

**Note:** This will download ~2GB. The first time may take a few minutes depending on your internet speed.

**Alternative models you can use:**
- `ollama pull mistral` (if you prefer Mistral)
- `ollama pull llama3.1` (older version)
- `ollama pull codellama` (if you want code-focused responses)

After downloading, verify it works:
```bash
ollama run llama3.2
```
Type a test question and press Enter. If it responds, you're good! Type `/bye` to exit.

## Step 3: Set Up Python Environment

Navigate to the `rag_service` folder:

```bash
cd rag_service
```

Create a virtual environment (recommended):

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

**Note:** This will install:
- FastAPI (web framework)
- LangChain (RAG framework)
- HuggingFace models (embeddings)
- FAISS (vector database)
- Ollama integration

The first time you run this, it will download the embedding model (~80MB), which may take a few minutes.

## Step 4: Process the PDF and Create Index

Run the ingestion script to process the VCF 9.0 PDF:

```bash
python ingest.py
```

**What this does:**
- Loads the `vmware-cloud-foundation-9-0.pdf` file (8,171 pages)
- Splits it into chunks of 1000 characters
- Creates embeddings using HuggingFace (local)
- Builds a FAISS vector index
- Saves the index to `faiss_index_local/`

**Expected output:**
```
🚀 Starting PDF ingestion process...
📄 Loading PDF: ../vmware-cloud-foundation-9-0.pdf
✅ Loaded 8171 pages from PDF
📝 Splitting documents into chunks...
✅ Created XXXX text chunks
🤖 Initializing local HuggingFace embeddings model...
✅ Embeddings model loaded
🔍 Creating FAISS vector index...
💾 Saving index to faiss_index_local...
✅ Index saved successfully!
🎉 Ingestion complete!
```

**Time estimate:** 10-30 minutes depending on your CPU (it's processing 8,171 pages!)

## Step 5: Start the Backend API Server

Make sure Ollama is running (it should start automatically when you use it, but you can verify):

```bash
ollama serve
```

In a separate terminal (with your virtual environment activated), start the FastAPI server:

```bash
cd rag_service
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
🔄 Loading resources...
🤖 Loading embeddings model...
📚 Loading FAISS index from faiss_index_local...
✅ Loaded XXXX vectors
🦙 Initializing Ollama LLM (model: llama3.2)...
✅ Ollama LLM initialized
✅ All resources loaded successfully!
INFO:     Application startup complete.
```

## Step 6: Start the Frontend

In another terminal, start the frontend development server (from the project root):

```bash
npm run dev
```

The frontend should be available at `http://localhost:5173`

## Step 7: Test the Chatbot

1. Open your browser to `http://localhost:5173`
2. Look for the chat icon in the bottom-right corner
3. Click it to open the chat widget
4. Try asking questions like:
   - "What is VMware Cloud Foundation 9.0?"
   - "How do I configure NSX in VCF?"
   - "What are the system requirements?"

## Troubleshooting

### "FAISS index not found"
- Make sure you ran `python ingest.py` first
- Check that `faiss_index_local` folder exists in the `rag_service` directory

### "Error initializing Ollama"
- Make sure Ollama is installed and running
- Verify the model is downloaded: `ollama list`
- If missing, run: `ollama pull llama3.2`
- Try starting Ollama manually: `ollama serve`

### "Connection refused" or "API error"
- Make sure the backend is running on port 8000
- Check that `uvicorn main:app --reload` is running
- Verify the API is accessible: `curl http://localhost:8000/health`

### Slow responses
- First response may take 10-30 seconds (Ollama needs to load the model)
- Subsequent responses should be faster (3-10 seconds)
- If very slow, try a smaller model or check your CPU/RAM

### "I cannot find that information"
- The relevance threshold is set to 1.2 (distance score)
- Try rephrasing your question
- Be more specific about VCF 9.0 topics

### Frontend can't connect to backend
- Check CORS settings in `main.py`
- Make sure backend is running on `http://localhost:8000`
- Check browser console for errors

## Architecture Overview

```
┌─────────────┐
│   Frontend  │ (React + Vite)
│  ChatWidget │
└──────┬──────┘
       │ HTTP POST /chat
       ▼
┌─────────────┐
│   FastAPI   │ (Backend Server)
│   main.py   │
└──────┬──────┘
       │
       ├──► FAISS Index (Vector Search)
       │    └──► Finds relevant PDF chunks
       │
       └──► Ollama LLM (llama3.2)
            └──► Generates answer from context
```

## File Structure

```
rag_service/
├── requirements.txt      # Python dependencies
├── ingest.py            # PDF processing script
├── main.py              # FastAPI backend server
├── README_LOCAL.md      # This file
└── faiss_index_local/  # Generated vector index (after running ingest.py)
```

## Next Steps

- Customize the system prompt in `main.py` for different response styles
- Adjust `RELEVANCE_THRESHOLD` to be more/less strict about relevance
- Try different Ollama models for different response qualities
- Add chat history support for conversational context
- Add streaming responses for better UX

## Support

If you encounter issues:
1. Check that all services are running (Ollama, FastAPI, Frontend)
2. Verify the model is downloaded (`ollama list`)
3. Check the terminal logs for error messages
4. Ensure the PDF file exists in the project root

Happy chatting! 🚀

