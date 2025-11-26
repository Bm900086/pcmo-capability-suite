# RVTools Integration - Troubleshooting Guide

## Common Error: "Failed to fetch"

### Quick Fix Checklist

1. **Is the API server running?**
   - Open: http://localhost:8001/health
   - Should return: `{"status": "healthy", "rvtools_module_available": true}`
   - If not, start the server (see below)

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for CORS errors
   - Look for connection refused errors
   - Check Network tab for failed requests

3. **Verify API port:**
   - API should be on port 8001
   - Frontend should be on port 5173 (Vite) or 3000
   - Check CORS settings match your frontend port

## Starting the API Server

### Windows
```bash
cd api
start_api.bat
```

### Linux/Mac
```bash
cd api
chmod +x start_api.sh
./start_api.sh
```

### Manual Start
```bash
cd api
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cd ../RVToolAnalysisWithCursorAI
pip install -r requirements.txt
cd ../api
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

## Testing the API

### Test Health Endpoint
```bash
curl http://localhost:8001/health
```

### Test with Sample File
```bash
cd api
python test_rvtools_api.py
```

## Common Issues and Solutions

### Issue 1: "Cannot connect to RVTools API server"

**Symptoms:**
- "Failed to fetch" error
- Connection refused in console

**Solution:**
1. Start the API server (see above)
2. Verify it's running: http://localhost:8001/health
3. Check firewall isn't blocking port 8001

### Issue 2: "RVTools processing module not available"

**Symptoms:**
- API returns 503 error
- Error mentions module path

**Solution:**
1. Verify `RVToolAnalysisWithCursorAI` folder exists in project root
2. Check path resolution in `api/rvtools/process.py`
3. Install RVTools dependencies:
   ```bash
   cd RVToolAnalysisWithCursorAI
   pip install -r requirements.txt
   ```

### Issue 3: CORS Error

**Symptoms:**
- Browser console shows CORS error
- Request fails with CORS message

**Solution:**
1. Check `api/rvtools/process.py` CORS settings
2. Add your frontend URL to `allow_origins`:
   ```python
   allow_origins=["http://localhost:5173", "http://localhost:3000", "YOUR_URL"]
   ```
3. Restart API server

### Issue 4: File Upload Fails

**Symptoms:**
- File uploads but processing fails
- Error about missing sheets or columns

**Solution:**
1. Verify file is valid RVTools export
2. Check file has required sheets: vInfo, vHost, vMetaData
3. Check column names match expected format
4. Review API logs for specific error

### Issue 5: Fields Not Updating in Models

**Symptoms:**
- Extraction succeeds but values don't appear in forms
- Calculations don't use extracted values

**Solution:**
1. Check browser console for errors
2. Verify `handleRVToolsExtraction` is called
3. Check `updateValueModel` is working
4. Verify context updates are propagating
5. Check ValueModel useEffect dependencies

### Issue 6: Path Resolution Errors

**Symptoms:**
- Python can't find RVTools module
- Import errors in API logs

**Solution:**
1. Check project structure:
   ```
   Project Root/
   ├── api/
   │   └── rvtools/
   │       └── process.py
   └── RVToolAnalysisWithCursorAI/
       └── rvtool_processor.py
   ```
2. Verify path calculation in `process.py`
3. Test import manually:
   ```python
   import sys
   sys.path.insert(0, 'path/to/RVToolAnalysisWithCursorAI')
   from rvtool_processor import process_rvtools_data
   ```

## Debug Mode

### Enable Detailed Logging

In `api/rvtools/process.py`, add logging:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Add logging throughout
logger.debug(f"Processing file: {file.filename}")
logger.debug(f"Module path: {rvtools_module_path}")
```

### Check Browser Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try uploading file
4. Check request/response:
   - Request URL
   - Request method
   - Response status
   - Response body

### Check API Logs

When running API server, watch console for:
- Import errors
- Path resolution issues
- Processing errors
- File read errors

## Validation Steps

1. **API Health:**
   ```bash
   curl http://localhost:8001/health
   ```

2. **Test Upload:**
   ```bash
   cd api
   python test_rvtools_api.py
   ```

3. **Frontend Connection:**
   - Open browser console
   - Try upload
   - Check for errors

4. **Data Flow:**
   - Verify Global Config updates
   - Verify ValueModel updates
   - Verify calculations use values

## Getting Help

If issues persist:
1. Check API logs for detailed errors
2. Check browser console for frontend errors
3. Verify all dependencies are installed
4. Test with sample file using test script
5. Review validation guide: `RVTools_VALIDATION_GUIDE.md`

