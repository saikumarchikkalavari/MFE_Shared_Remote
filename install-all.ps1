# Install dependencies for all MFE applications

Write-Host "Installing dependencies for all MFE applications..." -ForegroundColor Green

$apps = @("shared", "host", "products", "orders", "customers")

foreach ($app in $apps) {
    Write-Host "`nInstalling $app..." -ForegroundColor Cyan
    Set-Location $app
    npm install
    Set-Location ..
}

Write-Host "`nAll dependencies installed successfully!" -ForegroundColor Green
