@echo off
echo ========================================
echo RVTools Analyzer - Executable Builder
echo ========================================
echo.

echo Installing PyInstaller...
python -m pip install pyinstaller
if errorlevel 1 (
    echo Failed to install PyInstaller
    pause
    exit /b 1
)

echo.
echo Building Windows executable...
pyinstaller --onefile --windowed --name "PCMO_RVTool_Analyzer" --add-data "src;src" --add-data "test_data;test_data" --hidden-import tkinter --hidden-import pandas --hidden-import matplotlib --hidden-import seaborn --hidden-import scipy --hidden-import openpyxl --clean main.py

if errorlevel 1 (
    echo Failed to build executable
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Executable created!
echo ========================================
echo.
echo Location: dist\PCMO_RVTool_Analyzer.exe
echo.
echo You can now share this file with non-technical users!
echo They just need to double-click it to run the application.
echo.
pause
