@echo off
REM Quick Start - RVTools API Server
echo.
echo ========================================
echo Starting RVTools API Server
echo ========================================
echo.

cd /d "%~dp0"

REM Install dependencies if needed
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo Installing API dependencies...
    pip install fastapi uvicorn python-multipart --quiet
    echo Done!
    echo.
)

REM Set Python path to include parent directory
set PYTHONPATH=%CD%\..;%PYTHONPATH%

echo Starting server on http://localhost:8001
echo.
echo Health check: http://localhost:8001/health
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload

