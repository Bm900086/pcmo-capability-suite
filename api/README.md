# RVTools Processing API

This API provides endpoints for processing RVTools Excel files and extracting infrastructure metrics for use in the PCMO Capability Suite models.

## Setup

### Prerequisites

- Python 3.7 or higher
- RVTools Python module installed (in `../RVToolAnalysisWithCursorAI`)

### Installation

1. **Create virtual environment** (if not already created):
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment**:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Install RVTools module dependencies**:
   ```bash
   cd ../RVToolAnalysisWithCursorAI
   pip install -r requirements.txt
   cd ../api
   ```

### Starting the Server

**Option 1: Use the startup script (Windows)**
```bash
start_api.bat
```

**Option 2: Manual start**
```bash
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload
```

The API will be available at: `http://localhost:8001`

## API Endpoints

### Health Check
```
GET /health
```

Returns API health status and module availability.

### Process RVTools File
```
POST /api/rvtools/process
Content-Type: multipart/form-data
```

**Request:**
- File upload: RVTools Excel file (.xlsx, .xls, or .xlsm)

**Response:**
```json
{
  "status": "success",
  "processing_date": "2025-01-15T10:30:00",
  "files_processed": 1,
  "vms_processed": 150,
  "hosts_processed": 10,
  "extracted_fields": {
    "totalVMs": {
      "value": 150,
      "source": "rvtools",
      "source_sheet": "vInfo",
      "source_column": "VM count (poweredOn)",
      "status": "auto-extracted",
      "unit": "count"
    },
    ...
  },
  "summary": {
    "auto_extracted": 10,
    "default_assumptions": 4,
    "user_overrides": 0
  }
}
```

## Field Mapping

The API automatically maps RVTools metrics to model input fields:

| Model Field | RVTools Source | Description |
|------------|----------------|-------------|
| `totalVMs` | vInfo sheet | Total powered-on VMs |
| `totalHosts` | vHost sheet | Total ESXi hosts |
| `consolidationRatio` | Calculated | vCPU to pCore ratio |
| `totalStorageGB` | vInfo sheet | Total provisioned storage |
| `avgCpuUtilization` | vHost sheet | Average CPU utilization |
| `avgRamUtilization` | vHost sheet | Average RAM utilization |
| `avgCoresPerHost` | vHost sheet | Average cores per host |
| `avgRamGBPerHost` | vHost sheet | Average RAM per host |
| `avgVcpusPerVM` | vInfo sheet | Average vCPUs per VM |
| `avgRamGBPerVM` | vInfo sheet | Average RAM per VM |

Fields not available in RVTools use default assumptions:
- `avgCostPerHost`: $25,000 (default)
- `avgPublicCloudCostPerMonth`: $280 (default)
- `ftes`: 0 (requires manual input)
- `burdenedCostPerFTE`: 0 (requires manual input)

## Troubleshooting

### "RVTools processing module not available"
- Ensure `RVToolAnalysisWithCursorAI` module is in the parent directory
- Check that all dependencies are installed in the RVTools module

### "Invalid file type"
- Ensure the uploaded file is an Excel file (.xlsx, .xls, or .xlsm)
- Check that the file is a valid RVTools export

### CORS errors
- Ensure the frontend URL is in the `allow_origins` list in `process.py`
- Default allows `http://localhost:5173` (Vite) and `http://localhost:3000` (React)

## Development

The API uses FastAPI with automatic reload enabled. Changes to `process.py` will automatically restart the server.

