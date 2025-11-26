#!/bin/bash
# Start RVTools Processing API Server (Linux/Mac)

echo "Starting RVTools Processing API..."

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed or not in PATH"
    echo "Please install Python 3.7+ and try again"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install -q -r requirements.txt

# Install RVTools module dependencies
echo "Installing RVTools module dependencies..."
cd ../RVToolAnalysisWithCursorAI
pip install -q -r requirements.txt
cd ../api

# Start the API server
echo ""
echo "========================================"
echo "RVTools Processing API Server"
echo "========================================"
echo "Server will start on http://localhost:8001"
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload

