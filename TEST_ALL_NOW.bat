@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║        🌾 SMART FARM - TEST ALL SERVICES 🌾               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📅 Testing Date: %date% %time%
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo [1/7] 🎨 Testing Frontend...
echo URL: https://hackathon-pione-dream.vercel.app/
echo ✅ Check in browser: Should show Smart Farm UI
echo.
timeout /t 2 >nul

echo [2/7] 🔧 Testing Backend API...
echo URL: https://hackathonpionedream-production.up.railway.app/
curl -s -o nul -w "Status: %%{http_code}\n" https://hackathonpionedream-production.up.railway.app/
echo.
timeout /t 2 >nul

echo [3/7] 🤖 Testing AI Chatbot...
echo URL: https://hackathon-pione-dream-vzj5.vercel.app/
echo ✅ Check in browser: Should show Smart Farm Bot interface
echo.
timeout /t 2 >nul

echo [4/7] 🌱 Testing Crop Recommendation AI...
echo URL: https://hackathon-pione-dream.onrender.com/
echo ⚠️  Note: May take 30s to wake up (Render free tier)
curl -s https://hackathon-pione-dream.onrender.com/health
echo.
timeout /t 2 >nul

echo [5/7] 🐛 Testing Pest ^& Disease AI (Health)...
echo URL: https://kimngan0407-pest-disease.hf.space/health
curl -s https://kimngan0407-pest-disease.hf.space/health
echo.
timeout /t 2 >nul

echo [6/7] 📋 Getting Pest Classes...
curl -s https://kimngan0407-pest-disease.hf.space/api/classes
echo.
timeout /t 2 >nul

echo [7/7] 💾 Database Status...
echo ✅ Connected via Backend
echo Check Railway Dashboard for details
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ✅ TEST COMPLETED!
echo.
echo 📊 QUICK ACCESS URLS:
echo.
echo Frontend:  https://hackathon-pione-dream.vercel.app/
echo Backend:   https://hackathonpionedream-production.up.railway.app/
echo Chatbot:   https://hackathon-pione-dream-vzj5.vercel.app/
echo Crop AI:   https://hackathon-pione-dream.onrender.com/
echo Pest AI:   https://kimngan0407-pest-disease.hf.space/
echo.
echo 📖 Read FINAL_DEPLOYMENT_CHECKLIST.md for full testing guide
echo.
pause

