# RVTools Excel Upload Integration Guide

## Overview

This feature adds an **optional** RVTools Excel file upload capability to the PCMO Capability Suite. Users can upload raw RVTools export files to automatically extract infrastructure metrics, eliminating manual data entry.

**Key Principle:** This feature is completely optional and non-disruptive. If no file is uploaded, the tool behaves exactly as it does today.

## Feature Location

The RVTools upload feature is integrated into the **Global Configuration** panel at the top of the application. It appears as a collapsible section that can be shown/hidden with a button.

## How It Works

### 1. Upload RVTools File

1. Navigate to any page in the application
2. In the Global Configuration bar, click **"Show RVTools Upload"**
3. Click the upload area or drag-and-drop an RVTools Excel file (.xlsx, .xls, or .xlsm)
4. The file is processed automatically

### 2. Automatic Field Extraction

The system automatically:
- Parses the RVTools Excel file
- Extracts infrastructure metrics from vInfo, vHost, and vMetaData sheets
- Maps extracted values to model input fields
- Applies default assumptions for fields not available in RVTools
- Auto-populates the Global Configuration fields (Total VMs, Total Hosts)

### 3. Field Status Indicators

Each extracted field is clearly labeled with its status:

- **🟢 Auto-extracted**: Value came directly from RVTools
  - Shows source sheet and column
  - Shows calculation method if applicable
  
- **🟡 Default assumption**: Value not available in RVTools, using default
  - Shows reason why default was used
  
- **🟠 Override**: User manually changed the value
  - Shows original extracted value
  - Shows new override value

### 4. Override Any Field

Users can override any extracted or assumed value:
1. Click the **"Edit"** button next to any field
2. Enter the new value
3. Click **"Save"**
4. The field is marked as "Override: User modified"

### 5. Input Summary

The system provides a summary showing:
- Number of auto-extracted fields
- Number of default assumptions
- Number of user overrides

## Extracted Fields

### Automatically Extracted from RVTools

| Field | Source | Description |
|-------|--------|-------------|
| **Total VMs** | vInfo sheet | Count of powered-on VMs |
| **Total Hosts** | vHost sheet | Count of ESXi hosts |
| **vCPU to pCore Ratio** | Calculated | Consolidation ratio (total vCPUs / total physical cores) |
| **Total Storage (GB)** | vInfo sheet | Sum of provisioned storage |
| **Average CPU Utilization** | vHost sheet | Average CPU usage across hosts |
| **Average RAM Utilization** | vHost sheet | Average memory usage across hosts |
| **Average Cores per Host** | vHost sheet | Average physical cores per host |
| **Average RAM per Host (GB)** | vHost sheet | Average memory per host |
| **Average vCPUs per VM** | vInfo sheet | Average virtual CPUs per VM |
| **Average RAM per VM (GB)** | vInfo sheet | Average memory per VM |

### Default Assumptions (Not in RVTools)

| Field | Default Value | Reason |
|-------|--------------|--------|
| **Average Cost per Host** | $25,000 | Business assumption - not in infrastructure data |
| **Avg Public Cloud Cost/Month** | $280 | Market assumption - not in infrastructure data |
| **FTEs** | 0 | Organizational data - requires manual input |
| **Burdened Cost per FTE** | 0 | Organizational data - requires manual input |

## Backend Setup

### Prerequisites

1. Python 3.7+ installed
2. RVTools Python module available (in `RVToolAnalysisWithCursorAI/`)

### Starting the API Server

**Windows:**
```bash
cd api
start_api.bat
```

**Manual (Windows/Linux/Mac):**
```bash
cd api
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

The API will be available at: `http://localhost:8001`

### Verify API is Running

Open in browser: `http://localhost:8001/health`

Should return:
```json
{
  "status": "healthy",
  "rvtools_module_available": true
}
```

## Usage Examples

### Example 1: Basic Upload

1. User uploads RVTools file
2. System extracts:
   - Total VMs: 150 (auto-extracted from vInfo)
   - Total Hosts: 10 (auto-extracted from vHost)
   - Consolidation Ratio: 3.5:1 (calculated)
3. Global Configuration fields are auto-populated
4. User proceeds with analysis

### Example 2: With Overrides

1. User uploads RVTools file
2. System extracts Total VMs: 150
3. User knows there are actually 160 VMs (some were powered off during export)
4. User clicks "Edit" on Total VMs field
5. User changes value to 160
6. Field is marked as "Override: User modified"
7. Summary shows: "1 User override"

### Example 3: Missing Fields

1. User uploads RVTools file
2. System extracts infrastructure metrics
3. System applies defaults for:
   - Average Cost per Host: $25,000 (default assumption)
   - FTEs: 0 (requires manual input)
4. User manually enters FTEs: 5
5. User overrides Average Cost per Host: $30,000

## Integration Points

### Frontend Components

- **`RVToolsUpload.jsx`**: Main upload component
- **`FieldExtractionDisplay.jsx`**: Displays extracted fields with override capability
- **`GlobalConfiguration.jsx`**: Integrated upload section

### Backend API

- **`api/rvtools/process.py`**: FastAPI endpoint for file processing
- Uses existing `RVToolAnalysisWithCursorAI` module for processing

### Data Flow

1. User uploads file → Frontend sends to API
2. API processes file → Extracts metrics using RVTools module
3. API maps metrics → Converts to model input format
4. API returns → Extracted fields with metadata
5. Frontend displays → Shows fields with status indicators
6. User can override → Changes tracked and displayed
7. Values sync → Auto-populate Global Configuration

## Non-Breaking Design

### If No File Uploaded

- All existing functionality works exactly as before
- No extraction, assumptions, or override UI is shown
- Users enter values manually as usual
- No changes to existing workflows

### If File Uploaded

- Extraction happens in background
- Fields are auto-populated but can be overridden
- All existing models continue to work
- No breaking changes to existing logic

## Troubleshooting

### "Failed to process RVTools file"

**Check:**
1. Backend API is running on port 8001
2. RVTools Python module is properly installed
3. File is a valid RVTools export (contains vInfo, vHost sheets)
4. File is not corrupted

**Solution:**
- Start the API server (see Backend Setup)
- Verify file format matches RVTools export structure
- Check browser console for detailed error messages

### "Invalid file type"

**Solution:**
- Ensure file is .xlsx, .xls, or .xlsm format
- Verify file is not password-protected
- Try re-exporting from RVTools

### Fields Not Extracting

**Possible Reasons:**
1. RVTools export missing required sheets (vInfo, vHost)
2. Column names don't match expected format
3. Data is in unexpected format

**Solution:**
- Verify RVTools export contains all required sheets
- Check that column names match RVTools standard format
- Review extraction display for specific field errors

## Technical Details

### Field Mapping Logic

The mapping between RVTools metrics and model inputs is defined in `api/rvtools/process.py`:

```python
FIELD_MAPPING = {
    "totalVMs": {
        "rvtools_field": "total_powered_on_vms",
        "source_sheet": "vInfo",
        "source_column": "VM count (poweredOn)",
        ...
    },
    ...
}
```

### Override Tracking

- Original values are preserved when overridden
- Override status is tracked per field
- Summary counts are updated dynamically
- Overrides persist until file is cleared or re-uploaded

## Future Enhancements

Potential improvements:
- Support for multiple file uploads (consolidation)
- Historical tracking of extractions
- Export/import of extraction configurations
- Validation rules for extracted values
- Integration with other model pages (Value Model, Competitive, etc.)

---

**Version:** 1.0.0  
**Last Updated:** 2025-01-15  
**Status:** Production Ready

