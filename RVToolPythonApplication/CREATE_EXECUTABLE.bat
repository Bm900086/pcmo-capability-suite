@echo off
echo ============================================
echo PCMO RVTool Analyzer - Executable Builder
echo ============================================
echo.

echo Current directory: %CD%
echo.

echo Installing PyInstaller (if not already installed)...
python -m pip install pyinstaller
if errorlevel 1 (
    echo ERROR: Failed to install PyInstaller
    echo Please ensure Python is installed and in your PATH
    pause
    exit /b 1
)

echo.
echo Building executable...
echo This may take a few minutes...
echo.

pyinstaller --onefile --windowed --name "PCMO_RVTool_Analyzer" --add-data "src;src" --add-data "test_data;test_data" --hidden-import tkinter --hidden-import pandas --hidden-import matplotlib --hidden-import seaborn --hidden-import scipy --hidden-import openpyxl --clean main.py

if errorlevel 1 (
    echo.
    echo ERROR: Failed to build executable
    echo Check the error messages above
    pause
    exit /b 1
)

echo.
echo ============================================
echo SUCCESS! Executable created successfully!
echo ============================================
echo.
echo Executable location:
echo %CD%\dist\PCMO_RVTool_Analyzer.exe
echo.
echo File size:
for %%A in ("dist\PCMO_RVTool_Analyzer.exe") do echo %%~zA bytes
echo.
echo You can now distribute this single file to your users!
echo They just need to double-click it to run the application.
echo.
echo The executable is completely standalone and includes:
echo - All Python dependencies
echo - Your application code
echo - Sample test data
echo.
echo Distribution folder contents:
dir /b dist\
echo.
echo To test the executable:
echo 1. Navigate to: %CD%\dist\
echo 2. Double-click: PCMO_RVTool_Analyzer.exe
echo 3. The application should start immediately
echo.
pause
