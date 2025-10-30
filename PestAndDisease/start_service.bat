@echo off
echo ============================================================
echo   Pest and Disease Detection Service
echo ============================================================
echo.
echo Starting Flask API service...
echo Service will run at: http://localhost:5001
echo.
echo To stop: Press Ctrl+C
echo.
cd /d E:\DoAnJ2EE\PestAndDisease
call .venv\Scripts\activate
python pest_disease_service.py
pause

