@echo off
echo ===============================================
echo   TU DONG SUA LOI - PEST AND DISEASE
echo ===============================================
echo.

cd /d "%~dp0"

echo [1/4] Kiem tra virtual environment...
if not exist ".venv" (
    echo   Creating virtual environment...
    python -m venv .venv
    echo   Done!
) else (
    echo   Virtual environment already exists.
)
echo.

echo [2/4] Activating virtual environment...
call .venv\Scripts\activate
echo   Activated!
echo.

echo [3/4] Installing/Updating dependencies...
echo   This may take a few minutes...
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install flask flask-cors pillow numpy
.venv\Scripts\python.exe -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
.venv\Scripts\python.exe -m pip install timm
echo   Done!
echo.

echo [4/4] Testing model load...
.venv\Scripts\python.exe test_model_load.py
echo.

echo ===============================================
echo   HOAN THANH! Ban co the chay service:
echo   python pest_disease_service.py
echo ===============================================
pause

