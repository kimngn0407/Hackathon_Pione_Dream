@echo off
chcp 65001 >nul
color 0A
cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     🌾 SMART FARM - TEST ALL SERVICES - COMPLETE 🌾          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📅 Test Time: %date% %time%
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo [1/8] 🎨 Testing Frontend...
echo URL: https://hackathon-pione-dream.vercel.app/
start https://hackathon-pione-dream.vercel.app/
echo ✅ Opened in browser - Check if UI loads properly
echo.
timeout /t 3 >nul

echo [2/8] 🤖 Testing AI Chatbot...
echo URL: https://hackathon-pione-dream-vzj5.vercel.app/
start https://hackathon-pione-dream-vzj5.vercel.app/
echo ✅ Opened in browser - Try chatting with AI
echo.
timeout /t 3 >nul

echo [3/8] 🔧 Testing Backend Health...
echo URL: https://hackathonpionedream-production.up.railway.app/
curl -s -w "\nHTTP Status: %%{http_code}\n" https://hackathonpionedream-production.up.railway.app/ | findstr /C:"HTTP Status"
echo.
timeout /t 2 >nul

echo [4/8] 🐛 Testing Pest AI Health...
echo URL: https://kimngan0407-pest-disease.hf.space/health
curl -s https://kimngan0407-pest-disease.hf.space/health
echo.
echo.
timeout /t 2 >nul

echo [5/8] 📋 Testing Pest AI Classes...
echo URL: https://kimngan0407-pest-disease.hf.space/api/classes
curl -s https://kimngan0407-pest-disease.hf.space/api/classes
echo.
echo.
timeout /t 2 >nul

echo [6/8] 🌱 Testing Crop Recommendation AI...
echo URL: https://hackathon-pione-dream.onrender.com/health
echo ⚠️  Note: May take 30s to wake up (Render free tier)
curl -s https://hackathon-pione-dream.onrender.com/health
echo.
echo.
timeout /t 2 >nul

echo [7/8] 🔗 Testing Backend Pest API Integration...
echo URL: https://hackathonpionedream-production.up.railway.app/api/pest-disease/health
curl -s https://hackathonpionedream-production.up.railway.app/api/pest-disease/health
echo.
echo.
timeout /t 2 >nul

echo [8/8] 📊 Testing Backend Pest Classes API...
echo URL: https://hackathonpionedream-production.up.railway.app/api/pest-disease/classes
curl -s https://hackathonpionedream-production.up.railway.app/api/pest-disease/classes
echo.
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ✅ ALL TESTS COMPLETED!
echo.
echo 📊 QUICK ACCESS URLS:
echo.
echo 🎨 Frontend:    https://hackathon-pione-dream.vercel.app/
echo 🔧 Backend:     https://hackathonpionedream-production.up.railway.app/
echo 🤖 Chatbot:     https://hackathon-pione-dream-vzj5.vercel.app/
echo 🌱 Crop AI:     https://hackathon-pione-dream.onrender.com/
echo 🐛 Pest AI:     https://kimngan0407-pest-disease.hf.space/
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 💡 HƯỚNG DẪN SỬ DỤNG:
echo.
echo 1. Frontend và Chatbot đã mở trong trình duyệt
echo 2. Kiểm tra các JSON responses phía trên
echo 3. Nếu thấy JSON data ^=^> Service hoạt động ✅
echo 4. Nếu không có data ^=^> Service có thể đang sleep (đợi 30s)
echo.
echo 📖 Đọc thêm: HUONG_DAN_SU_DUNG_HE_THONG.md
echo 📖 API docs: KET_NOI_CAC_SERVICES.md
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause

