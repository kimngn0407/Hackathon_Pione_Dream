@echo off
echo ========================================
echo 🔧 FIX LARGE FILES - Xoa model files khoi Git
echo ========================================
echo.
echo Van de: Model files qua lon (>100MB), GitHub khong cho push
echo.
echo Giai phap: Xoa khoi Git (nhung GIU file local), upload len Google Drive
echo.
echo ⚠️ LUU Y: Script nay se:
echo   1. Xoa model files khoi Git tracking (nhung GIU file tren may)
echo   2. Cap nhat .gitignore
echo   3. Tao commit moi
echo.
echo Ban co chac chan muon tiep tuc? (Y/N)
set /p confirm="> "
if /i not "%confirm%"=="Y" (
    echo.
    echo ❌ Da huy.
    pause
    exit /b 0
)

cd /d "%~dp0"

echo.
echo ========================================
echo 📦 DANG XU LY...
echo ========================================

echo.
echo [1] Cap nhat .gitignore...
echo # Model files (too large for GitHub - upload to Google Drive instead) >> .gitignore
echo *.pth >> .gitignore
echo *.pkl >> .gitignore
echo ✓ Da them model files vao .gitignore

echo.
echo [2] Xoa model files khoi Git (GIU file local)...
git rm --cached RecommentCrop/RandomForest_RecomentTree.pkl 2>nul
if %errorlevel% equ 0 (
    echo ✓ Removed RandomForest_RecomentTree.pkl from Git
) else (
    echo ⊘ RandomForest_RecomentTree.pkl khong co trong Git hoac da xoa
)

git rm --cached PestAndDisease/best_vit_wheat_model_4classes.pth 2>nul
if %errorlevel% equ 0 (
    echo ✓ Removed best_vit_wheat_model_4classes.pth from Git
) else (
    echo ⊘ best_vit_wheat_model_4classes.pth khong co trong Git hoac da xoa
)

echo.
echo [3] Commit changes...
git add .gitignore
git commit -m "Remove large model files from Git (will use Google Drive)"

echo.
echo ========================================
echo ✅ HOAN THANH!
echo ========================================
echo.
echo Model files da duoc xoa khoi Git (nhung van con tren may cua ban).
echo.
echo BUOC TIEP THEO:
echo.
echo 1. Push len GitHub:
echo    git push
echo.
echo 2. Upload model files len Google Drive:
echo    - RecommentCrop/RandomForest_RecomentTree.pkl
echo    - PestAndDisease/best_vit_wheat_model_4classes.pth
echo.
echo 3. Lay shareable links va cap nhat Python code
echo    (Toi se huong dan sau)
echo.
pause

