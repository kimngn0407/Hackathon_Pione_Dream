# ⚡ HƯỚNG DẪN DEPLOY RAILWAY SIÊU NHANH

## 📌 CHUẨN BỊ
- Repository đã push lên GitHub: ✅
- File `application.properties` đã fix: ✅

---

## 🚀 CÁC BƯỚC THỰC HIỆN (5 PHÚT)

### 1️⃣ TẠO DATABASE (1 phút)
1. Vào https://railway.app
2. **New Project** → **Add PostgreSQL**
3. Đợi database khởi động (màu xanh)

### 2️⃣ TẠO BACKEND SERVICE (2 phút)
1. Click **+ New** → **GitHub Repo**
2. Chọn: `kimngn0407/Hackathon_Pione_Dream`
3. **Settings** tab:
   - **Root Directory**: `demoSmartFarm/demo`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/demo-0.0.1-SNAPSHOT.jar`

### 3️⃣ THÊM VARIABLES (1 phút)
Vào tab **Variables**, thêm:

```
NIXPACKS_JDK_VERSION=17
PORT=8080
```

Sau đó click **+ New Variable** → **Add Reference** → Chọn PostgreSQL service → Tick tất cả variables → **Add**

### 4️⃣ DEPLOY (1 phút)
- Railway tự động deploy
- Đợi build xong (xem tab **Deployments**)

### 5️⃣ LẤY URL
- **Settings** → **Networking** → **Generate Domain**
- Copy URL: `https://xxxxx.up.railway.app`

---

## ✅ XONG!

Test API:
```
https://your-app.up.railway.app/api/farms
```

---

## ⚠️ NẾU LỖI

**Lỗi Connection refused:**
- Kiểm tra Variables đã có: PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE

**Lỗi Build failed:**
- Check logs tại tab **Deployments** → Click deployment mới nhất

---

**Chi tiết đầy đủ**: Xem file `HUONG_DAN_DEPLOY_RAILWAY.md`

