# 🚀 How to Start the Backend (Simple Guide)

## What's Happening?

Your **frontend** (the website) is running ✅
But your **backend** (the AI brain) is NOT running ❌

Think of it like this:
- **Frontend** = The chat window you see (working ✅)
- **Backend** = The AI that answers questions (not running ❌)

The frontend needs the backend to answer questions!

---

## Quick Fix: Start the Backend

### Option 1: Use the Startup Script (EASIEST) 🎯

1. Open **File Explorer**
2. Navigate to: `C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service`
3. Double-click: **`start_backend.bat`**

That's it! A terminal window will open and start the server.

**Keep that window open!** Don't close it - the server needs to keep running.

---

### Option 2: Manual Start (If script doesn't work)

1. Open **PowerShell** or **Command Prompt**

2. Navigate to the rag_service folder:
   ```bash
   cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"
   ```

3. Activate the virtual environment:
   ```bash
   venv\Scripts\activate
   ```
   *(You should see `(venv)` appear in your terminal)*

4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

5. You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000
   ✅ All resources loaded successfully!
   ```

6. **Keep this terminal open!** Don't close it.

---

## How to Know It's Working

1. The backend terminal shows: `Uvicorn running on http://0.0.0.0:8000`
2. Open your browser and go to: **http://localhost:8000/health**
3. You should see: `{"status": "healthy", "vectors": 12345}`

If you see that, the backend is working! ✅

---

## Common Problems

### ❌ "Virtual environment not found"
**Fix:** You need to set up Python first. See `START_HERE.md`

### ❌ "FAISS index not found"
**Fix:** You need to process the PDF first:
```bash
cd rag_service
venv\Scripts\activate
python ingest.py
```
*(This takes 20-30 minutes)*

### ❌ "Error initializing Ollama"
**Fix:** 
1. Make sure Ollama is installed: https://ollama.com
2. Download the model: `ollama pull llama3.2`
3. Start Ollama: `ollama serve`

### ❌ "Port 8000 already in use"
**Fix:** Something else is using port 8000. Close it or change the port in `main.py`

---

## What You Should See

**In the backend terminal:**
```
🔄 Loading resources...
🤖 Loading embeddings model...
📚 Loading FAISS index from faiss_index_local...
✅ Loaded 12345 vectors
🦙 Initializing Ollama LLM (model: llama3.2)...
✅ Ollama LLM initialized
✅ All resources loaded successfully!
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**In your browser (http://localhost:8000/health):**
```json
{"status": "healthy", "vectors": 12345}
```

**In the chat widget:**
- No more connection errors ✅
- Can send messages ✅
- Gets responses from AI ✅

---

## Remember

- **Keep the backend terminal open** while using the chatbot
- The backend must be running for the chatbot to work
- You can minimize the terminal, but don't close it

---

## Still Having Issues?

Check these files:
- `START_HERE.md` - Complete setup guide
- `rag_service/SETUP_CHECKLIST.md` - Step-by-step checklist
- `rag_service/README_LOCAL.md` - Detailed documentation

Good luck! 🚀

