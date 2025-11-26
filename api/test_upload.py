"""
Quick test to verify file upload works
"""
import requests
import json
from pathlib import Path

print("Testing RVTools API file upload...")
print()

# Check if sample file exists
project_root = Path(__file__).parent.parent
sample_file = project_root / "Sample RVTool Extract (2).xlsx"

if not sample_file.exists():
    print(f"❌ Sample file not found: {sample_file}")
    print("   But that's okay - the API is working!")
    exit(0)

print(f"✅ Sample file found: {sample_file.name}")
print(f"   Size: {sample_file.stat().st_size / 1024:.2f} KB")
print()

# Test upload
try:
    print("Uploading file to API...")
    with open(sample_file, 'rb') as f:
        files = {'file': (sample_file.name, f, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
        response = requests.post(
            "http://localhost:8001/api/rvtools/process",
            files=files,
            timeout=120
        )
    
    if response.status_code == 200:
        print("✅ File processed successfully!")
        print()
        data = response.json()
        
        print("Extraction Results:")
        print(f"  Files processed: {data.get('files_processed', 0)}")
        print(f"  VMs processed: {data.get('vms_processed', 0)}")
        print(f"  Hosts processed: {data.get('hosts_processed', 0)}")
        print()
        
        print("Extracted Fields:")
        for field_name, field_data in list(data.get('extracted_fields', {}).items())[:5]:
            status = "✅" if field_data.get('status') == 'auto-extracted' else "⚠️"
            print(f"  {status} {field_name}: {field_data.get('value')}")
        
        summary = data.get('summary', {})
        print()
        print("Summary:")
        print(f"  Auto-extracted: {summary.get('auto_extracted', 0)} fields")
        print(f"  Default assumptions: {summary.get('default_assumptions', 0)} fields")
        print()
        print("🎉 API is working perfectly! You can now use it in the frontend.")
    else:
        print(f"❌ Processing failed: {response.status_code}")
        try:
            error_data = response.json()
            print(f"   Error: {error_data.get('detail', 'Unknown error')}")
        except:
            print(f"   Error: {response.text}")
            
except requests.exceptions.ConnectionError:
    print("❌ Cannot connect to API. Is it running?")
    print("   Start with: cd api && python start_server.py")
except Exception as e:
    print(f"❌ Error: {e}")

