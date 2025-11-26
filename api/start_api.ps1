# PowerShell script to start RVTools API Server
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting RVTools API Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Check if FastAPI is installed
try {
    python -c "import fastapi" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing API dependencies..." -ForegroundColor Yellow
        pip install fastapi uvicorn python-multipart --quiet
        Write-Host "Done!" -ForegroundColor Green
        Write-Host ""
    }
} catch {
    Write-Host "Installing API dependencies..." -ForegroundColor Yellow
    pip install fastapi uvicorn python-multipart --quiet
    Write-Host "Done!" -ForegroundColor Green
    Write-Host ""
}

# Set Python path
$env:PYTHONPATH = "$PWD\..;$env:PYTHONPATH"

Write-Host "Starting server on http://localhost:8001" -ForegroundColor Green
Write-Host ""
Write-Host "Health check: http://localhost:8001/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the server
python -m uvicorn rvtools.process:app --host 0.0.0.0 --port 8001 --reload

