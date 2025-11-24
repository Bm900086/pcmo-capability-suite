@echo off
echo ========================================
echo Starting RAG Chatbot Backend
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo [ERROR] Virtual environment not found!
    echo Please run these commands first:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Check if index exists
if not exist "faiss_index_local" (
    echo [WARNING] FAISS index not found!
    echo Please run: python ingest.py
    echo.
    echo Do you want to continue anyway? (y/n)
    set /p continue=
    if /i not "%continue%"=="y" exit /b 1
)

echo.
echo Starting FastAPI server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
uvicorn main:app --reload

