# TAO TAI KHOAN ADMIN TRUC TIEP
Write-Host "=== TAO ADMIN ===" -ForegroundColor Cyan

$admin = @{
    fullName = "Admin SmartFarm"
    email = "admin@smartfarm.com"
    password = "admin123"
    roles = @("ADMIN")
} | ConvertTo-Json

Write-Host "Dang ky admin@smartfarm.com..." -ForegroundColor Yellow

Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/register" `
    -Method Post `
    -Body $admin `
    -ContentType "application/json"

Write-Host ""
Write-Host "HOAN THANH!" -ForegroundColor Green
Write-Host ""
Write-Host "Bay gio login voi:" -ForegroundColor Yellow
Write-Host "  Email: admin@smartfarm.com" -ForegroundColor Cyan
Write-Host "  Password: admin123" -ForegroundColor Cyan

