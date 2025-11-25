# 🔗 Important URLs

**Project:** PCMO Capability Suite  
**Version:** v2.0.0

---

## 🌐 GitHub Repository

**Repository URL:**
```
https://github.com/Bm900086/pcmo-capability-suite
```

**Direct Links:**
- **Main Repository:** https://github.com/Bm900086/pcmo-capability-suite
- **Releases/Tags:** https://github.com/Bm900086/pcmo-capability-suite/releases
- **Version v2.0.0 Tag:** https://github.com/Bm900086/pcmo-capability-suite/releases/tag/v2.0.0
- **Latest Commit:** https://github.com/Bm900086/pcmo-capability-suite/commit/fe98e7a

---

## 💻 Local Development URLs

### Frontend (React Application)
```
http://localhost:5173
```
**Start with:** `npm run dev`

### Backend API (FastAPI)
```
http://localhost:8000
```
**Start with:** `cd rag_service && uvicorn main:app --reload`

### Backend Health Check
```
http://localhost:8000/health
```
**Should return:** `{"status": "healthy", "vectors": 12345}`

### Backend API Documentation (Swagger UI)
```
http://localhost:8000/docs
```
**Interactive API documentation** - Available when backend is running

### Backend Alternative Docs (ReDoc)
```
http://localhost:8000/redoc
```
**Alternative API documentation** - Available when backend is running

---

## 📱 Application Pages

Once frontend is running on `http://localhost:5173`:

- **Dashboard:** http://localhost:5173/
- **Past Value Analysis:** http://localhost:5173/past-value
- **Value Model (TCO/ROI):** http://localhost:5173/tco
- **Competitive TCO:** http://localhost:5173/competitive
- **Maturity Assessment:** http://localhost:5173/maturity
- **VCF 9.0 Readiness:** http://localhost:5173/readiness
- **Proposal Generation:** http://localhost:5173/proposal
- **Login Page:** http://localhost:5173/login

---

## 🔧 External Services

### Ollama (Local AI)
- **Website:** https://ollama.com
- **Download:** https://ollama.com/download
- **Documentation:** https://github.com/ollama/ollama

### HuggingFace (Embeddings)
- **Website:** https://huggingface.co
- **Model Used:** sentence-transformers/all-MiniLM-L6-v2
- **Model Page:** https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2

---

## 📚 Documentation URLs

All documentation is in the repository, but here are key files:

- **Quick Start:** `START_HERE.md`
- **Backend Setup:** `SETUP_BACKEND_NOW.md`
- **Version History:** `VERSION_HISTORY.md`
- **Documentation Index:** `DOCUMENTATION_INDEX.md`

---

## 🚀 Quick Access

### Start Everything

**Terminal 1 - Frontend:**
```bash
npm run dev
# Opens: http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd rag_service
venv\Scripts\activate
uvicorn main:app --reload
# Opens: http://localhost:8000
```

**Terminal 3 - Ollama (if needed):**
```bash
ollama serve
```

---

## 📋 Default Credentials

**Login Page:** http://localhost:5173/login
- **Username:** `admin`
- **Password:** `password123`

---

## 🔍 Testing URLs

### Test Backend is Running
```
http://localhost:8000/health
```

### Test Frontend is Running
```
http://localhost:5173
```

### Test Chatbot (requires backend)
1. Open: http://localhost:5173
2. Click chat icon (bottom-right)
3. Ask: "What is VCF?"

---

## 📦 Production URLs

*Currently no production deployment. For production:*
- Build frontend: `npm run build`
- Deploy `dist/` folder to web server
- Deploy backend to cloud service (AWS, Azure, etc.)

---

**Last Updated:** 2024-11-24

