@echo off
echo ================================================
echo   CAI LAI SKLEARN - VERSION PHU HOP VOI MODEL
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] Kich hoat virtual environment...
call .venv\Scripts\activate
if errorlevel 1 (
    echo   ERROR - Khong the activate venv!
    pause
    exit /b 1
)
echo   OK!
echo.

echo [2/3] Cai sklearn version 1.2.2...
echo   (Phien ban nay phu hop voi model cu)
echo   Dang cai dat... vui long doi...
pip install scikit-learn==1.2.2
echo.

echo [3/3] Kiem tra lai...
python -c "import sklearn; print('sklearn version:', sklearn.__version__)"
echo.

echo ================================================
echo   HOAN THANH!
echo   
echo   BAY GIO CHAY SERVICE:
echo   python crop_recommendation_service.py
echo ================================================
echo.
pause

echo Chay service ngay bay gio? (Y/N)
set /p choice=Nhap lua chon: 
if /i "%choice%"=="Y" (
    echo.
    echo Dang khoi dong service...
    python crop_recommendation_service.py
)

