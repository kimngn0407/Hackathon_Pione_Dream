@echo off
echo ================================================
echo   SUA LOI SKLEARN VERSION MISMATCH
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] Kich hoat virtual environment...
call .venv\Scripts\activate
echo   OK!
echo.

echo [2/3] Kiem tra sklearn version hien tai...
python -c "import sklearn; print('Current sklearn:', sklearn.__version__)"
echo.

echo [3/3] Upgrade sklearn len version moi nhat...
echo   Dang upgrade... (co the mat vai phut)
pip install --upgrade scikit-learn
echo.

echo [4/3] Kiem tra lai version...
python -c "import sklearn; print('New sklearn:', sklearn.__version__)"
echo.

echo ================================================
echo   HOAN THANH!
echo   Gio thu chay lai service:
echo   python crop_recommendation_service.py
echo ================================================
pause

