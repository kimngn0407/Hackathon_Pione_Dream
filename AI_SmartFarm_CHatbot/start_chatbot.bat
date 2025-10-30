@echo off
echo ==========================================
echo Starting Smart Farm Chatbot
echo ==========================================
echo.

cd /d E:\DoAnJ2EE\AI_SmartFarm_CHatbot

echo [1] Installing dependencies...
call npm install

echo.
echo [2] Starting chatbot on port 9002...
echo.
echo ==========================================
echo Chatbot: http://localhost:9002
echo Embed URL: http://localhost:9002/embed
echo ==========================================
echo.

npm run dev

pause

