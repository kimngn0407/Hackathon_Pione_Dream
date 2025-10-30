@echo off
echo ================================================
echo   CROP RECOMMENDATION SERVICE - CHAY NHANH
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] Kich hoat virtual environment...
if exist ".venv\Scripts\activate.bat" (
    call .venv\Scripts\activate.bat
    echo   OK - Virtual environment activated!
) else (
    echo   ERROR - Virtual environment khong ton tai!
    echo   Vui long chay: python -m venv .venv
    pause
    exit /b 1
)
echo.

echo [2/3] Kiem tra file model...
if exist "RandomForest_RecomentTree.pkl" (
    echo   OK - Model file ton tai!
) else (
    echo   ERROR - Model file khong ton tai!
    pause
    exit /b 1
)
echo.

echo [3/3] Khoi dong service...
echo.
echo ================================================
echo   Service dang chay tai: http://localhost:5000
echo   Nhan Ctrl+C de dung service
echo ================================================
echo.

python crop_recommendation_service.py

pause

