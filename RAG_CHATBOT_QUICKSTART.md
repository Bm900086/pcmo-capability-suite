# RAG Chatbot Quick Start Guide

This is a **100% local** RAG chatbot that lets you chat with the VMware Cloud Foundation 9.0 PDF documentation.

## Quick Setup (5 Steps)

### 1. Install Ollama
Download from [ollama.com](https://ollama.com) and install.

### 2. Download the AI Model
```bash
ollama pull llama3.2
```

### 3. Set Up Python Backend
```bash
cd rag_service
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### 4. Process the PDF
```bash
python ingest.py
```
*(This takes 10-30 minutes - it's processing 8,171 pages!)*

### 5. Start Everything

**Terminal 1 - Backend:**
```bash
cd rag_service
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Terminal 3 - Ollama (if not auto-running):**
```bash
ollama serve
```

## Using the Chatbot

1. Open `http://localhost:5173` in your browser
2. Click the chat icon in the bottom-right corner
3. Ask questions about VCF 9.0!

## Example Questions

- "What is VMware Cloud Foundation 9.0?"
- "How do I configure NSX in VCF?"
- "What are the system requirements for VCF 9.0?"
- "Explain vSAN in Cloud Foundation"
- "What's new in VCF 9.0?"

## Troubleshooting

**Backend won't start?**
- Make sure you ran `python ingest.py` first
- Check that `faiss_index_local` folder exists

**Ollama errors?**
- Run `ollama pull llama3.2` to download the model
- Verify with `ollama list`

**Frontend can't connect?**
- Make sure backend is running on port 8000
- Check `http://localhost:8000/health` in browser

For detailed setup, see `rag_service/README_LOCAL.md`

