@echo off
echo ========================================
echo RESTART PEST DISEASE SERVICE
echo ========================================
echo.
echo Da sua thu tu class: Smut va Septoria da duoc dao nguoc
echo.

cd /d "%~dp0"

echo Dang tim va TAT service cu...
taskkill /F /FI "WINDOWTITLE eq *pest_disease_service*" 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Khoi dong lai service...
if exist .venv\Scripts\activate (
    start "Pest Disease Service" cmd /k "cd /d "%~dp0" && .venv\Scripts\activate && python pest_disease_service.py"
    echo.
    echo ✓ Service dang chay trong cua so moi!
    echo   Port: 5001
    echo   URL: http://localhost:5001
    echo.
    timeout /t 3 /nobreak >nul
    echo Kiem tra service...
    curl http://localhost:5001/health
) else (
    echo Loi: Khong tim thay moi truong ao!
    echo Vui long chay FIX_NOW.bat truoc.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ HOAN THANH!
echo ========================================
pause

