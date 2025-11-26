"""
Test script to validate RVTools API with sample file
"""
import sys
from pathlib import Path
import requests
import json

# Get project root
project_root = Path(__file__).parent.parent
sample_file = project_root / "Sample RVTool Extract (2).xlsx"

if not sample_file.exists():
    print(f"ERROR: Sample file not found at {sample_file}")
    sys.exit(1)

print(f"Testing RVTools API with sample file: {sample_file.name}")
print(f"File size: {sample_file.stat().st_size / 1024:.2f} KB")
print()

# Test health endpoint
print("1. Testing health endpoint...")
try:
    response = requests.get("http://localhost:8001/health", timeout=5)
    if response.status_code == 200:
        print("   ✓ Health check passed")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"   ✗ Health check failed: {response.status_code}")
        sys.exit(1)
except requests.exceptions.ConnectionError:
    print("   ✗ Cannot connect to API. Is the server running?")
    print("   Start with: cd api && python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload")
    sys.exit(1)
except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

print()

# Test file upload
print("2. Testing file upload...")
try:
    with open(sample_file, 'rb') as f:
        files = {'file': (sample_file.name, f, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
        response = requests.post(
            "http://localhost:8001/api/rvtools/process",
            files=files,
            timeout=120  # 2 minute timeout for processing
        )
    
    if response.status_code == 200:
        print("   ✓ File processed successfully")
        data = response.json()
        print(f"   Files processed: {data.get('files_processed', 0)}")
        print(f"   VMs processed: {data.get('vms_processed', 0)}")
        print(f"   Hosts processed: {data.get('hosts_processed', 0)}")
        print()
        print("   Extracted Fields:")
        for field_name, field_data in data.get('extracted_fields', {}).items():
            status_icon = "✓" if field_data.get('status') == 'auto-extracted' else "⚠"
            print(f"   {status_icon} {field_name}: {field_data.get('value')} ({field_data.get('unit', 'N/A')})")
            print(f"      Source: {field_data.get('source_sheet', 'N/A')} / {field_data.get('source_column', 'N/A')}")
        print()
        print("   Summary:")
        summary = data.get('summary', {})
        print(f"   - Auto-extracted: {summary.get('auto_extracted', 0)}")
        print(f"   - Default assumptions: {summary.get('default_assumptions', 0)}")
        print(f"   - User overrides: {summary.get('user_overrides', 0)}")
    else:
        print(f"   ✗ Processing failed: {response.status_code}")
        try:
            error_data = response.json()
            print(f"   Error: {error_data.get('detail', 'Unknown error')}")
        except:
            print(f"   Error: {response.text}")
        sys.exit(1)
except Exception as e:
    print(f"   ✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print()
print("✓ All tests passed!")

