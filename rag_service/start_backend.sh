#!/bin/bash

echo "========================================"
echo "Starting RAG Chatbot Backend"
echo "========================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "[ERROR] Virtual environment not found!"
    echo "Please run these commands first:"
    echo "  python3 -m venv venv"
    echo "  source venv/bin/activate"
    echo "  pip install -r requirements.txt"
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if index exists
if [ ! -d "faiss_index_local" ]; then
    echo "[WARNING] FAISS index not found!"
    echo "Please run: python ingest.py"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " continue
    if [ "$continue" != "y" ]; then
        exit 1
    fi
fi

echo ""
echo "Starting FastAPI server on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""
uvicorn main:app --reload

