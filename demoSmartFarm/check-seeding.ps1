# KIỂM TRA DATA SEEDING
Write-Host "`n=== CHECKING BACKEND & DATA ===" -ForegroundColor Cyan

# 1. Check backend status
Write-Host "`n[1] Backend Status:" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method GET -ErrorAction SilentlyContinue
    Write-Host "  ✓ Backend ONLINE" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Backend OFFLINE" -ForegroundColor Red
    Write-Host "  → Chạy: cd E:\DoAnJ2EE\demoSmartFarm\demo && mvn spring-boot:run" -ForegroundColor Yellow
    exit 1
}

# 2. Check data
Write-Host "`n[2] Database Data Count:" -ForegroundColor Yellow

# Get token
$loginBody = @{
    email = "admin@smartfarm.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    
    if (-not $token) {
        Write-Host "  ✗ Login failed" -ForegroundColor Red
        exit 1
    }
    
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    # Check farms
    $farms = Invoke-RestMethod -Uri "http://localhost:8080/api/farms" -Method GET -Headers $headers
    Write-Host "  Farms: $($farms.Count)" -ForegroundColor $(if ($farms.Count -gt 0) { "Green" } else { "Red" })
    
    # Check fields
    $fields = Invoke-RestMethod -Uri "http://localhost:8080/api/fields" -Method GET -Headers $headers
    Write-Host "  Fields: $($fields.Count)" -ForegroundColor $(if ($fields.Count -gt 0) { "Green" } else { "Red" })
    
    # Check sensors
    $sensors = Invoke-RestMethod -Uri "http://localhost:8080/api/sensors" -Method GET -Headers $headers
    Write-Host "  Sensors: $($sensors.Count)" -ForegroundColor $(if ($sensors.Count -gt 0) { "Green" } else { "Red" })
    
    if ($fields.Count -eq 3 -and $sensors.Count -eq 5) {
        Write-Host "`n  ✅ DATA SEEDING THÀNH CÔNG!" -ForegroundColor Green
        Write-Host "  → Mở frontend: http://localhost:3000" -ForegroundColor Cyan
    } else {
        Write-Host "`n  ⚠️ Data chưa đủ. Restart backend để seed lại." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "  ✗ API Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=================================`n" -ForegroundColor Cyan

