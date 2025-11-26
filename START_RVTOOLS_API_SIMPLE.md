# 🚀 Start RVTools API - Simple Instructions

## ❌ The Problem

You ran the command from the **project root** instead of the **api folder**.

## ✅ The Solution

### Step 1: Navigate to the api folder
```powershell
cd api
```

### Step 2: Run one of these commands

**Option A: Python script (Easiest)**
```powershell
python start_server.py
```

**Option B: Direct uvicorn command**
```powershell
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

**Option C: Batch file**
```powershell
.\START_API_NOW.bat
```

## ✅ Verify It's Running

**Open in browser:**
```
http://localhost:8001/health
```

**Should see:**
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

## 🎯 Complete Command Sequence

**Copy and paste this entire block:**
```powershell
cd api
python start_server.py
```

**Or:**
```powershell
cd api
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## 📝 Important

- **Must run from `api` folder**, not project root
- **Keep the terminal open** while using the frontend
- **Press Ctrl+C** to stop the server

---

**Quick Fix:** Just run `cd api` first, then `python start_server.py`! 🚀

