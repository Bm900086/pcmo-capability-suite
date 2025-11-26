"""
RVTools Processing API Endpoint
Provides REST API for processing RVTools Excel files and extracting model inputs.
"""

import os
import json
import tempfile
from pathlib import Path
from typing import Dict, Any, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import sys

# Add RVToolAnalysisWithCursorAI to path
# This file is in api/rvtools/process.py
# __file__ = api/rvtools/process.py
# parent = api/rvtools/
# parent.parent = api/
# parent.parent.parent = project root
api_dir = Path(__file__).parent.parent  # api/
project_root = api_dir.parent  # project root
rvtools_module_path = project_root / "RVToolAnalysisWithCursorAI"

# Debug path resolution
import os
if not rvtools_module_path.exists():
    # Try alternative path resolution
    current_file = Path(__file__).resolve()
    project_root_alt = current_file.parent.parent.parent
    rvtools_module_path_alt = project_root_alt / "RVToolAnalysisWithCursorAI"
    if rvtools_module_path_alt.exists():
        rvtools_module_path = rvtools_module_path_alt
        project_root = project_root_alt

sys.path.insert(0, str(rvtools_module_path))

try:
    from rvtool_processor import process_rvtools_data
except ImportError:
    # Fallback if module not found
    process_rvtools_data = None

app = FastAPI(title="RVTools Processing API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://0.0.0.0:5173"
    ],  # Vite default ports and variations
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Field mapping from RVTools metrics to model inputs
FIELD_MAPPING = {
    "totalVMs": {
        "rvtools_field": "total_powered_on_vms",
        "source_sheet": "vInfo",
        "source_column": "VM count (poweredOn)",
        "description": "Total powered-on virtual machines",
        "unit": "count"
    },
    "totalHosts": {
        "rvtools_field": "total_hosts",
        "source_sheet": "vHost",
        "source_column": "Host count",
        "description": "Total ESXi hosts",
        "unit": "count"
    },
    "consolidationRatio": {
        "rvtools_field": "vcpu_to_pcore_ratio",
        "source_sheet": "Calculated",
        "source_column": "vCPU to pCore ratio",
        "description": "Virtual CPU to physical core consolidation ratio",
        "unit": "ratio",
        "calculation": "total_vcpus / total_physical_cores"
    },
    "totalStorageGB": {
        "rvtools_field": "total_provisioned_gb",
        "source_sheet": "vInfo",
        "source_column": "Provisioned MiB (converted to GB)",
        "description": "Total provisioned storage in GB",
        "unit": "GB",
        "calculation": "sum(Provisioned MiB) / 1024"
    },
    "avgCpuUtilization": {
        "rvtools_field": "avg_cpu_utilization",
        "source_sheet": "vHost",
        "source_column": "CPU usage %",
        "description": "Average CPU utilization across all hosts",
        "unit": "percentage (0-1)"
    },
    "avgRamUtilization": {
        "rvtools_field": "avg_ram_utilization",
        "source_sheet": "vHost",
        "source_column": "Memory usage %",
        "description": "Average RAM utilization across all hosts",
        "unit": "percentage (0-1)"
    },
    "avgCoresPerHost": {
        "rvtools_field": "avg_cores_per_host",
        "source_sheet": "vHost",
        "source_column": "# Cores",
        "description": "Average physical cores per host",
        "unit": "count"
    },
    "avgRamGBPerHost": {
        "rvtools_field": "avg_ram_gb_per_host",
        "source_sheet": "vHost",
        "source_column": "# Memory (MB converted to GB)",
        "description": "Average RAM per host in GB",
        "unit": "GB",
        "calculation": "sum(# Memory MB) / 1024 / host_count"
    },
    "avgVcpusPerVM": {
        "rvtools_field": "avg_vcpus_per_vm",
        "source_sheet": "vInfo",
        "source_column": "CPUs",
        "description": "Average virtual CPUs per VM",
        "unit": "count"
    },
    "avgRamGBPerVM": {
        "rvtools_field": "avg_ram_gb_per_vm",
        "source_sheet": "vInfo",
        "source_column": "Memory (MiB converted to GB)",
        "description": "Average RAM per VM in GB",
        "unit": "GB",
        "calculation": "sum(Memory MiB) / 1024 / vm_count"
    }
}

# Default assumptions for fields not available in RVTools
DEFAULT_ASSUMPTIONS = {
    "avgCostPerHost": {
        "value": 25000,
        "description": "Average cost per host (not available in RVTools)",
        "unit": "USD",
        "reason": "Business assumption - not in infrastructure data"
    },
    "avgPublicCloudCostPerMonth": {
        "value": 280,
        "description": "Average public cloud cost per instance/month",
        "unit": "USD/month",
        "reason": "Market assumption - not in infrastructure data"
    },
    "ftes": {
        "value": 0,
        "description": "Full-time equivalents (FTEs)",
        "unit": "count",
        "reason": "Organizational data - not in infrastructure data"
    },
    "burdenedCostPerFTE": {
        "value": 0,
        "description": "Burdened cost per FTE",
        "unit": "USD",
        "reason": "Organizational data - not in infrastructure data"
    }
}


def map_rvtools_to_model_inputs(manifest: Dict[str, Any]) -> Dict[str, Any]:
    """
    Map RVTools extracted metrics to model input fields.
    
    Args:
        manifest: RVTools processing manifest with metrics
        
    Returns:
        Dictionary of extracted fields with metadata
    """
    extracted_fields = {}
    metrics = manifest.get("metrics", {})
    
    for model_field, mapping in FIELD_MAPPING.items():
        rvtools_field = mapping["rvtools_field"]
        value = metrics.get(rvtools_field)
        
        if value is not None:
            extracted_fields[model_field] = {
                "value": value,
                "source": "rvtools",
                "source_sheet": mapping["source_sheet"],
                "source_column": mapping["source_column"],
                "description": mapping["description"],
                "unit": mapping["unit"],
                "calculation": mapping.get("calculation"),
                "status": "auto-extracted"
            }
        else:
            # Field not found in RVTools - use default assumption
            if model_field in DEFAULT_ASSUMPTIONS:
                default = DEFAULT_ASSUMPTIONS[model_field]
                extracted_fields[model_field] = {
                    "value": default["value"],
                    "source": "default",
                    "description": default["description"],
                    "unit": default["unit"],
                    "reason": default["reason"],
                    "status": "default-assumption"
                }
    
    return extracted_fields


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "rvtools_module_available": process_rvtools_data is not None
    }

@app.options("/api/rvtools/process")
async def options_process():
    """Handle CORS preflight requests."""
    return JSONResponse(content={}, status_code=200)

@app.post("/api/rvtools/process")
async def process_rvtools_file(file: UploadFile = File(...)):
    """
    Process RVTools Excel file and extract model inputs.
    
    Args:
        file: Uploaded RVTools Excel file (.xlsx, .xls, .xlsm)
        
    Returns:
        JSON response with extracted fields, assumptions, and metadata
    """
    # Log request for debugging
    import logging
    logger = logging.getLogger(__name__)
    logger.info(f"Received file upload request: {file.filename}")
    
    if process_rvtools_data is None:
        error_msg = (
            "RVTools processing module not available. "
            f"Module path: {rvtools_module_path}, "
            f"Exists: {rvtools_module_path.exists() if rvtools_module_path else False}, "
            f"Project root: {project_root}"
        )
        raise HTTPException(
            status_code=503,
            detail=error_msg
        )
    
    # Validate file type
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ['.xlsx', '.xls', '.xlsm']:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Expected .xlsx, .xls, or .xlsm, got {file_ext}"
        )
    
    # Create temporary directories
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        input_dir = temp_path / "inputs"
        output_dir = temp_path / "outputs"
        input_dir.mkdir()
        output_dir.mkdir()
        
        # Save uploaded file
        file_path = input_dir / file.filename
        try:
            content = await file.read()
            with open(file_path, "wb") as f:
                f.write(content)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error saving uploaded file: {str(e)}"
            )
        
        # Process RVTools file
        try:
            result = process_rvtools_data(
                str(input_dir),
                str(output_dir)
            )
            
            if result.get("status") != "success":
                raise HTTPException(
                    status_code=500,
                    detail=f"RVTools processing failed: {result.get('message', 'Unknown error')}"
                )
            
            # Map to model inputs
            extracted_fields = map_rvtools_to_model_inputs(result)
            
            # Build response
            response = {
                "status": "success",
                "processing_date": result.get("processing_date"),
                "files_processed": result.get("files_processed", 0),
                "vms_processed": result.get("vms_processed", 0),
                "hosts_processed": result.get("hosts_processed", 0),
                "extracted_fields": extracted_fields,
                "summary": {
                    "auto_extracted": sum(1 for f in extracted_fields.values() if f.get("status") == "auto-extracted"),
                    "default_assumptions": sum(1 for f in extracted_fields.values() if f.get("status") == "default-assumption"),
                    "user_overrides": 0  # Will be tracked on frontend
                },
                "raw_metrics": result.get("metrics", {})
            }
            
            return JSONResponse(content=response)
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error processing RVTools file: {str(e)}"
            )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

