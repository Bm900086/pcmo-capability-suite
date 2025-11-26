# Cursor AI Integration Guide

## Quick Start for Cursor AI

This module can be integrated into your Cursor AI project as a sub-function. Here's how:

### 1. Import the Module

```python
from RVToolAnalysisWithCursorAI.rvtool_processor import process_rvtools_data
```

### 2. Call the Function

```python
# Process RVTools data
result = process_rvtools_data(
    input_dir="RVToolAnalysisWithCursorAI/inputs/",
    output_dir="RVToolAnalysisWithCursorAI/outputs/"
)

# Check result
if result["status"] == "success":
    metrics = result["metrics"]
    print(f"vCPU to pCore ratio: {metrics['vcpu_to_pcore_ratio']}")
    print(f"Average CPU utilization: {metrics['avg_cpu_utilization']*100:.1f}%")
else:
    print(f"Error: {result['message']}")
```

### 3. Access Output Files

```python
# Read the Excel report
import pandas as pd
excel_path = result["output_files"]["excel_report"]
df_vms = pd.read_excel(excel_path, sheet_name="Consolidated_vInfo")
df_hosts = pd.read_excel(excel_path, sheet_name="Consolidated_vHost")

# Read the JSON manifest
import json
manifest_path = result["output_files"]["charts_directory"].replace("charts", "rvtool_manifest.json")
with open(manifest_path, 'r') as f:
    manifest = json.load(f)
```

## Integration Patterns

### Pattern 1: Standalone Analysis

Use this module to analyze infrastructure data independently:

```python
def analyze_infrastructure():
    result = process_rvtools_data("inputs/", "outputs/")
    return result["metrics"]
```

### Pattern 2: Data Source for Other Models

Use the output as input for other business models:

```python
def capacity_planning_model():
    # Get infrastructure metrics
    result = process_rvtools_data("inputs/", "outputs/")
    metrics = result["metrics"]
    
    # Use metrics in capacity planning calculations
    available_cores = metrics["total_physical_cores"] * (1 - metrics["avg_cpu_utilization"])
    # ... rest of capacity planning logic
```

### Pattern 3: Scheduled Processing

Process RVTools data on a schedule:

```python
import schedule
import time

def process_rvtools():
    result = process_rvtools_data("inputs/", "outputs/")
    if result["status"] == "success":
        # Trigger downstream processes
        notify_other_models(result["metrics"])

# Schedule daily processing
schedule.every().day.at("02:00").do(process_rvtools)

while True:
    schedule.run_pending()
    time.sleep(60)
```

## Output Schema

### JSON Manifest Structure

```json
{
  "processing_date": "2025-11-25T21:38:00",
  "files_processed": 3,
  "vms_processed": 2303,
  "hosts_processed": 91,
  "errors": [],
  "metrics": {
    "total_powered_on_vms": 1964,
    "total_vms_all": 2303,
    "total_hosts": 91,
    "total_physical_cores": 2678.0,
    "avg_cores_per_host": 29.43,
    "vcpu_to_pcore_ratio": 3.48,
    "avg_cpu_utilization": 0.344,
    "avg_ram_utilization": 0.536
  },
  "output_files": {
    "excel_report": "/path/to/outputs/RVTools_Consolidated_Report.xlsx",
    "summary_report": "/path/to/outputs/summary_report.txt",
    "charts_directory": "/path/to/outputs/charts/"
  },
  "status": "success"
}
```

## Error Handling

Always check the status:

```python
result = process_rvtools_data("inputs/", "outputs/")

if result["status"] == "error":
    # Handle error
    error_message = result.get("message", "Unknown error")
    errors = result.get("errors", [])
    # Log or handle errors appropriately
else:
    # Process successful result
    metrics = result["metrics"]
```

## Best Practices

1. **Validate Inputs**: Ensure RVTools files are in the `inputs/` directory before processing
2. **Check Status**: Always check `result["status"]` before accessing metrics
3. **Handle Errors**: Check `result.get("errors", [])` for processing warnings
4. **Use Manifest**: The JSON manifest provides structured access to all metrics
5. **Cache Results**: Consider caching results if processing large datasets frequently

## Dependencies

Ensure these are installed in your Cursor AI environment:

```bash
pip install pandas numpy openpyxl matplotlib seaborn scipy
```

See `requirements.txt` for complete list.

