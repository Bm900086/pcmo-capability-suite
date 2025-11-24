# PCMO RVTool Analyzer - Google Apps Script Setup Guide

## Overview
This Google Apps Script version replicates the complete functionality of the PCMO RVTool Analyzer desktop application, allowing you to process RVTools data directly in Google Sheets without any software installation.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Google Sheets Document
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Rename it to "PCMO RVTool Analyzer"

### Step 2: Install the Script
1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete the default `myFunction()` code
3. Copy and paste the complete code from `PCMO_RVTool_Analyzer_GoogleAppsScript.gs`
4. Click **"Save"** (Ctrl+S)
5. Name your project: "PCMO RVTool Analyzer"

### Step 3: Authorize the Script
1. Click **"Run"** button (or press F5)
2. Click **"Review Permissions"**
3. Select your Google account
4. Click **"Advanced"** then **"Go to PCMO RVTool Analyzer (unsafe)"**
5. Click **"Allow"** to grant necessary permissions

### Step 4: Upload Your RVTools File
1. Export your RVTools data to Excel (File > Export all to Excel)
2. Upload the Excel file to your **Google Drive**
3. Note the exact filename (e.g., "RVTools_Export_2025.xlsx")

### Step 5: Run Analysis
1. Go back to your Google Sheet
2. Click **"PCMO RVTool Analyzer"** menu (appears after script authorization)
3. Click **"Run Analysis"**
4. Enter your RVTools filename when prompted
5. Wait for processing (1-3 minutes depending on data size)

## 📊 What You'll Get

### Generated Sheets:
- **PCMO_Dashboard_Results**: Complete infrastructure dashboard
- **PCMO_Charts**: Visual charts and graphs

### Analysis Includes:
- ✅ Complete infrastructure overview
- ✅ Host resource analysis
- ✅ VM resource distribution  
- ✅ Utilization metrics with color coding
- ✅ Performance insights and recommendations
- ✅ Visual charts for presentations

## 🎯 Key Features

### Automatic Processing
```javascript
// Processes all required RVTools worksheets:
✓ vInfo    - Virtual machine information
✓ vHost    - ESXi host details
✓ vCluster - Cluster information  
✓ vDatastore - Storage information
```

### Real-Time Calculations
- **Host Infrastructure**: Physical cores, memory, socket analysis
- **VM Resources**: CPU, memory, storage allocation patterns
- **Utilization Metrics**: Performance ratios with industry benchmarks
- **Optimization Insights**: Color-coded recommendations

### Interactive Dashboard
- **Color-Coded Metrics**: Green (optimal), Yellow (warning), Red (critical)
- **Professional Formatting**: Ready for management presentations
- **Comprehensive Insights**: Detailed analysis with actionable recommendations

## 🔧 Advanced Usage

### Using the Custom Menu
After setup, you'll see a new **"PCMO RVTool Analyzer"** menu with options:

#### **Run Analysis**
- Main function to process RVTools files
- Prompts for filename input
- Generates complete dashboard

#### **Create Sample Data**
- Creates test data for demonstration
- Useful for training or testing
- Generates realistic sample infrastructure

#### **Clear Results**
- Removes all analysis results
- Cleans up workspace
- Prepares for new analysis

#### **About**
- Shows version and feature information
- Provides usage instructions

### File Requirements
Your RVTools Excel file must contain these worksheets:
- `vInfo` - VM information and configuration
- `vHost` - ESXi host hardware and utilization
- `vCluster` - Cluster configuration
- `vDatastore` - Storage information

### Troubleshooting

#### "File Not Found" Error
**Solution**: Ensure your RVTools file is uploaded to Google Drive and enter the exact filename including extension

#### "Missing Required Worksheets" Error  
**Solution**: Verify your RVTools export contains all 4 required worksheets (vInfo, vHost, vCluster, vDatastore)

#### "Authorization Required" Error
**Solution**: Re-run the authorization process (Step 3 above)

#### Slow Processing
**Solution**: Large datasets (1000+ VMs) may take several minutes. Be patient and don't refresh the page.

## 📈 Understanding Your Results

### Dashboard Sections

#### **🔢 OVERALL COUNTS**
- Total VMs (powered on vs. all visible)
- Host count summary
- Infrastructure inventory overview

#### **⚡ HOST INFRASTRUCTURE RESOURCES** 
- Physical hardware inventory
- CPU cores and socket analysis
- Memory capacity planning
- Infrastructure standardization metrics

#### **💻 VIRTUAL MACHINE RESOURCES**
- Resource allocation patterns
- CPU and memory distribution
- Storage provisioning analysis
- Workload density metrics

#### **📈 UTILIZATION & PERFORMANCE**
- Consolidation ratio analysis
- CPU and memory utilization
- Performance threshold monitoring
- Optimization opportunity identification

#### **🎯 KEY INSIGHTS**
- Color-coded status indicators
- Immediate action recommendations
- Performance summary
- Capacity planning guidance

### Color Coding Guide
- 🟢 **Green (Optimal)**: Performance within recommended ranges
- 🟡 **Yellow (Warning)**: Attention needed, monitor closely
- 🔴 **Red (Critical)**: Immediate review or action required

### Industry Benchmarks Used
- **Consolidation Ratio**: 2:1 to 4:1 (optimal)
- **CPU Utilization**: 30-70% (balanced)
- **Memory Utilization**: 40-80% (healthy)

## 🔒 Security & Privacy

### Data Handling
- **Local Processing**: All analysis performed within your Google account
- **No External Access**: Data never leaves Google's secure environment
- **Private Results**: Only you can access your analysis results

### Permissions Required
- **Google Drive**: Read RVTools files
- **Google Sheets**: Create analysis results
- **Google Charts**: Generate visualizations

## 🎓 Training & Best Practices

### Regular Analysis Schedule
- **Monthly Reviews**: Track infrastructure trends
- **Quarterly Planning**: Capacity and optimization planning
- **Project Analysis**: Before/after infrastructure changes

### Sharing Results
- **Management Reports**: Charts are presentation-ready
- **Technical Reviews**: Detailed metrics for IT teams
- **Capacity Planning**: Data-driven expansion decisions

### Data Quality Tips
- **Fresh Exports**: Use recent RVTools data (within 30 days)
- **Complete Scans**: Ensure RVTools captures all VMs and hosts
- **Consistent Timing**: Run exports during business hours for accurate utilization

## 📞 Support & Maintenance

### Version Updates
- Script automatically uses latest calculation methods
- No software updates required
- Compatible with all Google Workspace accounts

### Getting Help
1. **Check Error Messages**: Most issues have clear descriptions
2. **Review File Format**: Ensure RVTools export is complete
3. **Contact IT Team**: For infrastructure-specific questions
4. **Documentation**: Reference this guide for setup issues

### Extending Functionality
The script is designed to be customizable:
- Modify thresholds in status functions
- Add custom charts in `createCharts()` function
- Extend metrics in `calculateMetrics()` function
- Customize formatting in `formatDashboardSheet()` function

---

## 🎉 Ready to Analyze!

Your Google Apps Script version of PCMO RVTool Analyzer is now ready to provide the same comprehensive infrastructure analysis as the desktop application, but with the convenience of cloud-based processing and sharing.

**Next Steps:**
1. Upload your RVTools export to Google Drive
2. Run the analysis using the custom menu
3. Review your infrastructure dashboard
4. Share insights with your team
5. Schedule regular analysis for optimization tracking

**Questions?** Contact your IT team or refer to the Technical Specifications documentation for detailed calculation methodologies.

---

*Google Apps Script Version 1.0 - August 2025*
