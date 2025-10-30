# Create ADMIN account
Write-Host "=== CREATE ADMIN ACCOUNT ===" -ForegroundColor Cyan
Write-Host ""

$admin = @{
    fullName = "Admin SmartFarm"
    email = "admin@smartfarm.com"
    password = "admin123"
    roles = @("ADMIN")
} | ConvertTo-Json

Write-Host "1. Register ADMIN..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/register" -Method Post -Body $admin -ContentType "application/json"
    Write-Host "   SUCCESS: $result" -ForegroundColor Green
} catch {
    Write-Host "   ERROR or ALREADY EXISTS" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "2. Login ADMIN..." -ForegroundColor Yellow
$login = @{
    email = "admin@smartfarm.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/login" -Method Post -Body $login -ContentType "application/json"
    Write-Host "   SUCCESS!" -ForegroundColor Green
    Write-Host "   Name: $($response.personalInfo.fullName)" -ForegroundColor Cyan
    Write-Host "   Roles: $($response.personalInfo.roles -join ', ')" -ForegroundColor Magenta
} catch {
    Write-Host "   FAILED" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Open Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "2. Login with Admin:" -ForegroundColor White
Write-Host "   - Email: admin@smartfarm.com" -ForegroundColor Cyan
Write-Host "   - Password: admin123" -ForegroundColor Cyan
Write-Host "3. Go to Account Manager menu" -ForegroundColor White
Write-Host "4. Assign Farmer to Farm/Field" -ForegroundColor White

