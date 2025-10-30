@echo off
echo ========================================
echo 🧹 CLEAN UP - DON DEP CODE TRUOC KHI DEPLOY
echo ========================================
echo.
echo ⚠️ LUU Y: Script nay se XOA cac files test, debug, backup
echo.
echo Ban co chac chan muon tiep tuc? (Y/N)
set /p confirm="> "
if /i not "%confirm%"=="Y" (
    echo.
    echo ❌ Da huy. Khong co file nao bi xoa.
    pause
    exit /b 0
)

echo.
echo ========================================
echo 📦 DANG DON DEP...
echo ========================================

cd /d "%~dp0"

echo.
echo [1] Xoa TEST FILES...
del /q RecommentCrop\test_*.py 2>nul
del /q RecommentCrop\check_*.py 2>nul
del /q PestAndDisease\test_*.py 2>nul
del /q PestAndDisease\debug_*.py 2>nul
del /q PestAndDisease\inspect_*.py 2>nul
echo ✓ Xoa test files

echo.
echo [2] Xoa BACKUP FILES...
del /s /q *.backup 2>nul
del /s /q *.bak 2>nul
echo ✓ Xoa backup files

echo.
echo [3] Xoa TEMP FILES...
del /q test_data.json 2>nul
del /s /q *.tmp 2>nul
del /s /q *.log 2>nul
echo ✓ Xoa temp files

echo.
echo [4] Xoa BAT FILES (optional - ban co the giu neu muon chay local)
echo     Xoa BAT files? (Y/N)
set /p delbat="> "
if /i "%delbat%"=="Y" (
    del /q RecommentCrop\*.bat 2>nul
    del /q PestAndDisease\*.bat 2>nul
    del /q AI_SmartFarm_CHatbot\*.bat 2>nul
    del /q start_all_services.bat 2>nul
    del /q TEST_CROP_API.bat 2>nul
    echo ✓ Xoa BAT files
) else (
    echo ⊘ Bo qua BAT files
)

echo.
echo [5] Xoa DOCUMENTATION TRUNG LAP...
echo     Xoa cac file MD trung lap? (Y/N)
echo     (Se giu: README, START_HERE, STEP_BY_STEP, COMPLETE_GUIDE, CHECKLIST_SIMPLE, QUICK_REFERENCE)
set /p delmd="> "
if /i "%delmd%"=="Y" (
    del /q DEPLOY_GUIDE.md 2>nul
    del /q DEPLOY_QUICK_START.md 2>nul
    del /q DEPLOYMENT_CHECKLIST.md 2>nul
    del /q RecommentCrop\HUONG_DAN_CHAY.md 2>nul
    del /q RecommentCrop\CHANGELOG.md 2>nul
    del /q RecommentCrop\START_HERE.txt 2>nul
    del /q PestAndDisease\FIX_CLASS_ORDER.md 2>nul
    del /q PestAndDisease\FIX_ERRORS.md 2>nul
    del /q PestAndDisease\HUONG_DAN_CHI_TIET.md 2>nul
    del /q demoSmartFarm\SUMMARY_COMPLETED.md 2>nul
    echo ✓ Xoa MD files trung lap
) else (
    echo ⊘ Bo qua MD files
)

echo.
echo [6] Xoa POWERSHELL SCRIPTS (demoSmartFarm)...
echo     Xoa PS1 scripts? (Y/N)
set /p delps="> "
if /i "%delps%"=="Y" (
    del /q demoSmartFarm\*.ps1 2>nul
    echo ✓ Xoa PS1 scripts
) else (
    echo ⊘ Bo qua PS1 scripts
)

echo.
echo [7] Xoa CHATBOT SCRIPTS (AI_SmartFarm_CHatbot/scripts)...
echo     Xoa scripts folder? (Y/N)
set /p delscr="> "
if /i "%delscr%"=="Y" (
    rd /s /q AI_SmartFarm_CHatbot\scripts 2>nul
    echo ✓ Xoa scripts folder
) else (
    echo ⊘ Bo qua scripts folder
)

echo.
echo [8] Xoa EMPTY FOLDERS...
rd AI_SM 2>nul
echo ✓ Xoa empty folders

echo.
echo ========================================
echo ✅ HOAN THANH!
echo ========================================
echo.
echo Cac file da duoc don dep.
echo.
echo BUOC TIEP THEO:
echo 1. Kiem tra lai: dir
echo 2. Neu OK -> git add .
echo 3. Commit: git commit -m "Clean up unnecessary files"
echo 4. Push: git push
echo.
pause

