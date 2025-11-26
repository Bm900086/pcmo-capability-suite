# 🚀 Start RVTools API Server - Quick Guide

## ✅ Dependencies Installed!

All required dependencies have been installed:
- ✅ FastAPI
- ✅ Uvicorn  
- ✅ python-multipart
- ✅ RVTools module verified

## 🎯 Start the Server

### Method 1: Quick Start Script (Recommended)

**Double-click this file:**
```
api\START_API_NOW.bat
```

Or run from terminal:
```bash
cd api
START_API_NOW.bat
```

### Method 2: Manual Start

**Open a terminal/PowerShell in the `api` folder and run:**
```bash
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## ✅ Verify It's Running

**Open in browser:**
```
http://localhost:8001/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

## 🎉 Then Use in Frontend

1. **Keep the API server running** (don't close the terminal)
2. **In your frontend application:**
   - Navigate to any page
   - Click **"Show RVTools Upload"** in Global Configuration
   - Upload your RVTools Excel file
   - The "Failed to fetch" error will be gone! ✅

## 📝 Important Notes

- **Keep the server running** while using the frontend
- The server runs on **port 8001**
- You'll see logs in the terminal as files are processed
- Press **Ctrl+C** to stop the server

## 🐛 If You Still Get Errors

1. **Check server is running:** Open http://localhost:8001/health
2. **Check port 8001 is free:** Another app might be using it
3. **Check firewall:** Windows Firewall might be blocking port 8001
4. **Restart server:** Stop (Ctrl+C) and start again

---

**The server is ready to start!** Just run `START_API_NOW.bat` or the manual command above. 🚀

