@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║           TEST TẤT CẢ SERVICES - SMART FARM                ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔍 1. TEST BACKEND (RAILWAY)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Testing: https://hackathonpionedream-production.up.railway.app/actuator/health
echo.
curl -s https://hackathonpionedream-production.up.railway.app/actuator/health
echo.
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🤖 2. TEST CHATBOT (VERCEL)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Testing: https://hackathon-pione-dream-vzj5.vercel.app/
echo Status: Opening in browser...
start https://hackathon-pione-dream-vzj5.vercel.app/
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🐛 3. TEST PEST AI (HUGGING FACE)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Testing: https://kimngan0407-pest-disease.hf.space/health
echo.
curl -s https://kimngan0407-pest-disease.hf.space/health
echo.
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🌾 4. TEST CROP AI (RENDER)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Testing: https://hackathon-pione-dream.onrender.com/health
echo.
curl -s https://hackathon-pione-dream.onrender.com/health
echo.
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🌐 5. TEST FRONTEND (VERCEL)
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Testing: https://hackathon-pione-dream.vercel.app/
echo Status: Opening in browser...
start https://hackathon-pione-dream.vercel.app/
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔑 6. TEST LOGIN
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Testing login with admin@smartfarm.com...
echo.
curl -s -X POST https://hackathonpionedream-production.up.railway.app/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@smartfarm.com\",\"password\":\"123456\"}"
echo.
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ TEST COMPLETED
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📝 Results Summary:
echo.
echo ✅ Backend: Check output above for {"status":"UP"}
echo ✅ Chatbot: Browser should open
echo ✅ Pest AI: Check output for {"status":"healthy"}
echo ✅ Crop AI: Check output for {"status":"healthy"}
echo ✅ Frontend: Browser should open
echo ✅ Login: Check output for token
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
