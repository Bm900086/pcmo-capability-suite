# How to Start the RVTools API Server

## 🚀 Quick Start (Easiest Method)

### Option 1: Use the Quick Start Script

**Double-click or run:**
```bash
api\START_API_NOW.bat
```

This will:
- ✅ Install dependencies automatically if needed
- ✅ Start the server on port 8001
- ✅ Show you the health check URL

### Option 2: Manual Start

**Open a terminal/PowerShell and run:**
```bash
cd api
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## ✅ Verify It's Running

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

## 🎯 Then Use in Frontend

1. **Start your frontend** (if not already running):
   ```bash
   npm run dev
   ```

2. **In the application:**
   - Navigate to any page
   - Click **"Show RVTools Upload"** in Global Configuration
   - Upload your RVTools Excel file
   - Done! ✅

## 🐛 Troubleshooting

### "Port 8001 already in use"
**Solution:** Another process is using port 8001. Either:
- Stop the other process
- Or change the port in the command: `--port 8002` (and update frontend URL)

### "Module not found" errors
**Solution:** Install dependencies:
```bash
cd api
pip install fastapi uvicorn python-multipart
```

### "RVTools module not available"
**Solution:** The RVTools module should be in the parent directory. Verify:
```bash
cd ..
dir RVToolAnalysisWithCursorAI
```

## 📝 What the Server Does

The API server:
- Listens on `http://localhost:8001`
- Processes RVTools Excel files
- Extracts infrastructure metrics
- Returns JSON with extracted fields

**Keep the server running** while you use the frontend!

## 💡 Pro Tip

**Run the server in a separate terminal window** so you can:
- See logs and errors
- Keep it running while using the frontend
- Stop it easily with Ctrl+C

---

**That's it!** Once the server is running, the "Failed to fetch" error will be resolved. 🎉

