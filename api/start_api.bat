@echo off
REM Start RVTools Processing API Server
echo Starting RVTools Processing API...

cd /d "%~dp0"

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7+ and try again
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo Installing dependencies...
pip install -r requirements.txt --quiet

REM Install RVTools module dependencies
echo Installing RVTools module dependencies...
cd ..\RVToolAnalysisWithCursorAI
pip install -r requirements.txt --quiet
cd ..\api

REM Start the API server
echo.
echo ========================================
echo RVTools Processing API Server
echo ========================================
echo Server will start on http://localhost:8001
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload

pause

