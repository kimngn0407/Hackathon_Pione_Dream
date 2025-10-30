@echo off
echo ========================================
echo KIEM TRA THU TU CLASS CUA MODEL
echo ========================================
echo.

cd /d "%~dp0"

echo Kich hoat moi truong ao...
if exist .venv\Scripts\activate (
    call .venv\Scripts\activate
) else (
    echo Loi: Khong tim thay moi truong ao!
    echo Vui long chay FIX_NOW.bat truoc.
    pause
    exit /b 1
)

echo.
echo Chay script test...
python test_class_order.py

echo.
pause

