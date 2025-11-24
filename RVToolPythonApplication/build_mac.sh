#!/bin/bash

echo "========================================"
echo "RVTools Analyzer - Mac Executable Builder"
echo "========================================"
echo

echo "Installing PyInstaller..."
python3 -m pip install pyinstaller
if [ $? -ne 0 ]; then
    echo "Failed to install PyInstaller"
    exit 1
fi

echo
echo "Building Mac application..."
pyinstaller --onefile --windowed --name "PCMO RVTool Analyzer" \
    --add-data "src:src" \
    --add-data "test_data:test_data" \
    --hidden-import tkinter \
    --hidden-import pandas \
    --hidden-import matplotlib \
    --hidden-import seaborn \
    --hidden-import scipy \
    --hidden-import openpyxl \
    --clean main.py

if [ $? -ne 0 ]; then
    echo "Failed to build application"
    exit 1
fi

echo
echo "========================================"
echo "SUCCESS! Application created!"
echo "========================================"
echo
echo "Location: dist/PCMO RVTool Analyzer"
echo
echo "You can now share this file with non-technical users!"
echo "They just need to double-click it to run the application."
echo
