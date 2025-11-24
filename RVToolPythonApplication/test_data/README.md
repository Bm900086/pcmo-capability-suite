# RVTools Test Data Setup

## Where to Place Your RVTools Files

### 📁 **Test Data Folder Location**
Place your RVTools Excel files in this folder:
```
c:\Users\bm900086\Documents\AdvancedAnalytics\RVToolPythonApplication\test_data\
```

### 📋 **Supported File Types**
The application will automatically process these file types:
- `.xls` (Excel 97-2003)
- `.xlsx` (Excel 2007+)
- `.xlsm` (Excel with macros)

### 🏗️ **Required RVTools File Structure**
Each RVTools file should contain these sheets:
- **vInfo** - Virtual machine information
- **vHost** - ESX host information
- **vMetaData** - Metadata and environmental information

### 📊 **Expected Column Headers**

#### vInfo Sheet Required Columns:
- VM
- Powerstate
- Connection state
- CPUs
- Memory
- Resource pool
- Provisioned MiB
- Datacenter
- Cluster
- Host
- OS according to the configuration file
- OS according to the VMware Tools
- VI SDK Server

#### vHost Sheet Required Columns:
- Host
- Datacenter
- Cluster
- # CPU
- # Cores
- CPU usage %
- # Memory
- Memory usage %
- ESX Version
- Vendor
- Model

### 🚀 **How to Test**

1. **Copy your RVTools files** to the `test_data` folder
2. **Run the application**:
   ```bash
   python main.py
   ```
3. **In the GUI**:
   - Browse to select the `test_data` folder as input
   - Choose an output location for the consolidated report
   - Click "Process Files"

### 📁 **Example Folder Structure**
```
test_data/
├── RVTools_Site1_20250101.xlsx
├── RVTools_Site2_20250101.xlsx
├── RVTools_Site3_20250101.xlsx
└── (more RVTools files...)
```

### 📋 **Output Files**
After processing, you'll get:
- **Consolidated Excel Report** with all data merged
- **charts/** folder with visualizations
- **summary_report.txt** with key metrics
- **logs/** folder with processing logs

### ⚠️ **Important Notes**
- Files must be closed (not open in Excel) during processing
- The application will skip files that don't contain the required sheets
- Any errors will be logged and displayed in the GUI
- Large files may take several minutes to process

### 🧪 **Test Without Real Data**
If you don't have RVTools files yet, you can create sample Excel files with the required sheet names and column headers to test the application structure.
