@echo off
echo ================================================
echo   DOWNGRADE SKLEARN DE PHU HOP VOI MODEL
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] Kich hoat virtual environment...
call .venv\Scripts\activate
echo   OK!
echo.

echo [2/4] Kiem tra sklearn version hien tai...
python -c "import sklearn; print('Current sklearn:', sklearn.__version__)"
echo.

echo [3/4] Uninstall sklearn hien tai...
pip uninstall -y scikit-learn
echo.

echo [4/4] Install sklearn version cu hon (1.2.2)...
echo   Dang install... (co the mat vai phut)
pip install scikit-learn==1.2.2
echo.

echo [5/4] Kiem tra lai version...
python -c "import sklearn; print('New sklearn:', sklearn.__version__)"
echo.

echo ================================================
echo   HOAN THANH!
echo   Sklearn da duoc downgrade ve 1.2.2
echo   
echo   Gio thu chay lai service:
echo   python crop_recommendation_service.py
echo ================================================
pause

