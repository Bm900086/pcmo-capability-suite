# RAG Chatbot Setup Checklist

Use this checklist to ensure everything is set up correctly.

## ✅ Prerequisites

- [ ] **Python 3.8+** installed
  - Check: `python --version` or `python3 --version`
  
- [ ] **Ollama** installed
  - Download from: https://ollama.com
  - Check: `ollama --version`
  
- [ ] **Node.js & npm** installed (for frontend)
  - Check: `node --version` and `npm --version`

## ✅ Step 1: Install Ollama Model

```bash
ollama pull llama3.2
```

Verify it works:
```bash
ollama run llama3.2
# Type a test question, then type /bye to exit
```

- [ ] Model downloaded successfully
- [ ] Model responds to test questions

## ✅ Step 2: Python Environment Setup

Navigate to `rag_service` folder:
```bash
cd rag_service
```

Create virtual environment:
```bash
python -m venv venv
```

Activate it:
- **Windows:** `venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

- [ ] Virtual environment created
- [ ] Virtual environment activated (you should see `(venv)` in terminal)
- [ ] All packages installed successfully

## ✅ Step 3: Process PDF and Create Index

Make sure you're in the `rag_service` folder with venv activated:

```bash
python ingest.py
```

**This takes 10-30 minutes!** It's processing 8,171 pages.

- [ ] Script runs without errors
- [ ] `faiss_index_local` folder is created
- [ ] You see "✅ Index saved successfully!"

## ✅ Step 4: Start Backend Server

**Option A: Use the startup script (Windows):**
```bash
cd rag_service
start_backend.bat
```

**Option B: Manual start:**
```bash
cd rag_service
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ All resources loaded successfully!
```

- [ ] Backend starts without errors
- [ ] You see "✅ Ollama LLM initialized"
- [ ] Server is running on http://localhost:8000

**Test the backend:**
Open browser to: http://localhost:8000/health

You should see:
```json
{"status": "healthy", "vectors": 12345}
```

## ✅ Step 5: Start Frontend

In a **separate terminal** (from project root):

```bash
npm run dev
```

- [ ] Frontend starts on http://localhost:5173
- [ ] No console errors

## ✅ Step 6: Test the Chatbot

1. Open http://localhost:5173
2. Click the chat icon (bottom-right)
3. Ask: "What is VCF?"
4. Wait for response (first response may take 10-30 seconds)

- [ ] Chat widget opens
- [ ] Can type messages
- [ ] Receives responses (not errors)

## 🔧 Troubleshooting

### Backend won't start?

**Error: "FAISS index not found"**
- Run: `python ingest.py` first

**Error: "Error initializing Ollama"**
- Check Ollama is running: `ollama serve`
- Verify model: `ollama list` (should show llama3.2)
- If missing: `ollama pull llama3.2`

**Error: "Module not found"**
- Make sure venv is activated
- Reinstall: `pip install -r requirements.txt`

### Frontend shows connection error?

**Error: "Cannot connect to backend"**
- Check backend is running: http://localhost:8000/health
- Check CORS settings in `main.py`
- Try restarting backend

**Error: "API error: 503"**
- Backend is running but resources not loaded
- Check backend terminal for error messages
- Verify FAISS index exists
- Verify Ollama is running

### Slow responses?

- First response: 10-30 seconds (normal - Ollama loads model)
- Subsequent: 3-10 seconds (normal)
- If very slow: Check CPU/RAM usage

## 📝 Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd rag_service
venv\Scripts\activate
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Terminal 3 - Ollama (if needed):**
```bash
ollama serve
```

## ✅ All Set!

Once all checkboxes are checked, your chatbot should work! 🎉

