@echo off
echo ==================================================
echo XOA FILE LON KHOI GIT HISTORY BANG BFG
echo ==================================================
cd /d "%~dp0"

echo.
echo Buoc 1: Tai BFG Repo-Cleaner...
if not exist bfg.jar (
    echo Dang tai BFG tu internet...
    curl -L -o bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
    if %errorlevel% neq 0 (
        echo [X] Khong tai duoc BFG!
        echo Vui long tai thu cong tu: https://rtyley.github.io/bfg-repo-cleaner/
        pause
        goto :eof
    )
    echo [OK] Da tai BFG thanh cong!
) else (
    echo [OK] BFG da ton tai.
)

echo.
echo Buoc 2: Xoa file PestAndDisease.zip khoi Git history...
java -jar bfg.jar --delete-files PestAndDisease.zip
if %errorlevel% neq 0 (
    echo [X] Loi khi chay BFG!
    pause
    goto :eof
)

echo.
echo Buoc 3: Cleanup Git repository...
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo.
echo Buoc 4: Force push len GitHub...
git push origin --force --all

echo.
echo ==================================================
echo [OK] HOAN THANH! File lon da duoc xoa khoi Git history.
echo ==================================================
pause

