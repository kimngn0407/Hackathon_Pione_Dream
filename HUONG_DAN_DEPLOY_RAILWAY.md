# 🚀 HƯỚNG DẪN DEPLOY BACKEND VÀ DATABASE LÊN RAILWAY

## ✅ BƯỚC 1: TẠO TÀI KHOẢN VÀ ĐĂNG NHẬP RAILWAY

1. Truy cập: https://railway.app
2. Đăng ký/Đăng nhập bằng GitHub
3. Kết nối tài khoản GitHub của bạn

---

## 📦 BƯỚC 2: TẠO DỰ ÁN MỚI (NEW PROJECT)

1. Click nút **"New Project"**
2. Chọn **"Deploy from GitHub repo"**
3. Chọn repository: `kimngn0407/Hackathon_Pione_Dream`
4. Railway sẽ tự động phát hiện dự án

---

## 🗄️ BƯỚC 3: TẠO DATABASE POSTGRESQL

1. Trong dashboard dự án, click **"+ New"**
2. Chọn **"Database"** → **"Add PostgreSQL"**
3. Railway sẽ tự động tạo PostgreSQL database
4. Đợi database khởi động xong (màu xanh lá)

---

## ⚙️ BƯỚC 4: CẤU HÌNH BACKEND SERVICE

### 4.1. Thêm Service Backend

1. Click **"+ New"** → **"GitHub Repo"**
2. Chọn repository: `kimngn0407/Hackathon_Pione_Dream`
3. Railway sẽ tạo service mới

### 4.2. Cấu hình ROOT Directory

1. Click vào **Backend Service** vừa tạo
2. Vào tab **"Settings"**
3. Tìm mục **"Root Directory"**
4. Nhập: `demoSmartFarm/demo`
5. Click **"Save"**

### 4.3. Cấu hình Build/Deploy

Trong tab **"Settings"**, tìm mục **"Build Command"**:

**Build Command:**
```bash
mvn clean package -DskipTests
```

**Start Command:**
```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### 4.4. Thêm Environment Variables

Vào tab **"Variables"** và thêm các biến sau:

#### 📝 Variables cần thêm:

1. **JAVA_VERSION** = `17`

2. **NIXPACKS_JDK_VERSION** = `17`

3. **PORT** = `8080`

4. Kết nối Database - có 2 CÁCH:

#### **CÁCH 1: Dùng từng biến riêng (ĐỀ XUẤT)**

Click vào **PostgreSQL service** → tab **"Variables"** → copy các giá trị:

- **PGHOST** = `[giá trị từ Railway]` (ví dụ: postgres.railway.internal)
- **PGPORT** = `[giá trị từ Railway]` (mặc định: 5432)
- **PGUSER** = `[giá trị từ Railway]` (mặc định: postgres)
- **PGPASSWORD** = `[giá trị từ Railway]` (mật khẩu tự động)
- **PGDATABASE** = `[giá trị từ Railway]` (mặc định: railway)

**HOẶC**

#### **CÁCH 2: Dùng DATABASE_URL**

Copy biến **DATABASE_URL** từ PostgreSQL service, rồi tạo:

- **JDBC_DATABASE_URL** = `jdbc:postgresql://[host]:[port]/[database]`
- **DB_USERNAME** = `[username]`
- **DB_PASSWORD** = `[password]`

> **LƯU Ý**: File `application.properties` của bạn đã được cấu hình sẵn để dùng CÁCH 1

---

## 🔗 BƯỚC 5: KẾT NỐI DATABASE VỚI BACKEND

1. Click vào **Backend Service**
2. Vào tab **"Settings"**
3. Scroll xuống **"Service Variables"**
4. Click **"+ New Variable"** → **"Add Reference"**
5. Chọn **PostgreSQL service**
6. Tick chọn tất cả các biến: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
7. Click **"Add"**

---

## 🚀 BƯỚC 6: DEPLOY

1. Quay lại tab **"Deployments"** của Backend Service
2. Click **"Deploy"** hoặc đợi tự động deploy
3. Xem logs để kiểm tra:
   - ✅ Build thành công
   - ✅ Database kết nối OK
   - ✅ Application started on port 8080

---

## 🌐 BƯỚC 7: LẤY PUBLIC URL

1. Vào Backend Service → tab **"Settings"**
2. Scroll xuống **"Networking"**
3. Click **"Generate Domain"**
4. Copy URL (dạng: `https://your-app.up.railway.app`)
5. **QUAN TRỌNG**: Lưu URL này để cấu hình Frontend

---

## 🔍 KIỂM TRA DEPLOYMENT

### Kiểm tra logs:
```
✓ Maven build successful
✓ Application started
✓ Tomcat started on port 8080
✓ HikariPool connection
✓ JPA initialized
```

### Test API:
```bash
curl https://your-app.up.railway.app/api/health
```

---

## ⚠️ XỬ LÝ LỖI THƯỜNG GẶP

### 1. **Lỗi: "mvn: command not found"**
✅ **Fix**: Thêm biến `NIXPACKS_JDK_VERSION=17` trong Variables

### 2. **Lỗi: "Connection refused to localhost:5432"**
✅ **Fix**: 
- Kiểm tra các biến `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` đã được thêm
- Đảm bảo file `application.properties` dùng `${PGHOST:localhost}` chứ không hardcode `localhost`

### 3. **Lỗi: "Driver claims to not accept jdbcUrl"**
✅ **Fix**: 
- Dùng CÁCH 1 (các biến riêng) thay vì DATABASE_URL
- File `application.properties` hiện tại đã fix sẵn lỗi này

### 4. **Build timeout hoặc quá lâu**
✅ **Fix**: Thêm `-DskipTests` vào build command

---

## 📋 CHECKLIST HOÀN THÀNH

- [ ] Tạo PostgreSQL database trên Railway
- [ ] Tạo Backend service từ GitHub repo
- [ ] Set Root Directory = `demoSmartFarm/demo`
- [ ] Set Build Command = `mvn clean package -DskipTests`
- [ ] Set Start Command = `java -jar target/demo-0.0.1-SNAPSHOT.jar`
- [ ] Thêm các Environment Variables (JAVA_VERSION, NIXPACKS_JDK_VERSION, PORT)
- [ ] Kết nối Database Variables (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
- [ ] Deploy thành công
- [ ] Generate Public Domain
- [ ] Test API endpoint

---

## 🎯 SAU KHI DEPLOY XONG

1. **Lưu lại Backend URL**: https://your-app.up.railway.app
2. **Cập nhật Frontend**: Đổi `REACT_APP_API_URL` trong Frontend environment variables
3. **Test kết nối**: Thử đăng nhập, gọi API từ Frontend

---

## 📞 HỖ TRỢ

Nếu gặp lỗi, check logs tại:
- Railway Dashboard → Backend Service → Tab "Deployments" → Click vào deployment mới nhất → Xem logs

Các lệnh debug hữu ích:
```bash
# Check database connection
psql $DATABASE_URL

# Check Java version
java -version

# Check build output
ls -la target/
```

---

**🎉 CHÚC BẠN DEPLOY THÀNH CÔNG!**

Sau khi Backend lên Railway, quay lại để deploy Frontend lên Vercel và các ML services lên Render/Hugging Face!

