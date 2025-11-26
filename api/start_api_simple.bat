@echo off
REM Simple API Server Start Script
echo Starting RVTools API Server...
echo.

cd /d "%~dp0"

REM Activate venv if it exists
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)

REM Check if uvicorn is available
python -c "import uvicorn" 2>nul
if errorlevel 1 (
    echo Installing dependencies...
    pip install fastapi uvicorn python-multipart --quiet
)

REM Add parent directory to path for RVTools module
set PYTHONPATH=%CD%\..;%PYTHONPATH%

echo.
echo ========================================
echo RVTools Processing API Server
echo ========================================
echo Server starting on http://localhost:8001
echo Health check: http://localhost:8001/health
echo Press Ctrl+C to stop
echo ========================================
echo.

python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload

