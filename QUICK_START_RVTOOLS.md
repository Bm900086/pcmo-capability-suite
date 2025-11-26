# Quick Start: RVTools Excel Upload

## 🚀 Get Started in 3 Steps

### Step 1: Start the API Server

**Windows:**
```bash
cd api
start_api.bat
```

**Linux/Mac:**
```bash
cd api
chmod +x start_api.sh
./start_api.sh
```

Wait for: `INFO:     Uvicorn running on http://0.0.0.0:8001`

### Step 2: Verify API is Running

Open in browser: **http://localhost:8001/health**

Should see:
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

### Step 3: Use in Frontend

1. Start frontend: `npm run dev`
2. Navigate to any page
3. In Global Configuration bar, click **"Show RVTools Upload"**
4. Upload your RVTools Excel file (.xlsx, .xls, or .xlsm)
5. Review extracted fields and override as needed

## ✅ What Gets Extracted

### Automatically Extracted:
- Total VMs (powered-on)
- Total Hosts
- vCPU to pCore Ratio (consolidation)
- Total Storage (GB)
- Average CPU Utilization
- Average RAM Utilization
- Average Cores per Host
- Average RAM per Host
- Average vCPUs per VM
- Average RAM per VM

### Default Assumptions:
- Average Cost per Host: $25,000
- Avg Public Cloud Cost/Month: $280
- FTEs: 0 (requires manual input)
- Burdened Cost per FTE: 0 (requires manual input)

## 🎯 Where Values Are Used

- **Global Configuration**: Total VMs, Total Hosts
- **Value Model**: Consolidation Ratio, Total Storage GB, Avg Cost per Host
- **All Calculations**: Use extracted values automatically

## 🐛 Troubleshooting

### "Failed to fetch" Error
→ API server not running. Start it with `start_api.bat`

### "RVTools processing module not available"
→ Check `RVToolAnalysisWithCursorAI` folder exists and dependencies are installed

### Fields Not Updating
→ Check browser console for errors. Verify API is running on port 8001.

## 📖 More Help

- **Full Guide**: `RVTools_INTEGRATION_GUIDE.md`
- **Troubleshooting**: `RVTools_TROUBLESHOOTING.md`
- **Validation**: `RVTools_VALIDATION_GUIDE.md`

---

**That's it!** The feature is ready to use. 🎉

