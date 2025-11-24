"""
Build script to create standalone executables for non-technical users.
Creates Windows .exe and instructions for Mac .app bundle.
"""

import subprocess
import sys
import os
from pathlib import Path

def install_pyinstaller():
    """Install PyInstaller if not already installed."""
    try:
        import PyInstaller
        print("✅ PyInstaller is already installed")
        return True
    except ImportError:
        print("📦 Installing PyInstaller...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "pyinstaller"])
            print("✅ PyInstaller installed successfully")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to install PyInstaller: {e}")
            return False

def create_windows_executable():
    """Create Windows executable using PyInstaller."""
    print("\n🔨 Building Windows executable...")
    
    # PyInstaller command for Windows
    cmd = [
        "pyinstaller",
        "--onefile",  # Single file executable
        "--windowed",  # No console window (GUI only)
        "--name", "RVTools_Analyzer",
        "--icon", "assets/icon.ico" if Path("assets/icon.ico").exists() else None,
        "--add-data", "src;src",  # Include source files
        "--add-data", "test_data;test_data",  # Include test data
        "--hidden-import", "tkinter",
        "--hidden-import", "pandas",
        "--hidden-import", "matplotlib",
        "--hidden-import", "seaborn",
        "--hidden-import", "scipy",
        "--hidden-import", "openpyxl",
        "--clean",
        "main.py"
    ]
    
    # Remove None values
    cmd = [arg for arg in cmd if arg is not None]
    
    try:
        subprocess.check_call(cmd)
        print("✅ Windows executable created successfully!")
        print(f"📁 Location: {Path.cwd() / 'dist' / 'RVTools_Analyzer.exe'}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create Windows executable: {e}")
        return False

def create_mac_instructions():
    """Create instructions for Mac users."""
    mac_instructions = """
# macOS Build Instructions

## For Mac Users - Creating .app Bundle

### Option 1: Using PyInstaller (Recommended)
```bash
# Install PyInstaller
pip install pyinstaller

# Create .app bundle
pyinstaller --onefile --windowed --name "RVTools Analyzer" \\
    --add-data "src:src" \\
    --add-data "test_data:test_data" \\
    --hidden-import tkinter \\
    --hidden-import pandas \\
    --hidden-import matplotlib \\
    --hidden-import seaborn \\
    --hidden-import scipy \\
    --hidden-import openpyxl \\
    main.py
```

### Option 2: Using py2app (Mac-specific)
```bash
# Install py2app
pip install py2app

# Create setup.py for py2app
python setup_mac.py py2app
```

### Distribution
1. The .app bundle will be in `dist/RVTools Analyzer.app`
2. Compress to .zip for easy sharing
3. Users simply double-click to run

### Code Signing (Optional for wider distribution)
```bash
# Sign the app (requires Apple Developer account)
codesign --force --deep --sign "Developer ID Application: Your Name" "dist/RVTools Analyzer.app"
```
"""
    
    with open("MAC_BUILD_INSTRUCTIONS.md", "w") as f:
        f.write(mac_instructions)
    
    print("📝 Mac build instructions created: MAC_BUILD_INSTRUCTIONS.md")

def create_user_guide():
    """Create a simple user guide for non-technical users."""
    user_guide = """
# RVTools Analyzer - User Guide
## Simple Instructions for Non-Technical Users

### What is this?
RVTools Analyzer is a desktop application that analyzes VMware infrastructure data from RVTools exports and creates beautiful charts and reports.

### System Requirements
- **Windows:** Windows 10 or newer
- **Mac:** macOS 10.14 or newer
- **No technical knowledge required!**
- **No need to install Python or any other software**

### How to Use

#### Step 1: Get RVTools Data
1. Ask your IT team to export data from RVTools
2. They should provide you with Excel files (.xlsx) containing VM and host information

#### Step 2: Run the Application
**Windows:**
- Double-click `RVTools_Analyzer.exe`
- If Windows asks "Do you want to run this file?", click "Yes"

**Mac:**
- Double-click `RVTools Analyzer.app`
- If Mac says "unidentified developer", right-click and select "Open"

#### Step 3: Analyze Your Data
1. Click "Browse" next to "Input Directory"
2. Select the folder containing your RVTools Excel files
3. Click "Browse" next to "Output Directory" 
4. Choose where to save your reports
5. Click "Process Files"
6. Wait for processing to complete (progress bar will show status)

#### Step 4: View Results
1. Click "View Insights" to see charts and analysis
2. Check the output folder for:
   - **Excel file:** Consolidated data
   - **Charts folder:** All visualization images
   - **Summary report:** Text-based insights

### Understanding the Results

#### Charts You'll Get:
- **VM Distribution:** Shows how VMs are spread across your infrastructure
- **Resource Usage:** CPU and memory utilization patterns
- **Scatter Plots:** Resource allocation relationships
- **Heatmaps:** Performance and correlation analysis

#### What to Look For:
- **Red areas:** High utilization that might need attention
- **Patterns:** Unusual resource allocation that could be optimized
- **Correlations:** Relationships between different infrastructure components

### Troubleshooting

#### Application Won't Start
- **Windows:** Make sure you have administrator privileges
- **Mac:** Try right-clicking and selecting "Open" instead of double-clicking

#### Processing Fails
- Check that RVTools files are valid Excel (.xlsx) format
- Ensure output directory has write permissions
- Contact your IT team if files seem corrupted

#### Charts Look Strange
- This usually means data format issues
- Check with whoever exported the RVTools data

### Getting Help
1. Check the log files in the output directory for error details
2. Contact your IT team with any error messages
3. Include the log file when asking for help

### Tips for Best Results
- Process complete RVTools exports (not partial data)
- Use recent exports for current insights
- Review insights regularly to track infrastructure changes
- Share charts in presentations - they're high quality!

---

**Remember:** This tool is designed to be simple! You don't need to understand the technical details - just follow the steps and interpret the visual results.
"""
    
    with open("USER_GUIDE.md", "w") as f:
        f.write(user_guide)
    
    print("📖 User guide created: USER_GUIDE.md")

def create_setup_script():
    """Create a setup script for py2app (Mac)."""
    setup_content = """
from setuptools import setup

APP = ['main.py']
DATA_FILES = [
    ('src', ['src']),
    ('test_data', ['test_data'])
]
OPTIONS = {
    'argv_emulation': True,
    'iconfile': 'assets/icon.icns',  # If you have an icon
    'plist': {
        'CFBundleName': 'RVTools Analyzer',
        'CFBundleDisplayName': 'RVTools Analyzer',
        'CFBundleGetInfoString': "VMware Infrastructure Analysis Tool",
        'CFBundleIdentifier': "com.yourcompany.rvtools-analyzer",
        'CFBundleVersion': "1.0.0",
        'CFBundleShortVersionString': "1.0.0",
        'NSHumanReadableCopyright': "Copyright © 2025 Your Company. All rights reserved."
    },
    'packages': ['tkinter', 'pandas', 'matplotlib', 'seaborn', 'scipy', 'openpyxl'],
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
"""
    
    with open("setup_mac.py", "w") as f:
        f.write(setup_content)
    
    print("🍎 Mac setup script created: setup_mac.py")

def create_distribution_readme():
    """Create README for distribution."""
    readme_content = """
# RVTools Analyzer - Distribution Package

## What's Included

### For Windows Users
- `RVTools_Analyzer.exe` - The main application (just double-click to run!)
- `USER_GUIDE.md` - Simple instructions for using the application

### For Mac Users  
- `RVTools Analyzer.app` - The main application (just double-click to run!)
- `USER_GUIDE.md` - Simple instructions for using the application

### For Everyone
- `test_data/` - Sample data files to try the application
- `ADVANCED_CHARTS_GUIDE.md` - Technical details about the charts (optional reading)

## Quick Start

1. **Get your RVTools data** - Ask your IT team for RVTools export files
2. **Run the application** - Double-click the executable for your platform
3. **Follow the on-screen instructions** - The app will guide you through the process
4. **View your results** - Charts and reports will be saved to your chosen output folder

## System Requirements

- **Windows:** Windows 10 or newer
- **Mac:** macOS 10.14 or newer  
- **Storage:** ~500MB free space for processing
- **Memory:** 4GB RAM recommended for large datasets

## No Installation Required!

This is a portable application - no need to install Python, libraries, or any other software. Just download and run!

## Support

- Read `USER_GUIDE.md` for detailed instructions
- Check log files in output directory for troubleshooting
- Contact your IT team with any technical questions

---

**Ready to analyze your VMware infrastructure? Just double-click and go!**
"""
    
    with open("DISTRIBUTION_README.md", "w") as f:
        f.write(readme_content)
    
    print("📋 Distribution README created: DISTRIBUTION_README.md")

def main():
    """Main build process."""
    print("🚀 RVTools Analyzer - Executable Builder")
    print("=" * 50)
    
    # Install PyInstaller
    if not install_pyinstaller():
        return
    
    # Create Windows executable
    if sys.platform.startswith('win'):
        success = create_windows_executable()
        if success:
            print("\n🎉 Windows executable ready for distribution!")
    else:
        print("\n💡 Run this script on Windows to create .exe file")
    
    # Create Mac instructions and setup
    create_mac_instructions()
    create_setup_script()
    
    # Create user documentation
    create_user_guide()
    create_distribution_readme()
    
    print("\n📦 Distribution Package Contents:")
    print("   ✅ Executable files (platform-specific)")
    print("   ✅ User guide for non-technical users")
    print("   ✅ Distribution README")
    print("   ✅ Mac build instructions")
    print("   ✅ Test data samples")
    
    print("\n🎯 Next Steps:")
    print("   1. Test the executable on a clean machine")
    print("   2. Create a zip file with all distribution files")
    print("   3. Share with your users!")
    
    print("\n💡 Pro Tips:")
    print("   • Test on machines without Python installed")
    print("   • Include sample data for users to try")
    print("   • Consider code signing for wider distribution")

if __name__ == "__main__":
    main()
