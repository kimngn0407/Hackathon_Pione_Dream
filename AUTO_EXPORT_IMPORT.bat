@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     AUTO EXPORT LOCAL DATABASE TO RAILWAY                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Automatically find PostgreSQL
echo 🔍 Đang tự động tìm PostgreSQL...
echo.

set "PG_PATH="

REM Check all common PostgreSQL versions (17 to 11)
for %%v in (17 16 15 14 13 12 11) do (
    if exist "C:\Program Files\PostgreSQL\%%v\bin\pg_dump.exe" (
        set "PG_PATH=C:\Program Files\PostgreSQL\%%v\bin"
        echo ✅ Tìm thấy PostgreSQL %%v
        goto :found
    )
)

:found
if "%PG_PATH%"=="" (
    echo ❌ KHÔNG TÌM THẤY POSTGRESQL!
    echo.
    echo Vui lòng cài PostgreSQL hoặc nhập đường dẫn thủ công.
    echo.
    pause
    exit /b 1
)

echo 📍 PostgreSQL: %PG_PATH%
echo.

REM Set local database credentials
set "LOCAL_HOST=localhost"
set "LOCAL_PORT=5432"
set "LOCAL_DB=SmartFarm1"
set "LOCAL_USER=postgres"
set "LOCAL_PASS=Ngan0407@!"

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📊 BƯỚC 1: KIỂM TRA LOCAL DATABASE
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Host: %LOCAL_HOST%
echo Port: %LOCAL_PORT%
echo Database: %LOCAL_DB%
echo User: %LOCAL_USER%
echo.

set "PGPASSWORD=%LOCAL_PASS%"

echo Đang kiểm tra kết nối...
echo.

"%PG_PATH%\psql.exe" -h %LOCAL_HOST% -p %LOCAL_PORT% -U %LOCAL_USER% -d %LOCAL_DB% -c "SELECT 'Connected!' as status;" 2>nul

if errorlevel 1 (
    echo.
    echo ❌ Không thể kết nối local database!
    echo.
    echo Vui lòng kiểm tra:
    echo   - PostgreSQL service đang chạy?
    echo   - Database SmartFarm1 tồn tại?
    echo   - Password đúng: %LOCAL_PASS%
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Kết nối thành công!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📊 Dữ liệu hiện tại trong local database:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

"%PG_PATH%\psql.exe" -h %LOCAL_HOST% -p %LOCAL_PORT% -U %LOCAL_USER% -d %LOCAL_DB% -c "SELECT 'Accounts:' as table_name, COUNT(*)::text as count FROM accounts UNION ALL SELECT 'Farms:', COUNT(*)::text FROM farms UNION ALL SELECT 'Fields:', COUNT(*)::text FROM fields UNION ALL SELECT 'Sensors:', COUNT(*)::text FROM sensors UNION ALL SELECT 'Plants:', COUNT(*)::text FROM plants;" 2>nul

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📤 BƯỚC 2: EXPORT DATA
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Đang export data từ local database...
echo (Chỉ export data, không export schema)
echo.

"%PG_PATH%\pg_dump.exe" -h %LOCAL_HOST% -p %LOCAL_PORT% -U %LOCAL_USER% -d %LOCAL_DB% --data-only --column-inserts --disable-triggers -f local_data_backup.sql 2>nul

if errorlevel 1 (
    echo ❌ Export thất bại!
    echo.
    pause
    exit /b 1
)

echo ✅ Export thành công!
echo.
echo 📁 File: local_data_backup.sql
for %%I in (local_data_backup.sql) do echo 📊 Size: %%~zI bytes
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📥 BƯỚC 3: NHẬP RAILWAY CREDENTIALS
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Lấy thông tin từ Railway:
echo 1. Vào: https://railway.app/dashboard
echo 2. Click: hackathonpionedream-production
echo 3. Click: PostgreSQL service
echo 4. Tab: Connect
echo 5. Copy các thông tin sau:
echo.

set /p RAILWAY_HOST="PGHOST (xxx.railway.app): "
set /p RAILWAY_PORT="PGPORT (default 5432): "
if "%RAILWAY_PORT%"=="" set RAILWAY_PORT=5432

set /p RAILWAY_DB="PGDATABASE (default railway): "
if "%RAILWAY_DB%"=="" set RAILWAY_DB=railway

set /p RAILWAY_USER="PGUSER (default postgres): "
if "%RAILWAY_USER%"=="" set RAILWAY_USER=postgres

set /p RAILWAY_PASS="PGPASSWORD: "

if "%RAILWAY_PASS%"=="" (
    echo.
    echo ❌ Password không được để trống!
    pause
    exit /b 1
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔍 BƯỚC 4: KIỂM TRA KẾT NỐI RAILWAY
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

set "PGPASSWORD=%RAILWAY_PASS%"

echo Đang kiểm tra kết nối Railway...
echo.

"%PG_PATH%\psql.exe" -h %RAILWAY_HOST% -p %RAILWAY_PORT% -U %RAILWAY_USER% -d %RAILWAY_DB% -c "SELECT 'Connected to Railway!' as status;" 2>nul

if errorlevel 1 (
    echo.
    echo ❌ Không thể kết nối Railway database!
    echo.
    echo Vui lòng kiểm tra lại credentials.
    echo.
    pause
    exit /b 1
)

echo ✅ Kết nối Railway thành công!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📊 Dữ liệu hiện tại trong Railway database:
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

"%PG_PATH%\psql.exe" -h %RAILWAY_HOST% -p %RAILWAY_PORT% -U %RAILWAY_USER% -d %RAILWAY_DB% -c "SELECT 'Accounts:' as table_name, COUNT(*)::text as count FROM accounts UNION ALL SELECT 'Farms:', COUNT(*)::text FROM farms UNION ALL SELECT 'Fields:', COUNT(*)::text FROM fields UNION ALL SELECT 'Sensors:', COUNT(*)::text FROM sensors;" 2>nul

echo.
echo ⚠️  LƯU Ý: Import sẽ THÊM data vào Railway database.
echo    Nếu có ID trùng, có thể bị lỗi.
echo.

set /p CONFIRM="Bạn có chắc muốn import? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo.
    echo ❌ Hủy import.
    echo 📁 File backup đã được lưu: local_data_backup.sql
    pause
    exit /b 0
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📥 BƯỚC 5: IMPORT DATA VÀO RAILWAY
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Đang import data vào Railway...
echo (Có thể mất vài phút nếu data lớn)
echo.

"%PG_PATH%\psql.exe" -h %RAILWAY_HOST% -p %RAILWAY_PORT% -U %RAILWAY_USER% -d %RAILWAY_DB% -f local_data_backup.sql 2>import_errors.txt

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ IMPORT HOÀN TẤT!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo 📊 Dữ liệu sau khi import:
echo.

"%PG_PATH%\psql.exe" -h %RAILWAY_HOST% -p %RAILWAY_PORT% -U %RAILWAY_USER% -d %RAILWAY_DB% -c "SELECT 'Accounts:' as table_name, COUNT(*)::text as count FROM accounts UNION ALL SELECT 'Farms:', COUNT(*)::text FROM farms UNION ALL SELECT 'Fields:', COUNT(*)::text FROM fields UNION ALL SELECT 'Sensors:', COUNT(*)::text FROM sensors UNION ALL SELECT 'Plants:', COUNT(*)::text FROM plants UNION ALL SELECT 'Sensor Data:', COUNT(*)::text FROM sensor_data;" 2>nul

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎉 XONG!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📁 Files đã tạo:
echo    - local_data_backup.sql (data backup)
echo    - import_errors.txt (errors nếu có)
echo.
echo 🌐 Test Frontend:
echo    https://hackathon-pione-dream.vercel.app/
echo.
echo    Bạn sẽ thấy data từ local database!
echo.
pause

