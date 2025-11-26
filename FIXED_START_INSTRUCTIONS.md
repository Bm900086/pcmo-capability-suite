# ✅ FIXED: How to Start RVTools API Server

## 🎯 The Issue

You ran the command from the **project root** (`PCMO Cursor Project`), but it needs to run from the **`api` folder**.

## ✅ The Solution

### Step 1: Navigate to api folder
```powershell
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\api"
```

**Or from project root:**
```powershell
cd api
```

### Step 2: Start the server

**Easiest method (Python script):**
```powershell
python start_server.py
```

**Or direct command:**
```powershell
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## ✅ Verify It's Working

**Open in your browser:**
```
http://localhost:8001/health
```

**You should see:**
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

## 🎉 Then Use in Frontend

1. **Keep the server terminal open** (don't close it)
2. **In your frontend:**
   - Click "Show RVTools Upload" in Global Configuration
   - Upload your RVTools Excel file
   - Done! ✅

## 📝 Complete Command (Copy & Paste)

```powershell
cd "C:\Users\bm900086\Documents\PCMO Cursor Project\api"
python start_server.py
```

**Or:**
```powershell
cd api
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## ⚠️ Important

- **Must be in `api` folder** when running the command
- **Keep terminal open** while using frontend
- **Press Ctrl+C** to stop server

---

**The server should now start successfully!** 🚀

