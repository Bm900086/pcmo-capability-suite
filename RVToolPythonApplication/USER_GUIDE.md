# PCMO RVTool Analyzer - User Guide
*Professional Infrastructure Analysis Tool*

## Overview
PCMO RVTool Analyzer is a comprehensive desktop application that transforms your RVTools data exports into actionable insights through automated analysis, interactive dashboards, and advanced visualizations.

---

## System Requirements

### Windows Users
- **Operating System**: Windows 10 or later (64-bit)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: 500MB free disk space
- **Permissions**: Standard user permissions (no admin required)

### Mac Users
- **Operating System**: macOS 10.14 (Mojave) or later
- **Memory**: Minimum 4GB RAM (8GB recommended)  
- **Storage**: 500MB free disk space
- **Security**: May require security permissions (see Mac installation guide below)

---

## Installation & Setup

### Windows Installation
1. **Download**: Obtain `PCMO_RVTool_Analyzer.exe` file
2. **Save**: Place the file in a convenient location (e.g., Desktop or Documents)
3. **Run**: Double-click `PCMO_RVTool_Analyzer.exe` to launch
4. **Security Notice**: Windows may show a security warning - click "More info" then "Run anyway"

### Mac Installation
1. **Download**: Obtain the Mac version of the application
2. **Security Settings**: 
   - Go to System Preferences > Security & Privacy
   - Click "General" tab
   - Allow apps from "App Store and identified developers"
3. **First Launch**: Right-click the application and select "Open"
4. **Confirm**: Click "Open" when prompted about unidentified developer

---

## Preparing Your Data

### RVTools Export Requirements
Before using PCMO RVTool Analyzer, you need an RVTools Excel export containing:

**Required Worksheets:**
- `vInfo` - Virtual machine information
- `vHost` - ESXi host details  
- `vCluster` - Cluster information
- `vDatastore` - Storage information

### How to Export from RVTools
1. Open RVTools and connect to your vCenter
2. Wait for data collection to complete
3. Go to **File > Export all to Excel**
4. Save the file with a descriptive name
5. Ensure the file contains all four required worksheets

---

## Using the Application

### Step 1: Launch Application
- **Windows**: Double-click `PCMO_RVTool_Analyzer.exe`
- **Mac**: Double-click the application icon

### Step 2: Load Your Data
1. Click **"Browse"** button
2. Navigate to your RVTools Excel file
3. Select the file and click **"Open"**
4. Wait for data validation (green checkmark indicates success)

### Step 3: Generate Analysis
1. Click **"Generate Dashboard"** to create text-based insights
2. Click **"Generate Charts"** to create visual analytics
3. Use **"Clear Results"** to reset and start over

### Step 4: Review Results

#### Dashboard Features
- **Summary Statistics**: Key metrics about your infrastructure
- **Color-Coded Insights**: 
  - 🟢 Green: Optimal/Good status
  - 🟡 Yellow: Warning/Attention needed  
  - 🔴 Red: Critical/Issues identified
- **Detailed Analysis**: VM distribution, resource utilization, efficiency metrics

#### Chart Features
- **Resource Distribution**: CPU and memory utilization patterns
- **Infrastructure Heatmaps**: Visual correlation analysis
- **Efficiency Analysis**: Host performance optimization insights
- **Trend Identification**: Usage patterns and anomaly detection

### Step 5: Save Results
- **Dashboard**: Copy text from the results panel and paste into documents
- **Charts**: Automatically saved in application directory under `charts/` folder
- **Data Export**: Processed data available in Excel format for further analysis

---

## Understanding Your Results

### Key Metrics Explained

#### Infrastructure Overview
- **Total VMs**: Count of all virtual machines
- **Active VMs**: Currently powered-on virtual machines
- **Host Efficiency**: Resource utilization optimization score
- **Storage Distribution**: Datastore usage patterns

#### Performance Indicators
- **CPU Utilization**: Average processor usage across infrastructure
- **Memory Utilization**: RAM usage patterns and optimization opportunities  
- **VM Density**: Virtual machines per host ratio
- **Resource Allocation**: vCPU and vRAM distribution analysis

#### Efficiency Metrics
- **Over-provisioning**: Resources allocated but not actively used
- **Under-utilization**: Hosts with available capacity
- **Optimization Opportunities**: Specific recommendations for improvement

### Chart Interpretations

#### Scatter Plots
- **Host Efficiency**: Identifies high/low performing hosts
- **Resource Correlation**: Shows relationships between different metrics
- **Optimization Quadrants**: Visual categorization of infrastructure elements

#### Heatmaps
- **Utilization Patterns**: Color-coded resource usage visualization
- **Correlation Matrix**: Statistical relationships between variables
- **Cluster Analysis**: Performance comparison across clusters

---

## Troubleshooting

### Common Issues

#### File Loading Problems
**Issue**: "File validation failed" message
**Solution**: 
- Ensure Excel file contains all required worksheets (vInfo, vHost, vCluster, vDatastore)
- Verify file is not corrupted or password-protected
- Check that RVTools export completed successfully

#### Application Won't Start
**Windows**: 
- Right-click executable and "Run as administrator"
- Check Windows Defender hasn't quarantined the file
- Ensure .NET Framework is installed

**Mac**:
- Check Security & Privacy settings allow the application
- Try running from Terminal: `open -a "PCMO RVTool Analyzer"`
- Verify Gatekeeper settings are not blocking execution

#### Charts Not Generating
**Issue**: Charts fail to create or appear blank
**Solution**:
- Ensure sufficient data in RVTools export (minimum 5 VMs recommended)
- Check available disk space for chart output
- Verify write permissions in application directory

### Performance Optimization
- **Large Datasets**: For environments with 1000+ VMs, allow extra processing time
- **Memory Usage**: Close other applications if processing is slow
- **File Size**: Very large RVTools exports (>50MB) may require additional processing time

---

## Support & Feedback

### Getting Help
- Review this user guide for common questions
- Check the Technical Specifications document for calculation details
- Ensure your RVTools export includes all required data

### Best Practices
1. **Regular Analysis**: Run monthly reports to track infrastructure trends
2. **Data Quality**: Ensure RVTools captures complete environment data
3. **Comparative Analysis**: Save results over time to identify optimization opportunities
4. **Action Planning**: Use insights to drive infrastructure improvement decisions

---

## File Management

### Output Locations
- **Charts**: Saved in `charts/` subdirectory
- **Processed Data**: Excel files in application directory
- **Logs**: Application logs for troubleshooting (if needed)

### Recommended Workflow
1. Create dedicated folder for PCMO RVTool Analyzer
2. Place executable and data files in same location
3. Organize RVTools exports by date/environment
4. Archive analysis results for historical comparison

---

*PCMO RVTool Analyzer - Transforming Infrastructure Data into Actionable Insights*

**Version**: 1.0  
**Last Updated**: August 2025
