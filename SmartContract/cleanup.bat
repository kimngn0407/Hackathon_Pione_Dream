@echo off
echo ========================================
echo    CLEANUP TEMPORARY FILES
echo ========================================
echo.

echo [1/4] Deleting test files...
if exist test_flask.py (
    del test_flask.py
    echo   - Deleted test_flask.py
)
if exist check_database.py (
    del check_database.py
    echo   - Deleted check_database.py
)
if exist fix_db_connection.py (
    del fix_db_connection.py
    echo   - Deleted fix_db_connection.py
)
if exist scripts\check-both-wallets.js (
    del scripts\check-both-wallets.js
    echo   - Deleted scripts\check-both-wallets.js
)

echo.
echo [2/4] Deleting build artifacts...
if exist artifacts (
    rmdir /s /q artifacts
    echo   - Deleted artifacts/
)
if exist cache (
    rmdir /s /q cache
    echo   - Deleted cache/
)

echo.
echo [3/4] Deleting Python cache...
if exist __pycache__ (
    rmdir /s /q __pycache__
    echo   - Deleted __pycache__/
)
if exist flask-api\__pycache__ (
    rmdir /s /q flask-api\__pycache__
    echo   - Deleted flask-api\__pycache__/
)

echo.
echo [4/4] Deleting optional sample files...
if exist flask-api\app_simple.py (
    del flask-api\app_simple.py
    echo   - Deleted flask-api\app_simple.py
)
if exist flask-api\schema-extra.sql (
    del flask-api\schema-extra.sql
    echo   - Deleted flask-api\schema-extra.sql
)

echo.
echo ========================================
echo    CLEANUP COMPLETE!
echo ========================================
echo.
echo Files kept:
echo   - Source code (.sol, .js, .py, .ino)
echo   - Configuration files
echo   - Documentation (.md files)
echo   - Environment templates (env.sample)
echo.
echo Files deleted:
echo   - Test files (test_*.py, check_*.py)
echo   - Build artifacts (artifacts/, cache/)
echo   - Python cache (__pycache__/)
echo.
echo To rebuild artifacts:
echo   npx hardhat compile
echo.
pause


