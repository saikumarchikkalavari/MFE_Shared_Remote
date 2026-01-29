# Start all MFE applications concurrently

Write-Host "Starting all MFE applications..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop all applications" -ForegroundColor Yellow

$jobs = @()

# Start shared first (required by others)
Write-Host "`nStarting shared on port 3002..." -ForegroundColor Cyan
$jobs += Start-Job -ScriptBlock {
    Set-Location "c:\Users\chisaikumar\OneDrive - Deloitte (O365D)\Documents\MFE_NewProject\shared"
    npm start
}

Start-Sleep -Seconds 5

# Start host
Write-Host "Starting host on port 3000..." -ForegroundColor Cyan
$jobs += Start-Job -ScriptBlock {
    Set-Location "c:\Users\chisaikumar\OneDrive - Deloitte (O365D)\Documents\MFE_NewProject\host"
    npm start
}

# Start remotes
Write-Host "Starting products on port 4001..." -ForegroundColor Cyan
$jobs += Start-Job -ScriptBlock {
    Set-Location "c:\Users\chisaikumar\OneDrive - Deloitte (O365D)\Documents\MFE_NewProject\products"
    npm start
}

Write-Host "Starting orders on port 4002..." -ForegroundColor Cyan
$jobs += Start-Job -ScriptBlock {
    Set-Location "c:\Users\chisaikumar\OneDrive - Deloitte (O365D)\Documents\MFE_NewProject\orders"
    npm start
}

Write-Host "Starting customers on port 4003..." -ForegroundColor Cyan
$jobs += Start-Job -ScriptBlock {
    Set-Location "c:\Users\chisaikumar\OneDrive - Deloitte (O365D)\Documents\MFE_NewProject\customers"
    npm start
}

Write-Host "`nAll applications started!" -ForegroundColor Green
Write-Host "Host: http://localhost:3000" -ForegroundColor White
Write-Host "Shared: http://localhost:3002" -ForegroundColor White
Write-Host "Products: http://localhost:4001" -ForegroundColor White
Write-Host "Orders: http://localhost:4002" -ForegroundColor White
Write-Host "Customers: http://localhost:4003" -ForegroundColor White

# Wait for jobs
Wait-Job -Job $jobs

# Cleanup
$jobs | Remove-Job
