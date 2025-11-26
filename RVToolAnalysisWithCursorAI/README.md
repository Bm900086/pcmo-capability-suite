# RV Tool Analysis Module - Cursor AI Integration

## 1. Overview

**RVToolAnalysisWithCursorAI** is a Python-based analytical module designed to read, process, and analyze RVTools export files (Excel format). Its purpose is to serve as a plug-in module for a larger Cursor AI system that manages multiple business models.

This module provides:

- **Automated ingestion** of RVTools data from multiple Excel files
- **Data consolidation** across multiple RVTools exports
- **Intelligent OS classification** based on configuration and VMware Tools data
- **Utilization analysis** with automatic bucketing (CPU and RAM)
- **Comprehensive analytics** including PCMO dashboard metrics
- **Visualization generation** (charts, heatmaps, scatter plots)
- **Structured output files** ready for downstream modeling
- **Standardized code interface** so Cursor AI can integrate it as a sub-function

## 2. Inputs

### Accepted Input Types

| Input Type | Description |
|------------|-------------|
| `.xlsx` | RVTools Excel export files (primary format) |
| `.xls` | Legacy Excel format (supported) |
| `.xlsm` | Excel macro-enabled format (supported) |

### Expected Input Structure

RVTools Excel files must contain the following worksheets:

#### **vInfo Sheet** (Virtual Machine Information)
Required columns:
- `VM` - Virtual machine name
- `Powerstate` - Current power status (poweredOn, poweredOff, suspended)
- `Connection state` - VM connection status
- `CPUs` - Number of virtual CPUs allocated
- `Memory` - Virtual memory allocated (MiB)
- `Resource pool` - Resource pool assignment
- `Provisioned MiB` - Total storage provisioned
- `Datacenter` - vSphere datacenter
- `Cluster` - vSphere cluster membership
- `Host` - ESXi host running the VM
- `OS according to the configuration file` - OS from VM config
- `OS according to the VMware Tools` - OS detected by VMware Tools
- `VI SDK Server` - vCenter server identifier

#### **vHost Sheet** (ESXi Host Information)
Required columns:
- `Host` - ESXi host name
- `Datacenter` - Datacenter membership
- `Cluster` - Cluster membership
- `# CPU` - Physical CPU sockets
- `# Cores` - Total physical CPU cores
- `CPU usage %` - Host CPU utilization percentage
- `# Memory` - Physical memory installed (MB)
- `Memory usage %` - Host memory utilization percentage
- `ESX Version` - ESXi version
- `Vendor` - Hardware vendor
- `Model` - Hardware model

#### **vMetaData Sheet** (Metadata)
- Contains environmental and metadata information
- Structure may vary by RVTools version

### Input Location

Inputs should be placed in:

```
RVToolAnalysisWithCursorAI/
    inputs/
        RVToolsExport_2025_01.xlsx
        RVToolsExport_2025_02.xlsx
        ...
```

**Note:** The tool processes ALL Excel files found in the `inputs/` directory and consolidates them into a single analysis.

## 3. Process Flow (What the Python Code Does)

The Python tool performs the following automated steps:

### Step 1 — Load Input Files

- Scans `inputs/` directory for Excel files (.xlsx, .xls, .xlsm)
- Detects file type and loads using Pandas
- Validates necessary worksheets (vInfo, vHost, vMetaData)
- Handles header row detection (flexible positioning)
- Reports files found and processed

### Step 2 — Clean and Normalize Data

- Removes empty rows/columns
- Standardizes column names across multiple files
- Converts numeric fields (handles string-to-number conversion)
- Normalizes percentage fields (removes % symbols, converts to 0-1 range)
- Formats date fields (if present)
- Handles missing values gracefully

### Step 3 — Transform and Enrich

- **Consolidates data** from multiple RVTools files into unified datasets
- **OS Classification**: Automatically classifies operating systems:
  - Server (keywords: server, rhel, centos, debian)
  - Desktop (keywords: desktop, windows 10/11/7, mac)
  - Windows (Unspecified)
  - Linux (Unspecified)
  - Other
  - Unknown / No OS Info
- **Utilization Bucketing**: Categorizes CPU and RAM utilization:
  - CPU: 0-10%, >10-20%, >20-40%, >40%+
  - RAM: 0-20%, >20-40%, >40-60%, >60-80%, >80%+
- **Source Tracking**: Adds `SourceFile` column to track data origin
- **Maps relationships**: VM → Host → Cluster → Datacenter

### Step 4 — Compute Analytics

Generates comprehensive PCMO (Performance Capacity Management Operations) metrics:

#### VM Metrics (Powered-On VMs Only)
- Total powered-on VMs count
- Total VMs (all states)
- Total vCPUs (sum of all VM CPUs)
- Average vCPUs per VM
- Total VM RAM in GB
- Average RAM per VM in GB
- Total provisioned storage in GB
- Average provisioned storage per VM in GB

#### Host Metrics
- Total hosts count
- Total physical cores (sum of all host cores)
- Average cores per host
- Average CPU sockets per host
- Total host RAM in GB
- Average RAM per host in GB
- Average CPU utilization % (across all hosts)
- Average RAM utilization % (across all hosts)

#### Ratios and KPIs
- **vCPU to Physical Core ratio** = Total vCPUs / Total Physical Cores
- **Consolidation density** indicators
- **Utilization efficiency** scores
- **Resource allocation** patterns

### Step 5 — Generate Output Artifacts

The tool generates multiple output formats:

| Output | Format | Description | Location |
|--------|--------|-------------|-----------|
| **Consolidated Data** | `.xlsx` | All VM, Host, and Metadata consolidated into Excel with 3 worksheets | `outputs/RVTools_Consolidated_Report.xlsx` |
| **Summary Report** | `.txt` | Human-readable text report with all metrics and calculation logic | `outputs/summary_report.txt` |
| **Charts** | `.png` (300 DPI) | 9+ visualization files (distributions, heatmaps, scatter plots) | `outputs/charts/` |
| **JSON Manifest** | `.json` | Machine-readable summary for Cursor AI integration | `outputs/rvtool_manifest.json` |

All outputs are written to:

```
outputs/
    RVTools_Consolidated_Report.xlsx
    summary_report.txt
    rvtool_manifest.json
    charts/
        vm_powerstate_distribution.png
        os_classification_distribution.png
        vm_per_cluster_distribution.png
        cpu_utilization_distribution.png
        memory_utilization_distribution.png
        host_efficiency_scatter.png
        enhanced_host_utilization_heatmap.png
        vm_density_by_cluster_heatmap.png
        host_infrastructure_correlation_heatmap.png
```

## 4. Output Examples

### Consolidated Excel Report

**File:** `outputs/RVTools_Consolidated_Report.xlsx`

Contains 3 worksheets:
- **Consolidated_vInfo**: All VM data with OS Classification and SourceFile tracking
- **Consolidated_vHost**: All host data with Utilization Buckets
- **Consolidated_vMetaData**: All metadata consolidated

### KPI Summary Report

**File:** `outputs/summary_report.txt`

Text-based report with sections:
- Overall Counts (VMs, Hosts)
- Host Resources (Aggregates & Averages)
- VM Resources (Powered-On VM Averages)
- Utilization & Ratios
- Additional Calculated Totals

Each metric includes calculation logic/notes.

### Machine-Readable Manifest (Used by Cursor AI)

**File:** `outputs/rvtool_manifest.json`

This JSON provides structured data for Cursor AI integration:

```json
{
  "processing_date": "2025-11-25T21:38:00",
  "files_processed": 3,
  "vms_processed": 2303,
  "hosts_processed": 91,
  "metrics": {
    "total_powered_on_vms": 1964,
    "total_vms_all": 2303,
    "total_hosts": 91,
    "total_physical_cores": 2678,
    "vcpu_to_pcore_ratio": 3.48,
    "avg_cpu_utilization": 0.344,
    "avg_ram_utilization": 0.536
  },
  "output_files": {
    "excel_report": "outputs/RVTools_Consolidated_Report.xlsx",
    "summary_report": "outputs/summary_report.txt",
    "charts_directory": "outputs/charts/"
  },
  "status": "success"
}
```

### Visualization Charts

**Location:** `outputs/charts/`

High-resolution (300 DPI) PNG files:
- Distribution charts (VM power state, OS classification, cluster distribution)
- Utilization histograms (CPU, Memory)
- Scatter plots (host efficiency, VM resource allocation)
- Correlation heatmaps (resource relationships)
- Performance heatmaps (host utilization patterns)

## 5. Integration with Larger Cursor AI Project

### Module Purpose

Cursor AI should interpret this module as:

- **A standalone analytical component** that processes VMware infrastructure data
- **A sub-function callable** by the main project for infrastructure analysis
- **A provider of standardized output files** for downstream business models
- **A data source** for capacity planning, resource optimization, and infrastructure insights

### Recommended Function Description for Cursor AI

> "This module processes RVTools export data (VMware infrastructure snapshots) and outputs cleaned inventory datasets, analytic summaries, and machine-readable manifests. It can be invoked by other business models to supply hardware/software inventory insights, capacity-planning KPIs, utilization metrics, and infrastructure optimization recommendations. The module consolidates data from multiple RVTools exports, automatically classifies operating systems, calculates utilization buckets, and generates comprehensive analytics suitable for executive reporting and capacity planning."

### Integration Points

1. **Input Interface**: Place RVTools Excel files in `inputs/` directory
2. **Execution**: Run `main.py` or call programmatic interface (see below)
3. **Output Consumption**: Read from `outputs/` directory:
   - Excel file for detailed data analysis
   - JSON manifest for automated processing
   - Charts for visualization/reporting
   - Summary report for quick insights

### Programmatic Interface

For Cursor AI integration, the module can be called programmatically:

```python
from src.core.data_processor import RVToolsDataProcessor
from src.core.dashboard_generator import DashboardGenerator
from src.core.config import AppConfig
from pathlib import Path
import json

def process_rvtools_data(input_dir, output_dir):
    """
    Process RVTools data and generate outputs.
    
    Args:
        input_dir: Path to directory containing RVTools Excel files
        output_dir: Path to output directory
        
    Returns:
        dict: Processing results and metrics
    """
    config = AppConfig()
    processor = RVToolsDataProcessor(config)
    
    # Process files
    result = processor.process_folder(Path(input_dir))
    
    if result.success:
        # Get consolidated data
        data = processor.get_consolidated_data()
        
        # Generate metrics
        dashboard_gen = DashboardGenerator(config)
        metrics = dashboard_gen.generate_pcmo_dashboard(
            data['vinfo'],
            data['vhost']
        )
        
        # Export to Excel
        excel_path = Path(output_dir) / "RVTools_Consolidated_Report.xlsx"
        processor.export_to_excel(excel_path)
        
        # Generate summary report
        summary_path = Path(output_dir) / "summary_report.txt"
        dashboard_gen.generate_summary_report(metrics, summary_path)
        
        # Generate charts
        charts_dir = Path(output_dir) / "charts"
        charts_dir.mkdir(exist_ok=True)
        dashboard_gen.create_vm_distribution_charts(data['vinfo'], charts_dir)
        dashboard_gen.create_resource_utilization_charts(data['vhost'], charts_dir)
        dashboard_gen.create_advanced_analysis_charts(data['vinfo'], data['vhost'], charts_dir)
        dashboard_gen.create_correlation_analysis(data['vinfo'], data['vhost'], charts_dir)
        dashboard_gen.create_performance_heatmaps(data['vinfo'], data['vhost'], charts_dir)
        
        # Create JSON manifest
        manifest = {
            "processing_date": datetime.now().isoformat(),
            "files_processed": result.files_processed,
            "vms_processed": result.vms_processed,
            "hosts_processed": result.hosts_processed,
            "metrics": {
                "total_powered_on_vms": metrics.total_powered_on_vms,
                "total_vms_all": metrics.total_vms_all,
                "total_hosts": metrics.total_hosts,
                "total_physical_cores": metrics.total_physical_cores,
                "vcpu_to_pcore_ratio": metrics.vcpu_to_pcore_ratio,
                "avg_cpu_utilization": metrics.avg_cpu_utilization,
                "avg_ram_utilization": metrics.avg_ram_utilization
            },
            "output_files": {
                "excel_report": str(excel_path),
                "summary_report": str(summary_path),
                "charts_directory": str(charts_dir)
            },
            "status": "success"
        }
        
        manifest_path = Path(output_dir) / "rvtool_manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        return manifest
    
    return {"status": "error", "message": result.message}
```

## 6. File Structure

```
RVToolAnalysisWithCursorAI/
│
├── inputs/                          # Place RVTools Excel files here
│   └── (RVTools exports)
│
├── outputs/                         # Auto-generated outputs
│   ├── RVTools_Consolidated_Report.xlsx
│   ├── summary_report.txt
│   ├── rvtool_manifest.json
│   └── charts/
│       └── (9+ PNG visualization files)
│
├── src/                             # Source code modules
│   ├── core/
│   │   ├── config.py               # Configuration and constants
│   │   ├── data_processor.py       # Data processing engine
│   │   └── dashboard_generator.py  # Analytics and chart generation
│   ├── gui/
│   │   └── main_window.py         # GUI interface (optional)
│   └── utils/
│       └── logger.py               # Logging utilities
│
├── main.py                         # Entry point (GUI mode)
├── rvtool_processor.py             # Programmatic interface (for Cursor AI)
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

## 7. Installation and Setup

### Prerequisites

- Python 3.7 or higher
- Windows, macOS, or Linux

### Setup Instructions

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Place input files:**
   - Copy RVTools Excel files to `inputs/` directory

3. **Run the tool:**
   
   **Option A - GUI Mode:**
   ```bash
   python main.py
   ```
   
   **Option B - Programmatic Mode (for Cursor AI):**
   ```python
   from rvtool_processor import process_rvtools_data
   
   result = process_rvtools_data("inputs/", "outputs/")
   ```

## 8. Dependencies

Key Python packages (see `requirements.txt`):

- `pandas>=2.0.0` - Data processing
- `numpy>=1.24.0` - Numerical operations
- `openpyxl>=3.1.0` - Excel file handling
- `matplotlib>=3.7.0` - Chart generation
- `seaborn>=0.12.0` - Advanced visualizations
- `scipy>=1.11.0` - Statistical analysis
- `tkinter` - GUI framework (built-in with Python)

## 9. Use Cases for Cursor AI Integration

This module can be integrated into larger business models for:

1. **Capacity Planning Models**: Supply infrastructure metrics and utilization trends
2. **Cost Optimization Models**: Provide resource allocation data for cost analysis
3. **Risk Assessment Models**: Supply lifecycle and utilization risk indicators
4. **Compliance Models**: Provide OS classification and inventory data
5. **Reporting Dashboards**: Supply pre-generated charts and metrics
6. **Resource Optimization Models**: Provide utilization data for rightsizing recommendations

## 10. Technical Notes

- **Multi-file Processing**: Automatically consolidates data from multiple RVTools exports
- **OS Classification**: Intelligent classification based on keyword matching
- **Utilization Buckets**: Predefined buckets matching industry standards
- **Error Handling**: Comprehensive logging and graceful error handling
- **Thread Safety**: GUI uses background threads for non-blocking processing
- **Data Validation**: Validates required columns and handles missing data gracefully

## 11. Support and Documentation

For detailed technical specifications, see:
- `TECHNICAL_SPECIFICATIONS.md` - Calculation methodology
- `PROJECT_CONTEXT.md` - Project overview
- `USER_GUIDE.md` - End-user instructions

---

**Module Version:** 1.0.0  
**Last Updated:** November 2025  
**Compatible with:** Cursor AI integration framework

