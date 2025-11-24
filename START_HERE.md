# 🚀 Quick Start: RAG Chatbot Setup

Your backend isn't running yet. Follow these steps to get it working:

## Current Status
- ❌ Python virtual environment: **Not created**
- ❌ FAISS index: **Not created** 
- ❌ Ollama: **Not installed or not in PATH**
- ❌ Backend server: **Not running**

## Step-by-Step Setup

### Step 1: Install Ollama (REQUIRED)

1. Download from: **https://ollama.com**
2. Install it (Windows installer)
3. **Restart your terminal/PowerShell** after installation
4. Verify installation:
   ```bash
   ollama --version
   ```

5. Download the AI model:
   ```bash
   ollama pull llama3.2
   ```
   *(This downloads ~2GB, takes a few minutes)*

6. Test it works:
   ```bash
   ollama run llama3.2
   ```
   Type a test question, then type `/bye` to exit.

---

### Step 2: Set Up Python Backend

Open PowerShell or Command Prompt and run:

```bash
# Navigate to rag_service folder
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

**Note:** This will take a few minutes as it downloads packages.

---

### Step 3: Process the PDF (IMPORTANT - Takes 20-30 minutes!)

With your virtual environment activated:

```bash
# Make sure you're in rag_service folder
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"

# Activate venv (if not already)
venv\Scripts\activate

# Run the ingestion script
python ingest.py
```

**This processes 8,171 pages!** Go get coffee ☕ - it takes 20-30 minutes.

You'll know it's done when you see:
```
✅ Index saved successfully!
🎉 Ingestion complete!
```

---

### Step 4: Start the Backend Server

**Option A: Use the startup script (Easiest)**
```bash
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"
start_backend.bat
```

**Option B: Manual start**
```bash
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"
venv\Scripts\activate
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ All resources loaded successfully!
```

**Keep this terminal open!** The server needs to keep running.

---

### Step 5: Test the Backend

Open your browser and go to:
**http://localhost:8000/health**

You should see:
```json
{"status": "healthy", "vectors": 12345}
```

If you see this, the backend is working! ✅

---

### Step 6: Use the Chatbot

1. Make sure your frontend is running (`npm run dev`)
2. Open http://localhost:5173
3. Click the chat icon (bottom-right)
4. Ask: "What is VCF?"

**First response takes 10-30 seconds** (Ollama loads the model)

---

## 🆘 Troubleshooting

### "ollama: command not found"
- Ollama isn't installed or not in PATH
- Download from https://ollama.com
- **Restart your terminal** after installation

### "FAISS index not found"
- You need to run `python ingest.py` first
- This takes 20-30 minutes

### "Error initializing Ollama"
- Make sure Ollama is running: `ollama serve`
- Make sure model is downloaded: `ollama list`
- If missing: `ollama pull llama3.2`

### "Cannot connect to backend"
- Check backend is running: http://localhost:8000/health
- Make sure you kept the terminal open where you started uvicorn

### Backend crashes on startup
- Check the error message in the terminal
- Common issues:
  - Missing FAISS index → Run `python ingest.py`
  - Ollama not running → Start `ollama serve`
  - Model not downloaded → Run `ollama pull llama3.2`

---

## ✅ Checklist

Before using the chatbot, make sure:

- [ ] Ollama is installed and `ollama --version` works
- [ ] Model is downloaded: `ollama pull llama3.2`
- [ ] Python virtual environment is created and activated
- [ ] Dependencies are installed: `pip install -r requirements.txt`
- [ ] PDF is processed: `python ingest.py` (completed successfully)
- [ ] Backend is running: http://localhost:8000/health shows "healthy"
- [ ] Frontend is running: http://localhost:5173

---

## Need Help?

Check these files for more details:
- `rag_service/README_LOCAL.md` - Detailed setup guide
- `rag_service/SETUP_CHECKLIST.md` - Step-by-step checklist

Good luck! 🚀

