@echo off
echo ========================================
echo 🔧 FIX GIT PUSH - XOA HISTORY CU, TAO MOI
echo ========================================
echo.
echo Van de: Git history co chua files lon (306 MB)
echo         → GitHub timeout khi push
echo.
echo Giai phap: Xoa .git folder, tao Git repository moi
echo           → Chi push code hien tai (khong co history)
echo.
echo ⚠️ LUU Y:
echo   - Git history CU se bi XOA (commits, branches, tat ca)
echo   - Chi giu lai code HIEN TAI
echo   - Phu hop neu ban chua push len GitHub thanh cong
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
echo 📦 BUOC 1: BACKUP (An toan)
echo ========================================

echo.
echo Tao backup cua .git folder...
if exist .git (
    xcopy /E /I /H .git .git_backup >nul 2>&1
    echo ✓ Backup thanh cong: .git_backup
) else (
    echo ⊘ Khong tim thay .git folder
)

echo.
echo ========================================
echo 📦 BUOC 2: XOA .GIT FOLDER CU
echo ========================================

echo.
echo Xoa .git folder (xoa tat ca history)...
if exist .git (
    rd /s /q .git
    echo ✓ Da xoa .git folder
) else (
    echo ⊘ .git folder khong ton tai
)

echo.
echo ========================================
echo 📦 BUOC 3: TAO GIT REPOSITORY MOI
echo ========================================

echo.
echo [3.1] Git init...
git init
echo ✓ Git initialized

echo.
echo [3.2] Them model files vao .gitignore (tranh push files lon)...
echo # Model files - too large for GitHub >> .gitignore
echo *.pth >> .gitignore
echo *.pkl >> .gitignore
echo ✓ Updated .gitignore

echo.
echo [3.3] Git add all files...
git add .
echo ✓ Files added

echo.
echo [3.4] Git commit...
git commit -m "Initial commit - Smart Farm System"
echo ✓ Committed

echo.
echo ========================================
echo 📦 BUOC 4: KET NOI VOI GITHUB
echo ========================================

echo.
echo Nhap GitHub repository URL cua ban:
echo (Vi du: https://github.com/username/SmartFarm.git)
echo.
set /p repo_url="Repository URL: "

if "%repo_url%"=="" (
    echo.
    echo ❌ Ban chua nhap URL!
    echo.
    echo Hay chay cac lenh sau MANUALLY:
    echo   git remote add origin YOUR_REPO_URL
    echo   git branch -M main
    echo   git push -f origin main
    echo.
    pause
    exit /b 1
)

echo.
echo [4.1] Add remote...
git remote add origin %repo_url%
echo ✓ Remote added

echo.
echo [4.2] Rename branch to main...
git branch -M main
echo ✓ Branch renamed

echo.
echo ========================================
echo 📦 BUOC 5: PUSH LEN GITHUB
echo ========================================

echo.
echo ⚠️ LUU Y: Se dung FORCE PUSH (-f) de ghi de repository cu
echo.
echo Ban co chac chan muon FORCE PUSH? (Y/N)
set /p confirmpush="> "
if /i not "%confirmpush%"=="Y" (
    echo.
    echo ❌ Da huy push.
    echo.
    echo Hay chay lenh sau khi san sang:
    echo   git push -f origin main
    echo.
    pause
    exit /b 0
)

echo.
echo Dang push... (co the mat 2-5 phut)
git push -f origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ THANH CONG!
    echo ========================================
    echo.
    echo Code da duoc push len GitHub!
    echo.
    echo BUOC TIEP THEO:
    echo 1. Vao GitHub repository de kiem tra
    echo 2. Upload model files len Google Drive
    echo 3. Cap nhat Python code (xem MODEL_DOWNLOAD_SETUP.md)
    echo 4. Deploy!
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ PUSH BI LOI
    echo ========================================
    echo.
    echo Neu van con loi, thu:
    echo 1. Kiem tra Internet connection
    echo 2. Kiem tra repository URL dung chua
    echo 3. Chay lenh manual:
    echo    git push -f origin main
    echo.
)

echo.
pause

