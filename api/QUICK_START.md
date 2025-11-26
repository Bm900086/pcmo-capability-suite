# 🚀 Quick Start - RVTools API Server

## PowerShell Users (You're here!)

**Run this command:**
```powershell
.\start_api.ps1
```

**Or use the batch file with `.\` prefix:**
```powershell
.\START_API_NOW.bat
```

## Command Prompt Users

**Run this:**
```cmd
START_API_NOW.bat
```

## Manual Start (Any Terminal)

```bash
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
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

## 🎯 Then Use in Frontend

1. **Keep the server running** (don't close the terminal)
2. **In your frontend:**
   - Click "Show RVTools Upload" in Global Configuration
   - Upload your RVTools Excel file
   - Done! ✅

---

**Note:** In PowerShell, you need `.\` before script names to run them from the current directory.

