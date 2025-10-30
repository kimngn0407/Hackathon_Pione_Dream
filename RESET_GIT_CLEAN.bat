@echo off
echo ==================================================
echo TAO LAI GIT REPOSITORY - XOA HET HISTORY CU
echo ==================================================
echo.
echo CANH BAO: Script nay se:
echo  1. Xoa toan bo Git history cu
echo  2. Tao Git repository moi
echo  3. Commit tat ca file hien tai
echo  4. Force push len GitHub
echo.
echo Ban co chac chan muon tiep tuc? (Y/N)
set /p confirm=

if /i not "%confirm%"=="Y" (
    echo Da huy!
    pause
    goto :eof
)

cd /d "%~dp0"

echo.
echo Buoc 1: Backup .git folder...
if exist .git (
    ren .git .git_backup_%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
    echo [OK] Da backup .git folder
)

echo.
echo Buoc 2: Khoi tao Git repository moi...
git init
git branch -M main

echo.
echo Buoc 3: Add tat ca file hien tai...
git add .

echo.
echo Buoc 4: Commit...
git commit -m "Clean repository - Remove large files from history"

echo.
echo Buoc 5: Add remote GitHub...
git remote add origin https://github.com/kimngn0407/Hackathon_Pione_Dream.git

echo.
echo Buoc 6: Force push len GitHub...
git push -u origin main --force

echo.
echo ==================================================
echo [OK] HOAN THANH! Git repository da duoc lam sach.
echo ==================================================
echo.
echo Railway se tu dong deploy khi phat hien code moi!
echo.
pause

