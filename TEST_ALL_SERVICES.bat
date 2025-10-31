@echo off
chcp 65001 >nul
echo ========================================
echo 🧪 TEST ALL SMART FARM SERVICES
echo ========================================
echo.

echo 📝 Nhập các URL của bạn:
echo.

set /p BACKEND_URL="Backend Railway URL (vd: https://xxx.railway.app): "
set /p CHATBOT_URL="Chatbot Vercel URL (vd: https://xxx.vercel.app): "

echo.
echo ========================================
echo 🚀 BẮT ĐẦU TEST...
echo ========================================
echo.

REM Test 1: Pest & Disease AI (Hugging Face)
echo [1/4] 🌾 Testing Pest ^& Disease AI...
curl -s https://kimngan0407-pest-disease.hf.space/health
echo.
echo.

REM Test 2: Backend API
echo [2/4] 🔧 Testing Backend API...
if not "%BACKEND_URL%"=="" (
    curl -s %BACKEND_URL%/api/health
    echo.
) else (
    echo ⚠️ Backend URL not provided, skipping...
)
echo.

REM Test 3: Get Pest Classes
echo [3/4] 📋 Getting Pest Classes...
curl -s https://kimngan0407-pest-disease.hf.space/api/classes
echo.
echo.

REM Test 4: Chatbot
echo [4/4] 🤖 Chatbot URL:
if not "%CHATBOT_URL%"=="" (
    echo ✅ %CHATBOT_URL%
    echo 👉 Mở trong trình duyệt để test
) else (
    echo ⚠️ Chatbot URL not provided
)
echo.

echo ========================================
echo ✅ TEST COMPLETED!
echo ========================================
echo.
echo 📊 SUMMARY:
echo - Pest AI:  https://kimngan0407-pest-disease.hf.space
echo - Backend:  %BACKEND_URL%
echo - Chatbot:  %CHATBOT_URL%
echo.
echo 🔍 Kiểm tra output ở trên để xem service nào hoạt động!
echo.
pause

