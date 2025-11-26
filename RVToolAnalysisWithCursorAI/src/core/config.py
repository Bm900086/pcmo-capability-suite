"""
Application Configuration Module
Handles configuration settings for the RVTools Python Application
"""

import os
from pathlib import Path
from typing import List, Dict, Any
import json

class AppConfig:
    """Configuration manager for the RVTools application."""
    
    def __init__(self):
        self.app_name = "PCMO RVTool Analyzer"
        self.version = "1.0.0"
        self.author = "Advanced Analytics Team"
        
        # File processing settings
        self.supported_file_extensions = ['.xls', '.xlsx', '.xlsm']
        self.required_sheets = ['vInfo', 'vHost', 'vMetaData']
        
        # Column mappings from VBA code
        self.required_vinfo_cols = [
            "VM", "Powerstate", "Connection state", "CPUs", "Memory", 
            "Resource pool", "Provisioned MiB", "Datacenter", "Cluster", 
            "Host", "OS according to the configuration file", 
            "OS according to the VMware Tools", "VI SDK Server", "OS Classification"
        ]
        
        self.required_vhost_cols = [
            "Host", "Datacenter", "Cluster", "# CPU", "# Cores", 
            "CPU usage %", "# Memory", "Memory usage %", "ESX Version", 
            "Vendor", "Model"
        ]
        
        # Output settings
        self.output_sheets = {
            'consolidated_vinfo': 'Consolidated_vInfo',
            'consolidated_vhost': 'Consolidated_vHost', 
            'consolidated_metadata': 'Consolidated_vMetaData',
            'pcmo_dashboard': 'PCMO_Dashboard',
            'host_heatmap': 'Host_Heatmap',
            'master_dashboard': 'Master_Dashboard'
        }
        
        # Utilization buckets (from VBA code)
        self.cpu_buckets = [
            (0.0, 0.1, "1. 0-10%"),
            (0.1, 0.2, "2. >10-20%"),
            (0.2, 0.4, "3. >20-40%"),
            (0.4, float('inf'), "4. >40%+")
        ]
        
        self.ram_buckets = [
            (0.0, 0.2, "1. 0-20%"),
            (0.2, 0.4, "2. >20-40%"),
            (0.4, 0.6, "3. >40-60%"),
            (0.6, 0.8, "4. >60-80%"),
            (0.8, float('inf'), "5. >80%+")
        ]
        
        # OS Classification rules (from VBA logic)
        self.os_classification_rules = {
            'server_keywords': ['server', 'rhel', 'centos', 'debian'],
            'desktop_keywords': ['desktop', 'windows 10', 'windows 11', 'windows 7', 'mac'],
            'windows_keywords': ['windows'],
            'linux_keywords': ['linux']
        }
    
    def get_cpu_bucket(self, usage: float) -> str:
        """Get CPU utilization bucket for given usage percentage."""
        for min_val, max_val, label in self.cpu_buckets:
            if min_val <= usage < max_val:
                return label
        return "N/A"
    
    def get_ram_bucket(self, usage: float) -> str:
        """Get RAM utilization bucket for given usage percentage."""
        for min_val, max_val, label in self.ram_buckets:
            if min_val <= usage < max_val:
                return label
        return "N/A"
    
    def classify_os(self, os_config: str, os_tools: str) -> str:
        """
        Classify OS based on configuration and tools strings.
        Replicates VBA OS classification logic.
        """
        os_config_lower = str(os_config).lower() if os_config else ""
        os_tools_lower = str(os_tools).lower() if os_tools else ""
        
        # Server classification
        for keyword in self.os_classification_rules['server_keywords']:
            if keyword in os_config_lower or keyword in os_tools_lower:
                return "Server"
        
        # Desktop classification  
        for keyword in self.os_classification_rules['desktop_keywords']:
            if keyword in os_config_lower or keyword in os_tools_lower:
                return "Desktop"
        
        # Broad Windows classification
        if any(keyword in os_config_lower or keyword in os_tools_lower 
               for keyword in self.os_classification_rules['windows_keywords']):
            return "Windows (Unspecified)"
        
        # Broad Linux classification
        if any(keyword in os_config_lower or keyword in os_tools_lower 
               for keyword in self.os_classification_rules['linux_keywords']):
            return "Linux (Unspecified)"
        
        # No OS info
        if not os_config and not os_tools:
            return "Unknown / No OS Info"
        
        return "Other"
