# DEBUG JWT TOKEN
Write-Host "=== DEBUG JWT TOKEN ===" -ForegroundColor Cyan
Write-Host ""

# Login
$loginBody = @{
    email = "admin.nguyen@smartfarm.com"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/accounts/login" -Method Post -Body $loginBody -ContentType "application/json"

Write-Host "Login Response:" -ForegroundColor Yellow
Write-Host "  Token: $($loginResponse.token.substring(0,50))..." -ForegroundColor White
Write-Host "  PersonalInfo:" -ForegroundColor White
$loginResponse.personalInfo | ConvertTo-Json

Write-Host ""
Write-Host "JWT Token Payload:" -ForegroundColor Yellow

# Decode JWT (payload la phan giua 2 dau cham)
$token = $loginResponse.token
$parts = $token.Split('.')
$payload = $parts[1]

# Them padding neu can
$padding = (4 - ($payload.Length % 4)) % 4
$payload = $payload + ("=" * $padding)

# Decode Base64
$decoded = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($payload))

Write-Host $decoded -ForegroundColor Cyan

# Parse JSON
$payloadObj = $decoded | ConvertFrom-Json
Write-Host ""
Write-Host "Parsed Payload:" -ForegroundColor Yellow
Write-Host "  Subject (email): $($payloadObj.sub)" -ForegroundColor White
Write-Host "  Roles: $($payloadObj.roles -join ', ')" -ForegroundColor White
Write-Host "  Issued At: $(Get-Date -UnixTimeSeconds $payloadObj.iat)" -ForegroundColor White
Write-Host "  Expires: $(Get-Date -UnixTimeSeconds $payloadObj.exp)" -ForegroundColor White

Write-Host ""
Write-Host "=== KET THUC ===" -ForegroundColor Green

