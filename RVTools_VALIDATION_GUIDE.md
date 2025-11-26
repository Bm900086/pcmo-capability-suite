# RVTools Integration - End-to-End Validation Guide

## Issue: "Failed to fetch" Error

### Root Causes

1. **API Server Not Running**: The most common cause
2. **CORS Configuration**: Frontend and backend on different ports
3. **Path Resolution**: Python module path issues
4. **Network/Firewall**: Blocking localhost connections

## Step-by-Step Validation

### Step 1: Verify API Server is Running

**Check if API is accessible:**
```bash
# Open in browser or use curl
http://localhost:8001/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

**If not running, start it:**
```bash
cd api
start_api.bat  # Windows
# or
./start_api.sh  # Linux/Mac
```

### Step 2: Test with Sample File

**Run the test script:**
```bash
cd api
python test_rvtools_api.py
```

This will:
- Check API health
- Upload the sample file
- Validate extraction
- Show all extracted fields

### Step 3: Validate Frontend Connection

**Check browser console for errors:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try uploading file
4. Check for:
   - CORS errors
   - 404 errors
   - Connection refused errors

### Step 4: Validate Data Flow

**After successful upload, verify:**

1. **Global Configuration Updates:**
   - Total VMs field should be populated
   - Total Hosts field should be populated

2. **ValueModel Updates:**
   - Navigate to Value Model page
   - Check that `consolidationRatio` is updated
   - Check that `totalStorageGB` is updated
   - Check that `avgCostPerHost` is updated (if extracted)

3. **Calculations Use Extracted Values:**
   - Compute & Licensing calculation uses `consolidationRatio`
   - Storage calculation uses `totalStorageGB`
   - All calculations use `totalVMs` and `totalHosts` from globalConfig

## Field Mapping Validation

### Fields Extracted from RVTools

| Model Field | RVTools Source | Used In | Validation |
|------------|----------------|---------|------------|
| `totalVMs` | vInfo sheet | GlobalConfig, ValueModel | ✓ Auto-populates Global Config |
| `totalHosts` | vHost sheet | GlobalConfig, ValueModel | ✓ Auto-populates Global Config |
| `consolidationRatio` | Calculated (vCPU/pCore) | ValueModel | ✓ Updates ValueModel state |
| `totalStorageGB` | vInfo sheet | ValueModel | ✓ Updates ValueModel state |
| `avgCpuUtilization` | vHost sheet | Display only | ✓ Shown in extraction display |
| `avgRamUtilization` | vHost sheet | Display only | ✓ Shown in extraction display |

### Fields with Default Assumptions

| Model Field | Default Value | Used In | Validation |
|------------|---------------|---------|------------|
| `avgCostPerHost` | $25,000 | ValueModel | ✓ Can be overridden |
| `avgPublicCloudCostPerMonth` | $280 | ValueModel | ✓ Can be overridden |
| `ftes` | 0 | ValueModel | ✓ Requires manual input |
| `burdenedCostPerFTE` | 0 | ValueModel | ✓ Requires manual input |

## End-to-End Test Flow

### Test Scenario: Upload Sample File

1. **Start API Server:**
   ```bash
   cd api
   start_api.bat
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Upload File:**
   - Navigate to any page
   - Click "Show RVTools Upload" in Global Configuration
   - Upload "Sample RVTool Extract (2).xlsx"
   - Wait for processing

4. **Verify Extraction:**
   - Check extraction display shows fields
   - Verify status indicators (auto-extracted, default, override)
   - Check summary counts

5. **Verify Global Config:**
   - Total VMs should be populated
   - Total Hosts should be populated

6. **Verify ValueModel:**
   - Navigate to Value Model page
   - Check consolidationRatio field
   - Check totalStorageGB field
   - Verify calculations use these values

7. **Test Override:**
   - Click "Edit" on any field
   - Change value
   - Verify it's marked as "Override"
   - Verify calculations update

8. **Test Calculations:**
   - Check Compute & Licensing uses consolidationRatio
   - Check Storage uses totalStorageGB
   - Check all calculations use totalVMs and totalHosts

## Troubleshooting

### "Failed to fetch" Error

**Possible Causes:**
1. API server not running
2. Wrong port (should be 8001)
3. CORS issue
4. Firewall blocking

**Solutions:**
1. Check API is running: `http://localhost:8001/health`
2. Check browser console for detailed error
3. Verify CORS settings in `api/rvtools/process.py`
4. Check firewall/antivirus settings

### "RVTools processing module not available"

**Cause:** Python module path not resolved correctly

**Solution:**
1. Check `RVToolAnalysisWithCursorAI` folder exists
2. Verify path resolution in `api/rvtools/process.py`
3. Check Python can import the module:
   ```python
   import sys
   sys.path.insert(0, 'path/to/RVToolAnalysisWithCursorAI')
   from rvtool_processor import process_rvtools_data
   ```

### Fields Not Updating in Models

**Cause:** State not syncing properly

**Solution:**
1. Check `handleRVToolsExtraction` in GlobalConfiguration
2. Verify `updateValueModel` is called
3. Check ValueModel useEffect dependencies
4. Verify context updates are working

### Calculations Not Using Extracted Values

**Cause:** State not properly initialized or synced

**Solution:**
1. Check ValueModel reads from context correctly
2. Verify `globalConfig.totalVMs` and `globalConfig.totalHosts` are used
3. Check `valueModel.consolidationRatio` and `valueModel.totalStorageGB` are used
4. Verify calculations reference correct state variables

## Validation Checklist

- [ ] API server starts without errors
- [ ] Health endpoint returns "healthy"
- [ ] Sample file uploads successfully
- [ ] Extraction completes without errors
- [ ] All expected fields are extracted
- [ ] Global Config fields are auto-populated
- [ ] ValueModel fields are updated
- [ ] Override functionality works
- [ ] Calculations use extracted values
- [ ] No console errors in browser
- [ ] No network errors in DevTools

## Sample File Validation

**File:** `Sample RVTool Extract (2).xlsx`

**Expected Results:**
- Should extract VMs count from vInfo sheet
- Should extract Hosts count from vHost sheet
- Should calculate consolidation ratio
- Should extract storage values
- Should show utilization metrics

**If extraction fails:**
1. Check file has required sheets (vInfo, vHost, vMetaData)
2. Verify column names match expected format
3. Check file is not corrupted
4. Review API logs for specific errors

## Next Steps After Validation

Once validation passes:
1. Test with different RVTools files
2. Test override functionality
3. Test calculations with extracted values
4. Verify all models use extracted data correctly
5. Test edge cases (missing fields, empty files, etc.)

