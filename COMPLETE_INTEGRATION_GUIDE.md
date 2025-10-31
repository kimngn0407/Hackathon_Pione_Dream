# 🎉 HỆ THỐNG SMART FARM ĐÃ HOÀN TẤT!

## ✅ TẤT CẢ SERVICES ĐÃ KẾT NỐI

### **DEPLOYMENT URLs:**

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://hackathon-pione-dream.vercel.app/ | ✅ LIVE |
| **Backend + Database** | https://hackathonpionedream-production.up.railway.app/ | ✅ LIVE |
| **Chatbot AI** | https://hackathon-pione-dream-vzj5.vercel.app/ | ✅ LIVE |
| **Pest & Disease AI** | https://kimngan0407-pest-disease.hf.space/ | ✅ LIVE |
| **Crop Recommendation AI** | https://hackathon-pione-dream.onrender.com/ | ✅ LIVE |

---

## 🔗 **KẾT NỐI HỆ THỐNG:**

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                     │
│            https://hackathon-pione-dream                 │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┼───────────┬─────────────────┐
         │           │           │                 │
         ▼           ▼           ▼                 ▼
┌────────────┐ ┌───────────┐ ┌────────────┐ ┌──────────────┐
│  Backend   │ │  Chatbot  │ │  Pest AI   │ │   Crop AI    │
│  Railway   │ │  Vercel   │ │ HuggingFace│ │   Render     │
└─────┬──────┘ └───────────┘ └────────────┘ └──────────────┘
      │
      ▼
┌────────────┐
│ PostgreSQL │
│  Railway   │
└────────────┘
```

---

## 🚀 **HƯỚNG DẪN SỬ DỤNG HỆ THỐNG:**

### **1. ĐĂNG NHẬP:**

**Bước 1:** Mở trình duyệt và truy cập:
```
https://hackathon-pione-dream.vercel.app/
```

**Bước 2:** Đăng nhập với account đã tạo:
```
Email:    admin@smartfarm.com
Password: 123456
```

Hoặc:
```
Email:    admin.nguyen@smartfarm.cc
Password: Admin123!
```

Hoặc:
```
Email:    test@smartfarm.cc
Password: Test123!
```

---

### **2. DASHBOARD:**

Sau khi login thành công, bạn sẽ thấy Dashboard với:

- **📊 Thống kê tổng quan:**
  - Tổng số cảm biến
  - Cảnh báo
  - Nhiệt độ trung bình
  - Độ ẩm trung bình
  
- **📈 Biểu đồ:**
  - Biểu đồ nhiệt độ
  - Biểu đồ độ ẩm
  - Biểu đồ đất
  
- **🌾 Chatbot AI:** (Nút màu xanh góc dưới bên phải)
  - Click vào nút để mở chatbot
  - Hỏi bất kỳ câu hỏi nào về nông nghiệp
  - Chatbot sẽ trả lời bằng AI

---

### **3. PHÁT HIỆN SÂU BỆNH (PEST & DISEASE DETECTION):**

**Bước 1:** Click vào menu **"Sâu Bệnh"** hoặc **"Pest Detection"**

**Bước 2:** Upload ảnh cây trồng:
```
- Click "Chọn ảnh" hoặc "Upload Image"
- Chọn ảnh lá cây từ máy tính
- Hỗ trợ: JPG, PNG, JPEG
```

**Bước 3:** Xem kết quả:
```
✅ Tên bệnh được phát hiện
✅ Độ chính xác (Confidence)
✅ Mô tả chi tiết
✅ Cách xử lý
```

**API Endpoint:**
```
POST https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect
```

**Hoặc gọi trực tiếp AI service:**
```
POST https://kimngan0407-pest-disease.hf.space/api/detect
```

---

### **4. GỢI Ý CÂY TRỒNG (CROP RECOMMENDATION):**

**Bước 1:** Click vào menu **"Gợi Ý Cây Trồng"** hoặc **"Crop Recommendation"**

**Bước 2:** Nhập thông số đất và môi trường:
```
- N (Nitrogen - Đạm): 0-150 ppm
- P (Phosphorus - Lân): 0-150 ppm
- K (Potassium - Kali): 0-250 ppm
- Temperature (Nhiệt độ): 0-50°C
- Humidity (Độ ẩm): 0-100%
- pH: 3-10
- Rainfall (Lượng mưa): 0-300 mm
```

**Bước 3:** Click **"Gợi Ý"** hoặc **"Recommend"**

**Bước 4:** Xem kết quả:
```
✅ Cây trồng phù hợp nhất
✅ Độ tin cậy
✅ Lý do gợi ý
```

**API Endpoint:**
```
POST https://hackathonpionedream-production.up.railway.app/api/crop/recommend
```

**Hoặc gọi trực tiếp AI service:**
```
POST https://hackathon-pione-dream.onrender.com/api/recommend
```

---

### **5. CHATBOT AI:**

**Bước 1:** Click nút **🌾 Chatbot** màu xanh góc dưới bên phải

**Bước 2:** Chatbot window sẽ mở ra

**Bước 3:** Hỏi bất kỳ câu hỏi nào:
```
- "Cách trồng lúa?"
- "Bệnh héo xanh là gì?"
- "Cách tưới nước cho rau?"
- "NPK là gì?"
```

**Bước 4:** AI sẽ trả lời chi tiết

**Chatbot URL:**
```
https://hackathon-pione-dream-vzj5.vercel.app/
```

---

### **6. QUẢN LÝ NÔNG TRẠI:**

#### **6.1. Farms (Nông Trại):**
- Xem danh sách farms
- Thêm farm mới
- Sửa thông tin farm
- Xóa farm

#### **6.2. Fields (Ruộng/Thửa Đất):**
- Xem fields theo farm
- Thêm field mới
- Đánh dấu tọa độ trên bản đồ
- Sửa/Xóa field

#### **6.3. Sensors (Cảm Biến):**
- Xem danh sách sensors
- Thêm sensor mới
- Cập nhật dữ liệu sensor
- Xem lịch sử đo

#### **6.4. Crops (Cây Trồng):**
- Quản lý cây trồng
- Theo dõi giai đoạn sinh trưởng
- Lịch sử chăm sóc

---

## 🔐 **TẠO ACCOUNT MỚI:**

### **Cách 1: Qua Frontend**

1. Vào https://hackathon-pione-dream.vercel.app/
2. Click **"ĐĂNG KÝ NGAY"**
3. Điền thông tin:
   - Email
   - Password
   - Họ tên
4. Click **"Đăng ký"**
5. Login với account vừa tạo

### **Cách 2: Qua API**

**PowerShell:**
```powershell
$body = '{"email":"your@email.com","password":"yourpassword","fullName":"Your Name"}'
Invoke-RestMethod -Uri "https://hackathonpionedream-production.up.railway.app/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

**Command Prompt:**
```bash
curl -X POST https://hackathonpionedream-production.up.railway.app/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"your@email.com\",\"password\":\"yourpassword\",\"fullName\":\"Your Name\"}"
```

---

## 🧪 **TEST CÁC API:**

### **1. Test Backend Health:**
```bash
curl https://hackathonpionedream-production.up.railway.app/actuator/health
```

### **2. Test Pest AI Health:**
```bash
curl https://kimngan0407-pest-disease.hf.space/health
```

### **3. Test Crop AI Health:**
```bash
curl https://hackathon-pione-dream.onrender.com/health
```

### **4. Test Login:**
```bash
curl -X POST https://hackathonpionedream-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@smartfarm.cc","password":"Test123!"}'
```

### **5. Test Pest Detection (với token):**
```bash
curl -X POST https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@path/to/image.jpg"
```

---

## 📝 **API ENDPOINTS SUMMARY:**

### **Authentication:**
```
POST /api/auth/register       - Đăng ký
POST /api/auth/login          - Đăng nhập
GET  /api/auth/health         - Health check
```

### **Farms:**
```
GET    /api/farms             - Danh sách farms
POST   /api/farms             - Tạo farm mới
GET    /api/farms/{id}        - Chi tiết farm
PUT    /api/farms/{id}        - Cập nhật farm
DELETE /api/farms/{id}        - Xóa farm
```

### **Fields:**
```
GET    /api/fields            - Danh sách fields
POST   /api/fields            - Tạo field mới
GET    /api/fields/{id}       - Chi tiết field
PUT    /api/fields/{id}       - Cập nhật field
DELETE /api/fields/{id}       - Xóa field
```

### **Sensors:**
```
GET    /api/sensors           - Danh sách sensors
POST   /api/sensors           - Tạo sensor mới
GET    /api/sensors/{id}      - Chi tiết sensor
PUT    /api/sensors/{id}      - Cập nhật sensor
DELETE /api/sensors/{id}      - Xóa sensor
```

### **Pest & Disease:**
```
POST /api/pest-disease/detect  - Phát hiện sâu bệnh
GET  /api/pest-disease/classes - Danh sách bệnh
GET  /api/pest-disease/health  - Health check
```

### **Crop Recommendation:**
```
POST /api/crop/recommend       - Gợi ý cây trồng
GET  /api/crop/health          - Health check
```

---

## 🚨 **XỬ LÝ LỖI THƯỜNG GẶP:**

### **1. Không login được:**
```
❌ Lỗi 401: Email hoặc password sai
✅ Fix: Kiểm tra lại email/password hoặc đăng ký account mới
```

### **2. Màn hình trắng sau login:**
```
❌ Dashboard không load được
✅ Fix: 
   - Hard refresh: Ctrl + Shift + R
   - Clear cache
   - Thử incognito mode
   - Check Console (F12) xem lỗi gì
```

### **3. Chatbot không mở:**
```
❌ Chatbot button không hoạt động
✅ Fix:
   - Đợi 2-3 giây (Chatbot đang load)
   - Reload trang
   - Check popup blocker
```

### **4. Pest Detection lỗi:**
```
❌ Upload ảnh nhưng không có kết quả
✅ Fix:
   - Check kích thước ảnh < 10MB
   - Định dạng: JPG, PNG, JPEG
   - Ảnh phải rõ nét
   - Hugging Face Space có thể đang sleep (đợi 30s)
```

### **5. Crop Recommendation không hoạt động:**
```
❌ Gửi thông số nhưng không nhận được gợi ý
✅ Fix:
   - Check các thông số có hợp lệ không
   - Render service có thể đang sleep (đợi 1-2 phút)
   - Thử lại sau
```

---

## 💡 **LƯU Ý QUAN TRỌNG:**

### **1. Free Tier Limits:**

- **Render (Crop AI):** 
  - Service sẽ **sleep sau 15 phút không hoạt động**
  - Lần request đầu tiên sẽ **chậm (30s-1 phút)** vì đang wake up
  
- **Hugging Face (Pest AI):**
  - Free tier có thể **sleep** sau một thời gian
  - **Lần đầu load sẽ chậm** (10-30s)
  
- **Railway (Backend):**
  - Free tier: **500 giờ/tháng**
  - Database: **512MB storage**
  
- **Vercel (Frontend + Chatbot):**
  - Free tier: **100GB bandwidth/tháng**
  - Unlimited deployments

### **2. Performance Tips:**

- **First load sẽ chậm** vì services đang wake up từ sleep mode
- **Sau lần đầu, các request tiếp theo sẽ nhanh hơn**
- **Nếu không dùng > 15 phút, service sẽ sleep lại**

### **3. Data Persistence:**

- **Database (Railway):** Dữ liệu được lưu vĩnh viễn
- **Accounts:** Không bị mất khi redeploy
- **Uploads:** Cần implement storage service (S3, Cloudinary) cho production

---

## 📞 **HỖ TRỢ:**

Nếu gặp vấn đề:

1. **Check Console (F12)** xem lỗi chi tiết
2. **Check Network Tab** xem request nào failed
3. **Đợi 1-2 phút** nếu service đang sleep
4. **Hard refresh:** Ctrl + Shift + R
5. **Clear cache và thử lại**

---

## 🎉 **HOÀN TẤT!**

Hệ thống Smart Farm của bạn đã **HOÀN TOÀN KẾT NỐI** và sẵn sàng sử dụng!

**URLs chính:**
- Frontend: https://hackathon-pione-dream.vercel.app/
- Backend: https://hackathonpionedream-production.up.railway.app/
- Chatbot: https://hackathon-pione-dream-vzj5.vercel.app/

**Accounts test:**
```
admin@smartfarm.com / 123456
admin.nguyen@smartfarm.cc / Admin123!
test@smartfarm.cc / Test123!
```

---

🚀 **HAPPY FARMING!** 🌾

