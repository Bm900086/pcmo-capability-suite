# 🚀 Start RVTools API - PowerShell Instructions

## ✅ The Issue

PowerShell requires `.\` prefix to run scripts in the current directory.

## 🎯 Solution: Use One of These Commands

### Option 1: PowerShell Script (Recommended)
```powershell
.\start_api.ps1
```

### Option 2: Batch File with Prefix
```powershell
.\START_API_NOW.bat
```

### Option 3: Direct Python Command (Easiest)
```powershell
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## ✅ Verify Server is Running

**After running the command above, open in browser:**
```
http://localhost:8001/health
```

**Or test in PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8001/health" -UseBasicParsing
```

**Expected response:**
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

## 🎉 Then Use in Frontend

1. **Keep the server terminal open** (don't close it)
2. **In your frontend application:**
   - Navigate to any page
   - Click **"Show RVTools Upload"** in Global Configuration
   - Upload your RVTools Excel file
   - The error will be gone! ✅

## 📝 What You'll See

When the server starts, you'll see:
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**This means it's working!** 🎉

---

**Quick Command:** Just run `.\start_api.ps1` or the direct Python command above!

