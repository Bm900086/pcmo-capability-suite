"""
RV Tool Analysis - Programmatic Interface for Cursor AI Integration

This module provides a programmatic interface for processing RVTools data
without requiring the GUI. Designed for integration with Cursor AI systems.

Usage:
    from rvtool_processor import process_rvtools_data
    
    result = process_rvtools_data("inputs/", "outputs/")
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, Any
import logging

from src.core.data_processor import RVToolsDataProcessor
from src.core.dashboard_generator import DashboardGenerator
from src.core.config import AppConfig
from src.utils.logger import setup_logger


def process_rvtools_data(
    input_dir: str,
    output_dir: str,
    log_level: int = logging.INFO
) -> Dict[str, Any]:
    """
    Process RVTools data and generate outputs.
    
    This is the main entry point for Cursor AI integration.
    Processes all RVTools Excel files in the input directory and generates
    consolidated reports, analytics, and visualizations.
    
    Args:
        input_dir: Path to directory containing RVTools Excel files
        output_dir: Path to output directory (will be created if it doesn't exist)
        log_level: Logging level (default: logging.INFO)
        
    Returns:
        dict: Processing results containing:
            - status: "success" or "error"
            - processing_date: ISO format timestamp
            - files_processed: Number of files processed
            - vms_processed: Number of VMs processed
            - hosts_processed: Number of hosts processed
            - metrics: Dictionary of calculated metrics
            - output_files: Dictionary of generated output file paths
            - message: Error message if status is "error"
    
    Example:
        >>> result = process_rvtools_data("inputs/", "outputs/")
        >>> if result["status"] == "success":
        ...     print(f"Processed {result['files_processed']} files")
        ...     print(f"Metrics: {result['metrics']}")
    """
    # Setup logging
    setup_logger(log_level=log_level, log_to_file=True)
    logger = logging.getLogger(__name__)
    
    try:
        logger.info("Starting RVTools data processing (programmatic mode)")
        
        # Convert to Path objects
        input_path = Path(input_dir)
        output_path = Path(output_dir)
        
        # Validate input directory
        if not input_path.exists():
            return {
                "status": "error",
                "message": f"Input directory does not exist: {input_dir}",
                "processing_date": datetime.now().isoformat()
            }
        
        # Create output directory if it doesn't exist
        output_path.mkdir(parents=True, exist_ok=True)
        charts_dir = output_path / "charts"
        charts_dir.mkdir(exist_ok=True)
        
        # Initialize components
        config = AppConfig()
        processor = RVToolsDataProcessor(config)
        
        # Process files
        logger.info(f"Processing files from: {input_path}")
        result = processor.process_folder(input_path)
        
        if not result.success:
            return {
                "status": "error",
                "message": result.message,
                "processing_date": datetime.now().isoformat(),
                "errors": result.errors
            }
        
        # Get consolidated data
        data = processor.get_consolidated_data()
        
        # Generate metrics
        logger.info("Generating PCMO dashboard metrics")
        dashboard_gen = DashboardGenerator(config)
        metrics = dashboard_gen.generate_pcmo_dashboard(
            data['vinfo'],
            data['vhost']
        )
        
        # Export to Excel
        excel_path = output_path / "RVTools_Consolidated_Report.xlsx"
        logger.info(f"Exporting consolidated data to: {excel_path}")
        export_success = processor.export_to_excel(excel_path)
        
        if not export_success:
            return {
                "status": "error",
                "message": "Failed to export consolidated data to Excel",
                "processing_date": datetime.now().isoformat()
            }
        
        # Generate summary report
        summary_path = output_path / "summary_report.txt"
        logger.info(f"Generating summary report: {summary_path}")
        dashboard_gen.generate_summary_report(metrics, summary_path)
        
        # Generate charts
        logger.info(f"Generating charts in: {charts_dir}")
        dashboard_gen.create_vm_distribution_charts(data['vinfo'], charts_dir)
        dashboard_gen.create_resource_utilization_charts(data['vhost'], charts_dir)
        dashboard_gen.create_advanced_analysis_charts(data['vinfo'], data['vhost'], charts_dir)
        dashboard_gen.create_correlation_analysis(data['vinfo'], data['vhost'], charts_dir)
        dashboard_gen.create_performance_heatmaps(data['vinfo'], data['vhost'], charts_dir)
        
        # Create JSON manifest for Cursor AI
        manifest = {
            "processing_date": datetime.now().isoformat(),
            "files_processed": result.files_processed,
            "vms_processed": result.vms_processed,
            "hosts_processed": result.hosts_processed,
            "errors": result.errors if result.errors else [],
            "metrics": {
                "total_powered_on_vms": int(metrics.total_powered_on_vms),
                "total_vms_all": int(metrics.total_vms_all),
                "total_hosts": int(metrics.total_hosts),
                "total_physical_cores": float(metrics.total_physical_cores),
                "avg_cores_per_host": float(metrics.avg_cores_per_host),
                "avg_sockets_per_host": float(metrics.avg_sockets_per_host),
                "avg_ram_gb_per_host": float(metrics.avg_ram_gb_per_host),
                "total_vcpus": int(metrics.total_vcpus),
                "avg_vcpus_per_vm": float(metrics.avg_vcpus_per_vm),
                "avg_ram_gb_per_vm": float(metrics.avg_ram_gb_per_vm),
                "avg_provisioned_gb_per_vm": float(metrics.avg_provisioned_gb_per_vm),
                "total_ram_gb_vms": float(metrics.total_ram_gb_vms),
                "total_provisioned_gb": float(metrics.total_provisioned_gb),
                "total_host_ram_gb": float(metrics.total_host_ram_gb),
                "vcpu_to_pcore_ratio": float(metrics.vcpu_to_pcore_ratio),
                "avg_cpu_utilization": float(metrics.avg_cpu_utilization),
                "avg_ram_utilization": float(metrics.avg_ram_utilization)
            },
            "output_files": {
                "excel_report": str(excel_path.absolute()),
                "summary_report": str(summary_path.absolute()),
                "charts_directory": str(charts_dir.absolute())
            },
            "status": "success"
        }
        
        # Save manifest
        manifest_path = output_path / "rvtool_manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        logger.info(f"Processing completed successfully. Manifest saved to: {manifest_path}")
        
        return manifest
        
    except Exception as e:
        logger.error(f"Error processing RVTools data: {str(e)}", exc_info=True)
        return {
            "status": "error",
            "message": f"Processing failed: {str(e)}",
            "processing_date": datetime.now().isoformat()
        }


def get_metrics_from_manifest(manifest_path: str) -> Optional[Dict[str, Any]]:
    """
    Read metrics from a previously generated manifest file.
    
    Args:
        manifest_path: Path to rvtool_manifest.json file
        
    Returns:
        dict: Metrics dictionary, or None if file doesn't exist
    """
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
            return manifest.get('metrics')
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None


if __name__ == "__main__":
    # Example usage when run directly
    import sys
    
    if len(sys.argv) >= 3:
        input_dir = sys.argv[1]
        output_dir = sys.argv[2]
    else:
        # Default to relative paths
        input_dir = "inputs"
        output_dir = "outputs"
    
    result = process_rvtools_data(input_dir, output_dir)
    
    if result["status"] == "success":
        print(f"✅ Processing completed successfully!")
        print(f"   Files processed: {result['files_processed']}")
        print(f"   VMs processed: {result['vms_processed']}")
        print(f"   Hosts processed: {result['hosts_processed']}")
        print(f"   Output directory: {result['output_files']['charts_directory']}")
    else:
        print(f"❌ Processing failed: {result.get('message', 'Unknown error')}")
        sys.exit(1)

