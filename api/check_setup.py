"""
Quick setup check for RVTools API
"""
import sys
from pathlib import Path

print("=" * 50)
print("RVTools API Setup Check")
print("=" * 50)
print()

# Check Python version
print(f"Python version: {sys.version}")
print()

# Check current directory
api_dir = Path.cwd()
print(f"Current directory: {api_dir}")
print()

# Check project structure
project_root = api_dir.parent
rvtools_path = project_root / "RVToolAnalysisWithCursorAI"
print(f"Project root: {project_root}")
print(f"RVTools path: {rvtools_path}")
print(f"RVTools exists: {rvtools_path.exists()}")
print()

# Check RVTools module
if rvtools_path.exists():
    processor_file = rvtools_path / "rvtool_processor.py"
    print(f"Processor file: {processor_file}")
    print(f"Processor exists: {processor_file.exists()}")
    print()
    
    # Try to import
    sys.path.insert(0, str(rvtools_path))
    try:
        from rvtool_processor import process_rvtools_data
        print("✅ RVTools module can be imported")
    except ImportError as e:
        print(f"❌ Cannot import RVTools module: {e}")
        print()
        print("Installing RVTools dependencies...")
        import subprocess
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(rvtools_path / "requirements.txt"), "--quiet"])
            print("✅ Dependencies installed")
        except Exception as e2:
            print(f"❌ Error installing dependencies: {e2}")
else:
    print("❌ RVTools module not found!")

print()

# Check API dependencies
print("Checking API dependencies...")
try:
    import fastapi
    print(f"✅ FastAPI: {fastapi.__version__}")
except ImportError:
    print("❌ FastAPI not installed")
    print("Install with: pip install fastapi uvicorn python-multipart")

try:
    import uvicorn
    print(f"✅ Uvicorn: {uvicorn.__version__}")
except ImportError:
    print("❌ Uvicorn not installed")

try:
    import multipart
    print("✅ python-multipart installed")
except ImportError:
    print("❌ python-multipart not installed")

print()
print("=" * 50)
print("Setup check complete!")
print("=" * 50)

