# 🔗 HƯỚNG DẪN LẤY TẤT CẢ URL - SMART FARM

## 🎯 CÁC BƯỚC LẤY URL

---

## 1️⃣ **BACKEND API (Railway)**

### Bước 1: Vào Railway Dashboard
```
https://railway.app/dashboard
```

### Bước 2: Click vào Project của bạn

### Bước 3: Click vào Service "backend" hoặc "demoSmartFarm"

### Bước 4: Vào tab "Settings" → cuộn xuống "Networking"

### Bước 5: Copy URL (dạng: `xxxx.railway.app`)

**URL Backend:**
```
https://______________.railway.app
```

---

## 2️⃣ **PEST & DISEASE AI (Hugging Face)**

**ĐÃ CÓ SẴN:**
```
https://kimngan0407-pest-disease.hf.space
```

**Test ngay:**
- Health: https://kimngan0407-pest-disease.hf.space/health
- Classes: https://kimngan0407-pest-disease.hf.space/api/classes

---

## 3️⃣ **AI CHATBOT (Vercel)**

### Bước 1: Vào Vercel Dashboard
```
https://vercel.com/dashboard
```

### Bước 2: Click vào project "AI_SmartFarm_CHatbot"

### Bước 3: Copy URL ở "Domains" (dạng: `xxx.vercel.app`)

**URL Chatbot:**
```
https://______________.vercel.app
```

---

## 4️⃣ **DATABASE (Railway)**

### Không có URL public!
Database chỉ connect qua backend.

**Check connection:** Vào Railway → Database service → "Connect"

---

## 5️⃣ **CROP RECOMMENDATION AI**

### ⏸️ CHƯA DEPLOY

**Nếu muốn deploy:**
- Deploy lên Hugging Face giống PestAndDisease
- Hoặc deploy lên Railway

---

## 6️⃣ **FRONTEND**

### ⏸️ CHƯA DEPLOY

**Nếu muốn deploy:**
- Vercel (dễ nhất)
- Netlify
- Railway

---

## ✅ **CHECKLIST - ĐIỀN VÀO ĐÂY:**

```
☑ Backend API:     https://__________________________.railway.app
☑ Pest AI:         https://kimngan0407-pest-disease.hf.space
☑ Chatbot:         https://__________________________.vercel.app
☐ Crop AI:         Chưa deploy
☐ Frontend:        Chưa deploy
☑ Database:        Connected via Railway
☑ Blockchain:      Deployed on Pioneer ZeroChain
```

---

## 🧪 **TEST TẤT CẢ URL**

### Test Backend:
```bash
curl https://YOUR-BACKEND.railway.app/api/health
```

### Test Pest AI:
```bash
curl https://kimngan0407-pest-disease.hf.space/health
```

### Test Chatbot:
Mở trong trình duyệt:
```
https://YOUR-CHATBOT.vercel.app
```

---

## 📝 **SAU KHI LẤY URL:**

### 1. Update Frontend Config
Nếu có frontend, cập nhật API URLs trong config file.

### 2. Test Integration
Test toàn bộ flow:
- Frontend → Backend → AI Services → Database

### 3. Document
Ghi lại tất cả URLs vào file này để tiện sử dụng sau.

---

## 🎯 **GỬI CHO TÔI:**

Sau khi lấy được URLs, gửi cho tôi:
```
Backend: https://___________
Chatbot: https://___________
```

Tôi sẽ giúp bạn test và tích hợp! 🚀

