# Script tạo tài khoản ADMIN
Write-Host "=== TAO TAI KHOAN ADMIN ===" -ForegroundColor Cyan
Write-Host ""

# Tạo ADMIN account
$admin = @{
    fullName = "Admin SmartFarm"
    email = "admin@smartfarm.com"
    password = "admin123"
    roles = @("ADMIN")
} | ConvertTo-Json

Write-Host "1. Dang ky ADMIN..." -ForegroundColor Yellow
try {
    $result = Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/register" `
        -Method Post -Body $admin -ContentType "application/json"
    Write-Host "   $result" -ForegroundColor Green
} catch {
    if ($_.ErrorDetails.Message -like "*đã tồn tại*") {
        Write-Host "   Admin da ton tai" -ForegroundColor Yellow
    } else {
        Write-Host "   Loi: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "2. Login ADMIN..." -ForegroundColor Yellow
$login = @{
    email = "admin@smartfarm.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/login" `
        -Method Post -Body $login -ContentType "application/json"
    
    Write-Host "   Login thanh cong!" -ForegroundColor Green
    Write-Host "   Token: $($response.token.substring(0,30))..." -ForegroundColor Cyan
    Write-Host "   Name: $($response.personalInfo.fullName)" -ForegroundColor Cyan
    Write-Host "   Roles: $($response.personalInfo.roles -join ', ')" -ForegroundColor Magenta
} catch {
    Write-Host "   Loi: $($_.ErrorDetails.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== HOAN THANH ===" -ForegroundColor Green
Write-Host ""
Write-Host "TIEP THEO:" -ForegroundColor Yellow
Write-Host "1. Vao Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "2. Login voi Admin:" -ForegroundColor White
Write-Host "   - Email: admin@smartfarm.com" -ForegroundColor Cyan
Write-Host "   - Password: admin123" -ForegroundColor Cyan
Write-Host "3. Vao Account Manager" -ForegroundColor White
Write-Host "4. Phan quyen cho Farmer:" -ForegroundColor White
Write-Host "   - Chon Farm" -ForegroundColor White
Write-Host "   - Chon Field" -ForegroundColor White
Write-Host "   - Save" -ForegroundColor White

