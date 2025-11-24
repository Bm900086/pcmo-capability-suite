# 🚀 Set Up Backend - Step by Step

**Status Check:**
- ❌ Backend server: NOT running
- ❌ Virtual environment: NOT created
- ❌ FAISS index: NOT created
- ❌ Ollama: Not installed or not in PATH

**You need to complete these steps before the chatbot will work.**

---

## Step 1: Install Ollama (REQUIRED - 5 minutes)

1. **Download Ollama:**
   - Go to: https://ollama.com
   - Click "Download for Windows"
   - Run the installer

2. **Restart your terminal/PowerShell** (IMPORTANT!)

3. **Verify installation:**
   ```powershell
   ollama --version
   ```
   You should see a version number. If you get an error, Ollama isn't installed correctly.

4. **Download the AI model:**
   ```powershell
   ollama pull llama3.2
   ```
   This downloads ~2GB. Wait for it to finish (you'll see "pulling..." then "success").

5. **Test it works:**
   ```powershell
   ollama run llama3.2
   ```
   Type: "Hello" and press Enter. If it responds, type `/bye` to exit.

---

## Step 2: Create Python Virtual Environment (5 minutes)

Open PowerShell and run these commands **one at a time**:

```powershell
# Navigate to rag_service folder
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"

# Create virtual environment
python -m venv venv

# Wait for it to finish, then activate it
venv\Scripts\activate
```

**You should see `(venv)` appear at the start of your terminal line!**

If you see `(venv)`, you're good! If not, the activation didn't work.

---

## Step 3: Install Python Packages (5-10 minutes)

With `(venv)` showing in your terminal:

```powershell
# Make sure you're in rag_service folder with (venv) active
pip install -r requirements.txt
```

**This takes a few minutes** - it's downloading packages. Wait for it to finish.

You should see "Successfully installed..." at the end.

---

## Step 4: Process the PDF (20-30 MINUTES - Go get coffee! ☕)

**This is the longest step!** It processes 8,171 pages.

```powershell
# Make sure you're still in rag_service with (venv) active
python ingest.py
```

**What you'll see:**
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

**This takes 20-30 minutes!** Don't close the terminal. Go get coffee. ☕

---

## Step 5: Start the Backend Server

After Step 4 completes successfully:

**Option A: Use the startup script (EASIEST)**
```powershell
# Make sure you're in rag_service folder
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"

# Double-click start_backend.bat in File Explorer
# OR run it from PowerShell:
.\start_backend.bat
```

**Option B: Manual start**
```powershell
# Navigate to rag_service
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\rag_service"

# Activate virtual environment
venv\Scripts\activate

# Start the server
uvicorn main:app --reload
```

**You should see:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ All resources loaded successfully!
```

**KEEP THIS TERMINAL OPEN!** Don't close it - the server needs to keep running.

---

## Step 6: Test the Backend

1. **Open your browser**
2. **Go to:** http://localhost:8000/health
3. **You should see:**
   ```json
   {"status": "healthy", "vectors": 12345}
   ```

If you see that, the backend is working! ✅

---

## Step 7: Use the Chatbot

1. **Make sure frontend is running** (`npm run dev`)
2. **Open:** http://localhost:5173
3. **Click the chat icon** (bottom-right)
4. **Ask:** "What is VCF?"

**First response takes 10-30 seconds** (Ollama loads the model)

---

## 🆘 Troubleshooting

### "python: command not found"
- Python isn't installed or not in PATH
- Install Python from python.org
- Make sure to check "Add Python to PATH" during installation

### "ollama: command not found"
- Ollama isn't installed
- Download from ollama.com
- **Restart your terminal** after installation

### "FAISS index not found"
- You need to run `python ingest.py` first
- This takes 20-30 minutes

### "Error initializing Ollama"
- Make sure Ollama is running: `ollama serve`
- Make sure model is downloaded: `ollama list`
- If missing: `ollama pull llama3.2`

### Backend won't start
- Check the error message in terminal
- Common issues:
  - Virtual environment not activated (no `(venv)`)
  - FAISS index missing (run `python ingest.py`)
  - Ollama not running

### "Cannot connect to backend"
- Backend isn't running
- Check: http://localhost:8000/health
- Make sure you kept the terminal open where you started uvicorn

---

## ✅ Quick Checklist

Before the chatbot will work:

- [ ] Ollama installed (`ollama --version` works)
- [ ] Model downloaded (`ollama pull llama3.2` completed)
- [ ] Python virtual environment created (`venv` folder exists)
- [ ] Virtual environment activated (see `(venv)` in terminal)
- [ ] Python packages installed (`pip install -r requirements.txt` completed)
- [ ] PDF processed (`python ingest.py` completed - took 20-30 min)
- [ ] Backend server running (`uvicorn main:app --reload` running)
- [ ] Backend health check works (http://localhost:8000/health shows "healthy")
- [ ] Frontend is running (`npm run dev`)

---

## 📝 Summary

**The error means:** Your frontend is trying to talk to the backend, but the backend isn't running.

**To fix it:** Complete Steps 1-5 above, then start the backend (Step 5).

**Time estimate:**
- Ollama setup: 5 minutes
- Python setup: 10 minutes
- PDF processing: 20-30 minutes
- **Total: ~40-45 minutes** (mostly waiting for PDF processing)

**Once everything is set up, starting the backend takes 30 seconds!**

Good luck! 🚀

