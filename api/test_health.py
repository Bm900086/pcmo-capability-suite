"""
Quick test to verify API is running
"""
import requests
import time
import sys

print("Testing RVTools API connection...")
print()

# Wait a moment for server to start
print("Waiting for server to start...")
time.sleep(2)

try:
    response = requests.get("http://localhost:8001/health", timeout=5)
    if response.status_code == 200:
        data = response.json()
        print("✅ API is running!")
        print(f"   Status: {data.get('status')}")
        print(f"   RVTools module available: {data.get('rvtools_module_available')}")
        print()
        print("🎉 Server is ready! You can now use the RVTools upload feature.")
    else:
        print(f"❌ API returned status code: {response.status_code}")
        sys.exit(1)
except requests.exceptions.ConnectionError:
    print("❌ Cannot connect to API server.")
    print()
    print("The server may still be starting. Try:")
    print("  1. Wait a few more seconds")
    print("  2. Check if server is running: Look for 'Uvicorn running' message")
    print("  3. Manually start: python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

