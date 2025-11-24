#!/usr/bin/env python3
"""
Create sample RVTools test data for testing the application.
"""

import pandas as pd
from pathlib import Path

def create_sample_data():
    """Create sample RVTools Excel file for testing."""
    
    # Create sample vInfo data
    vinfo_data = {
        'VM': ['VM001', 'VM002', 'VM003', 'VM004', 'VM005'],
        'Powerstate': ['poweredOn', 'poweredOn', 'poweredOff', 'poweredOn', 'poweredOn'],
        'Connection state': ['connected', 'connected', 'disconnected', 'connected', 'connected'],
        'CPUs': [2, 4, 2, 8, 4],
        'Memory': [4096, 8192, 2048, 16384, 8192],
        'Resource pool': ['Production', 'Development', 'Test', 'Production', 'Development'],
        'Provisioned MiB': [102400, 204800, 51200, 409600, 204800],
        'Datacenter': ['DC1', 'DC1', 'DC2', 'DC1', 'DC2'],
        'Cluster': ['Cluster-A', 'Cluster-A', 'Cluster-B', 'Cluster-A', 'Cluster-B'],
        'Host': ['esxi-01', 'esxi-02', 'esxi-03', 'esxi-01', 'esxi-03'],
        'OS according to the configuration file': [
            'Windows Server 2019', 'CentOS 7', 'Windows 10', 
            'Red Hat Enterprise Linux 8', 'Ubuntu 20.04'
        ],
        'OS according to the VMware Tools': [
            'Microsoft Windows Server 2019', 'CentOS Linux 7', 
            'Microsoft Windows 10', 'Red Hat Enterprise Linux 8', 'Ubuntu Linux 20.04'
        ],
        'VI SDK Server': ['vcenter-01', 'vcenter-01', 'vcenter-02', 'vcenter-01', 'vcenter-02']
    }

    # Create sample vHost data
    vhost_data = {
        'Host': ['esxi-01', 'esxi-02', 'esxi-03'],
        'Datacenter': ['DC1', 'DC1', 'DC2'],
        'Cluster': ['Cluster-A', 'Cluster-A', 'Cluster-B'],
        '# CPU': [2, 2, 2],
        '# Cores': [24, 28, 32],
        'CPU usage %': ['15%', '25%', '35%'],
        '# Memory': [262144, 524288, 393216],
        'Memory usage %': ['45%', '65%', '55%'],
        'ESX Version': ['7.0.3', '7.0.3', '8.0.1'],
        'Vendor': ['Dell Inc.', 'HPE', 'Dell Inc.'],
        'Model': ['PowerEdge R640', 'ProLiant DL380', 'PowerEdge R750']
    }

    # Create sample metadata
    metadata_data = {
        'Property': ['vCenter Version', 'Cluster Count', 'Host Count', 'VM Count', 'Datastore Count'],
        'Value': ['7.0.3', '2', '3', '5', '8'],
        'Description': ['vCenter Server Version', 'Total Clusters', 'Total Hosts', 'Total VMs', 'Total Datastores']
    }

    # Ensure test_data directory exists
    test_data_dir = Path('test_data')
    test_data_dir.mkdir(exist_ok=True)
    
    # Create Excel file with multiple sheets
    output_file = test_data_dir / 'Sample_RVTools_Data.xlsx'
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        pd.DataFrame(vinfo_data).to_excel(writer, sheet_name='vInfo', index=False)
        pd.DataFrame(vhost_data).to_excel(writer, sheet_name='vHost', index=False)
        pd.DataFrame(metadata_data).to_excel(writer, sheet_name='vMetaData', index=False)
    
    print(f'Sample RVTools test file created: {output_file}')
    return output_file

if __name__ == "__main__":
    create_sample_data()
