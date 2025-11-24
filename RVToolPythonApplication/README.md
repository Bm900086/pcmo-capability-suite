# RVTools Python Application

A comprehensive Python application that replicates the functionality of the Excel VBA macro for processing RVTools data. This application consolidates data from multiple RVTools Excel files, generates analytical dashboards, and provides detailed infrastructure insights.

## Features

### Core Functionality
- **Multi-file Processing**: Automatically discovers and processes all RVTools Excel files in a specified folder
- **Data Consolidation**: Merges vInfo, vHost, and vMetaData sheets from multiple files
- **OS Classification**: Intelligent OS classification based on configuration and VMware Tools data
- **Utilization Buckets**: Automatically categorizes CPU and RAM utilization into meaningful buckets

### Dashboard Generation
- **PCMO Dashboard**: Performance Capacity Management Operations metrics
- **Host Heatmap**: Visual representation of host utilization patterns  
- **Resource Charts**: VM distribution and utilization analysis
- **Summary Reports**: Comprehensive text-based infrastructure summaries

### User Interface
- **Intuitive GUI**: Easy-to-use graphical interface built with tkinter
- **Progress Monitoring**: Real-time progress updates during processing
- **Logging Integration**: Comprehensive logging with GUI display
- **Enhanced Statistics Display**: Visually appealing statistics with emojis, box drawing, and color coding
- **Key Insights Dashboard**: Automated analysis with recommendations based on utilization thresholds
- **Charts & Insights Window**: Dedicated window for post-processing analysis with tabbed interface

## Installation

### Prerequisites
- Python 3.7 or higher
- Windows, macOS, or Linux

### Setup Instructions

1. **Clone or download the application**:
   ```bash
   git clone <repository-url>
   cd RVToolPythonApplication
   ```

2. **Install required packages**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python main.py
   ```

## Usage

### Basic Operation

1. **Launch the Application**:
   ```bash
   python main.py
   ```

2. **Select Input Folder**:
   - Click "Browse..." next to "Input Folder"
   - Choose the folder containing your RVTools Excel files (.xls, .xlsx, .xlsm)

3. **Choose Output Location**:
   - Click "Browse..." next to "Output File"
   - Specify where to save the consolidated report

4. **Process Files**:
   - Click "Process Files" to start processing
   - Monitor progress in the progress bar and log area
   - View enhanced statistics in the right panel with visual indicators
   - Click "View Charts & Insights" for detailed post-processing analysis

### Enhanced Statistics Display

The application features a visually enhanced statistics dashboard that includes:

- **🎨 Color-Coded Display**: Dark theme with syntax highlighting for better readability
  - 🟢 Green: Optimal values (good performance indicators)
  - 🟡 Orange: Warning values (needs attention)
  - 🔴 Red: Critical values (requires immediate review)
  - 🔵 Blue: Neutral information and borders
  - 🟡 Yellow: Section headers
  - 🟦 Cyan: Metric names and values

- **📊 Professional Formatting**: Box drawing characters and proper alignment
- **📈 Real-time Metrics**: Live updates during processing with proper alignment
- **🎯 Smart Insights**: Automated recommendations based on utilization thresholds:
  - Consolidation ratios: Optimal (2-4:1), Review needed (>4:1), Low density (<2:1)
  - CPU Load: Balanced (30-70%), High (>70%), Low utilization (<30%)
  - Memory Usage: Healthy (40-80%), High (>80%), Underutilized (<40%)
- **✅ Success Indicators**: Processing reliability metrics with color-coded status

### Interactive Data Filtering

Advanced filtering capabilities allow you to analyze specific subsets of your infrastructure:

- **🔍 Multi-Dimensional Filters**:
  - **Power State**: Filter by VM power state (All, poweredOn, poweredOff, suspended)
  - **Operating System**: Filter by OS classification (All, Server, Desktop, Windows, Linux, Other, Unknown)
  - **Cluster**: Filter by specific clusters in your environment (dynamically populated)

- **🔄 Real-time Analysis**: Apply filters and instantly see updated statistics
- **🔁 Reset Capability**: Quick reset to view all data
- **📊 Dynamic Updates**: All metrics recalculate based on filtered data

#### How to Use Filters:
1. Process your RVTools files normally
2. Use the filter controls above the statistics display
3. Select your desired criteria from the dropdown menus
4. Click "Apply Filters" to see updated analysis
5. Click "Reset" to return to full dataset view

### Charts & Insights Window

After processing, access detailed analysis through the "View Charts & Insights" button:

- **Key Insights Tab**: Strategic infrastructure analysis with automated recommendations
- **Charts Available Tab**: Direct access to generated visualization files  
- **Data Quality Tab**: Processing validation and performance metrics
- **Open Charts Folder**: Direct file explorer access to generated charts

### Expected Input Format

The application expects RVTools Excel files with the following sheets:
- **vInfo**: Virtual machine information
- **vHost**: ESX host information  
- **vMetaData**: Metadata and environmental information

### Output Files

The application generates several output files:

1. **Consolidated Excel Report**: Main output file containing:
   - Consolidated_vInfo sheet
   - Consolidated_vHost sheet
   - Consolidated_vMetaData sheet

2. **Charts Directory**: Contains visualization files:
   - `vm_powerstate_distribution.png`
   - `os_classification_distribution.png`
   - `vm_per_cluster_distribution.png`
   - `cpu_utilization_distribution.png`
   - `memory_utilization_distribution.png`
   - `host_utilization_heatmap.png`

3. **Summary Report**: Text file with key metrics and statistics

## Configuration

### Column Mappings

The application processes specific columns from RVTools files:

**vInfo Required Columns**:
- VM, Powerstate, Connection state, CPUs, Memory
- Resource pool, Provisioned MiB, Datacenter, Cluster, Host
- OS according to the configuration file
- OS according to the VMware Tools
- VI SDK Server

**vHost Required Columns**:
- Host, Datacenter, Cluster, # CPU, # Cores
- CPU usage %, # Memory, Memory usage %
- ESX Version, Vendor, Model

### OS Classification Rules

The application automatically classifies operating systems based on:
- **Server**: Contains keywords like 'server', 'rhel', 'centos', 'debian'
- **Desktop**: Contains keywords like 'desktop', 'windows 10/11/7', 'mac'
- **Windows (Unspecified)**: Contains 'windows' but not desktop-specific
- **Linux (Unspecified)**: Contains 'linux' but not server-specific
- **Other**: Any other OS not matching above patterns
- **Unknown / No OS Info**: No OS information available

### Utilization Buckets

**CPU Utilization**:
- 1. 0-10%
- 2. >10-20%
- 3. >20-40%
- 4. >40%+

**RAM Utilization**:
- 1. 0-20%
- 2. >20-40%
- 3. >40-60%
- 4. >60-80%
- 5. >80%+

## Architecture

### Module Structure

```
RVToolPythonApplication/
├── main.py                          # Application entry point
├── requirements.txt                 # Python dependencies
├── README.md                       # This file
├── src/
│   ├── core/
│   │   ├── config.py              # Configuration management
│   │   ├── data_processor.py      # Core data processing engine
│   │   └── dashboard_generator.py # Dashboard and chart generation
│   ├── gui/
│   │   └── main_window.py         # Main GUI window
│   └── utils/
│       └── logger.py              # Logging utilities
└── logs/                          # Application logs (created at runtime)
```

### Key Components

1. **Data Processor** (`data_processor.py`):
   - Handles Excel file reading and parsing
   - Implements data consolidation logic
   - Manages OS classification and utilization bucketing

2. **Dashboard Generator** (`dashboard_generator.py`):
   - Creates PCMO metrics calculations
   - Generates visualization charts
   - Produces summary reports

3. **Main Window** (`main_window.py`):
   - Provides user interface
   - Manages threading for non-blocking processing
   - Handles progress updates and logging display

4. **Configuration** (`config.py`):
   - Centralizes all configuration settings
   - Defines column mappings and classification rules
   - Manages utilization bucket definitions

## Troubleshooting

### Common Issues

1. **Import Errors**:
   - Ensure all required packages are installed: `pip install -r requirements.txt`
   - Check Python version (3.7+ required)
   - Note: tkinter comes built-in with Python, ignore tkinter installation errors

2. **Processing Errors**:
   - If you see "'ProcessingResult' object has no attribute 'total_powered_on_vms'", this has been fixed in the enhanced version
   - Ensure the application uses the latest enhanced statistics display method

3. **File Access Errors**:
   - Ensure RVTools files are not open in Excel
   - Check file permissions for input and output locations
   - Verify disk space for output files

4. **Processing Errors**:
   - Check that RVTools files contain expected sheet names (vInfo, vHost, vMetaData)
   - Verify column headers match expected format
   - Review log messages for specific error details

5. **Memory Issues**:
   - For large datasets, ensure sufficient system RAM
   - Consider processing files in smaller batches

6. **Display Issues**:
   - If color coding doesn't appear properly, ensure you're using a terminal/system that supports ANSI color codes
   - For best results, use the application on Windows with a modern terminal

### Error Logging

All errors are logged to:
- GUI log panel (real-time)
- Log files in `logs/` directory
- Console output (when run from command line)

## Performance Considerations

- **File Size**: Tested with files up to 100MB+ 
- **Memory Usage**: Approximately 2-3x the size of input data
- **Processing Time**: Varies by file size and complexity (typically 1-5 minutes for standard datasets)

## Comparison to VBA Macro

This Python application replicates all major functionality of the original Excel VBA macro:

| Feature | VBA Macro | Python App | Notes |
|---------|-----------|------------|-------|
| Multi-file processing | ✅ | ✅ | Same functionality |
| Data consolidation | ✅ | ✅ | Same logic implemented |
| OS classification | ✅ | ✅ | Identical classification rules |
| Utilization buckets | ✅ | ✅ | Same bucket definitions |
| PCMO calculations | ✅ | ✅ | All metrics replicated |
| Progress monitoring | ✅ | ✅ | Enhanced in Python version |
| Error handling | ✅ | ✅ | Improved error reporting |
| Statistics display | Basic | ✅ | Enhanced with visual formatting, emojis, insights |
| Visualization | Limited | ✅ | Enhanced with matplotlib charts |
| Interactive insights | ❌ | ✅ | Dedicated insights window with tabs |
| Cross-platform | Windows only | ✅ | Windows, macOS, Linux |

## Future Enhancements

Potential improvements for future versions:
- Web-based interface option
- Database integration for historical trending
- Advanced filtering and drill-down capabilities  
- Automated report scheduling
- Integration with vCenter APIs for real-time data
- Custom dashboard templates
- Export to additional formats (PDF, PowerBI, etc.)

## Support

For issues, questions, or contributions:
1. Check the troubleshooting section above
2. Review log files for error details
3. Ensure input data format matches expectations
4. Verify all dependencies are properly installed

## License

This application is developed for internal use and analysis of RVTools data exports.
