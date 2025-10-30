@echo off
echo ===============================================
echo   HUONG DAN CHAY THU CONG - PEST AND DISEASE
echo ===============================================
echo.

echo BUOC 1: Kich hoat moi truong ao
echo ----------------------------------------
echo Chay lenh:
echo    .venv\Scripts\activate
echo.
echo Sau do ban se thay (.venv) o dau dong lenh
echo.

echo BUOC 2: Kiem tra cai dat
echo ----------------------------------------
echo Chay lenh:
echo    python test_installation.py
echo.
echo Neu thieu package, chay:
echo    pip install -r requirements.txt
echo.

echo BUOC 3: Test load model
echo ----------------------------------------
echo Chay lenh:
echo    python test_model_load.py
echo.
echo Script nay se kiem tra tung buoc load model
echo.

echo BUOC 4: Chay service
echo ----------------------------------------
echo Chay lenh:
echo    python pest_disease_service.py
echo.
echo Service se chay tai: http://localhost:5001
echo.

echo ===============================================
echo MOI CAU HOI LIEN HE AI ASSISTANT
echo ===============================================
pause

