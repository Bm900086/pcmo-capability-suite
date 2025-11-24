# 📁 Executable Location Guide
## Where to Find Your PCMO RVTool Analyzer Executable

### 🎯 After Building Successfully

When you run the build command, your executable will be created in:

```
📁 Your Project Directory
├── 📁 dist/                           ← EXECUTABLE LOCATION
│   └── 🔧 PCMO_RVTool_Analyzer.exe    ← YOUR EXECUTABLE FILE
├── 📁 build/                          ← Temporary build files (can delete)
├── 📄 PCMO_RVTool_Analyzer.spec       ← PyInstaller spec file
└── ... (other project files)
```

### 📍 Exact Path

**Full path:** `C:\Users\bm900086\Documents\AdvancedAnalytics\RVToolPythonApplication\dist\PCMO_RVTool_Analyzer.exe`

### 🔨 Build Commands

#### Option 1: Simple Build (Recommended)
```bash
python -m PyInstaller --onefile --windowed --name "PCMO_RVTool_Analyzer" main.py
```

#### Option 2: Advanced Build (with dependencies)
```bash
python -m PyInstaller --onefile --windowed --name "PCMO_RVTool_Analyzer" --add-data "src;src" --add-data "test_data;test_data" --hidden-import tkinter --hidden-import pandas --hidden-import matplotlib --hidden-import seaborn --hidden-import scipy --hidden-import openpyxl main.py
```

#### Option 3: Use the Batch File
```bash
.\CREATE_EXECUTABLE.bat
```

### 📊 What You'll Get

#### File Details:
- **Name:** `PCMO_RVTool_Analyzer.exe`
- **Size:** ~100-200MB (includes all dependencies)
- **Type:** Standalone Windows executable
- **Requirements:** None! (completely self-contained)

#### Distribution Ready:
✅ **No Python installation needed**  
✅ **No package dependencies**  
✅ **Works on any Windows 10+ machine**  
✅ **Just double-click to run**

### 🚀 Testing Your Executable

1. **Navigate to:** `dist\` folder
2. **Double-click:** `PCMO_RVTool_Analyzer.exe`
3. **Verify:** Application window opens with "PCMO RVTool Analyzer v1.0.0" title
4. **Test:** Try processing some sample data

### 📦 Sharing with Users

#### What to Share:
- **Single file:** `PCMO_RVTool_Analyzer.exe`
- **User guide:** `QUICK_START.md` (optional)
- **Sample data:** `test_data\` folder (optional)

#### How to Share:
- **Email:** Attach the .exe file (if under size limit)
- **Cloud storage:** Upload to OneDrive, Google Drive, etc.
- **Network share:** Place in shared folder
- **USB drive:** Copy file directly

### 🔧 Troubleshooting

#### Build Fails:
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version: `python --version` (should be 3.8+)
- Verify PyInstaller: `python -m pip install pyinstaller`

#### Executable Doesn't Work:
- Test on the build machine first
- Check antivirus isn't blocking it
- Try running from command prompt to see error messages

#### File Too Large:
- Basic build (~50-100MB) vs. advanced build with data (~100-200MB)
- You can exclude test data for smaller file size
- Consider using `--exclude-module` for unused packages

### 💡 Pro Tips

#### For Faster Builds:
- Use `--onefile` for single executable
- Add `--windowed` to hide console window
- Use specific `--name` for custom filename

#### For Better User Experience:
- Include an icon: `--icon=icon.ico`
- Add version info: Use a `.spec` file for detailed metadata
- Sign the executable for enterprise distribution

#### For Debugging:
- Remove `--windowed` to see console output
- Check the `build\` folder for detailed logs
- Use `--log-level DEBUG` for verbose output

---

### 🎉 Success!

Once built successfully, you'll have a professional, standalone application that anyone can run without technical knowledge!

**Remember:** The executable will be in the `dist\` folder, named `PCMO_RVTool_Analyzer.exe`
