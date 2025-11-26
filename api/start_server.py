"""
Simple Python script to start the RVTools API server
Run this from the api directory: python start_server.py
"""
import sys
import os
import subprocess
from pathlib import Path

# Ensure we're in the api directory
api_dir = Path(__file__).parent
os.chdir(api_dir)

# Check if dependencies are installed
try:
    import fastapi
    import uvicorn
except ImportError:
    print("Installing dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fastapi", "uvicorn", "python-multipart", "--quiet"])
    print("Dependencies installed!")

# Set Python path to include parent directory
import os
parent_dir = api_dir.parent
os.environ['PYTHONPATH'] = str(parent_dir) + os.pathsep + os.environ.get('PYTHONPATH', '')

print()
print("=" * 50)
print("Starting RVTools API Server")
print("=" * 50)
print()
print("Server will start on http://localhost:8001")
print("Health check: http://localhost:8001/health")
print()
print("Press Ctrl+C to stop the server")
print("=" * 50)
print()

# Start the server
subprocess.run([
    sys.executable, "-m", "uvicorn",
    "rvtools.process:app",
    "--host", "0.0.0.0",
    "--port", "8001",
    "--reload"
])

