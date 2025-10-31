# 🔗 CÁCH CÁC PHẦN KẾT NỐI VỚI NHAU - ĐƠN GIẢN

## 📊 **SƠ ĐỒ KẾT NỐI**

```
┌────────────────────────────────────────┐
│          NGƯỜI DÙNG                    │
│     (Trình duyệt web/Mobile)          │
└───────────────┬────────────────────────┘
                │
                ↓ (1) Truy cập website
┌────────────────────────────────────────┐
│         FRONTEND (Vercel)              │
│  hackathon-pione-dream.vercel.app      │
│                                        │
│  - Giao diện người dùng                │
│  - Upload ảnh, nhập dữ liệu            │
└───────────────┬────────────────────────┘
                │
                ↓ (2) Gọi API qua fetch/axios
┌────────────────────────────────────────┐
│      BACKEND API (Railway)             │
│  hackathonpionedream-production.       │
│         up.railway.app                 │
│                                        │
│  - Nhận request từ Frontend            │
│  - Xử lý logic                         │
│  - Gọi AI services                     │
└──┬─────────┬──────────┬────────────────┘
   │         │          │
   │         │          └──> (3a) Lưu/đọc dữ liệu
   │         │               ┌─────────────────┐
   │         │               │   DATABASE      │
   │         │               │  (PostgreSQL)   │
   │         │               │    Railway      │
   │         │               └─────────────────┘
   │         │
   │         └──> (3b) Gọi Crop AI
   │              ┌──────────────────────────┐
   │              │  Crop Recommendation AI  │
   │              │  hackathon-pione-dream.  │
   │              │      onrender.com        │
   │              │  - Gợi ý cây trồng       │
   │              └──────────────────────────┘
   │
   └──> (3c) Gọi Pest AI
        ┌──────────────────────────────┐
        │  Pest & Disease Detection AI │
        │  kimngan0407-pest-disease.   │
        │        hf.space              │
        │  - Phát hiện sâu bệnh        │
        └──────────────────────────────┘
```

---

## 🔧 **CÁCH HOẠT ĐỘNG**

### **BƯỚC 1: Người dùng truy cập Frontend**

```
URL: https://hackathon-pione-dream.vercel.app/
```

- Người dùng mở trình duyệt
- Nhập URL hoặc click link
- Frontend load giao diện

### **BƯỚC 2: Frontend gọi Backend**

**Ví dụ:** Người dùng upload ảnh lá bệnh

```javascript
// Frontend code (JavaScript)
const formData = new FormData();
formData.append('file', imageFile);

fetch('https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(result => {
  console.log('Bệnh phát hiện:', result.predicted_class);
  console.log('Độ chính xác:', result.confidence);
});
```

### **BƯỚC 3: Backend nhận request và gọi AI**

**Backend code (Java):**

```java
// PestDiseaseController.java
@PostMapping("/api/pest-disease/detect")
public ResponseEntity<Map> detectDisease(@RequestParam("file") MultipartFile file) {
    // Gọi PestDiseaseService
    Map<String, Object> result = pestDiseaseService.detectDisease(file);
    return ResponseEntity.ok(result);
}

// PestDiseaseService.java
public Map<String, Object> detectDisease(MultipartFile file) {
    // Gọi AI service ở Hugging Face
    String url = "https://kimngan0407-pest-disease.hf.space/api/detect";
    
    // Gửi ảnh đến AI
    HttpEntity<MultipartFile> request = new HttpEntity<>(file);
    ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
    
    // Trả kết quả về Frontend
    return response.getBody();
}
```

### **BƯỚC 4: AI xử lý và trả kết quả**

```python
# Pest AI (Python - Hugging Face)
@app.route('/api/detect', methods=['POST'])
def detect():
    image = request.files['file']
    
    # Load và xử lý ảnh
    img = Image.open(image)
    
    # Chạy model AI
    prediction = model.predict(img)
    
    # Trả kết quả
    return {
        "predicted_class": "Brown Rust",
        "confidence": 0.95
    }
```

### **BƯỚC 5: Kết quả trả về Frontend**

```
Backend → Frontend: {
  "predicted_class": "Brown Rust",
  "confidence": 0.95
}
```

Frontend hiển thị cho người dùng:
```
Kết quả: Bệnh Brown Rust
Độ chính xác: 95%
```

---

## 🔗 **CÁC URL KẾT NỐI**

### **1. Frontend → Backend**

```javascript
// Frontend config
const BACKEND_URL = 'https://hackathonpionedream-production.up.railway.app';

// Các endpoints:
const API = {
  // Pest & Disease
  pestDetect: `${BACKEND_URL}/api/pest-disease/detect`,
  pestClasses: `${BACKEND_URL}/api/pest-disease/classes`,
  
  // Crop Recommendation
  cropRecommend: `${BACKEND_URL}/api/crop/recommend`,
  
  // Sensors
  sensors: `${BACKEND_URL}/api/sensors`,
  
  // Auth
  login: `${BACKEND_URL}/api/auth/login`,
};
```

### **2. Backend → AI Services**

```properties
# Backend config (application.properties)

# URL của Pest AI
pest.disease.service.url=https://kimngan0407-pest-disease.hf.space

# URL của Crop AI
crop.recommendation.service.url=https://hackathon-pione-dream.onrender.com

# Database tự động connect qua Railway environment variables
```

---

## ✅ **ĐÃ CẤU HÌNH XO**

### ✅ Backend có thể gọi AI:
- Đã tạo `PestDiseaseService.java`
- Đã tạo `AIRecommendationService.java`
- Đã config URLs trong `application.properties`

### ✅ Frontend có thể gọi Backend:
- Đã setup CORS trong `CorsConfig.java`
- Frontend domains đã được whitelist:
  - `https://hackathon-pione-dream.vercel.app`
  - `https://hackathon-pione-dream-vzj5.vercel.app`
  - `http://localhost:3000` (cho dev)

### ✅ Backend kết nối Database:
- Tự động qua Railway environment variables
- Không cần config thêm

---

## 🧪 **TEST KẾT NỐI**

### **Test 1: Frontend → Backend**

Mở Console trong trình duyệt (F12) và chạy:

```javascript
fetch('https://hackathonpionedream-production.up.railway.app/api/pest-disease/health')
  .then(r => r.json())
  .then(data => console.log(data));
```

**Kết quả mong đợi:**
```json
{
  "service": "pest-disease",
  "status": "healthy",
  "ai_api_connected": true
}
```

### **Test 2: Backend → Pest AI**

```bash
curl https://hackathonpionedream-production.up.railway.app/api/pest-disease/classes
```

**Kết quả mong đợi:**
```json
{
  "classes": ["Brown Rust", "Healthy", "Septoria", "Yellow Rust"]
}
```

### **Test 3: Toàn bộ flow**

1. Mở Frontend: `https://hackathon-pione-dream.vercel.app/`
2. Upload ảnh lá bệnh
3. Click "Phát hiện"
4. Xem kết quả hiển thị

**Flow hoàn chỉnh:**
```
User → Frontend → Backend → Pest AI → Backend → Frontend → User
   |      |          |          |          |         |        |
Upload  Send to   Forward   Analyze   Return   Display  See
Image   Backend   to AI     Image    Result   Result  Result
```

---

## 🔐 **BẢO MẬT**

### **CORS (Cross-Origin Resource Sharing)**

**Vấn đề:** Trình duyệt chặn Frontend gọi Backend từ domain khác

**Giải pháp đã áp dụng:**

```java
// Backend: CorsConfig.java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        // Cho phép các domains này gọi Backend
        config.setAllowedOrigins(Arrays.asList(
            "https://hackathon-pione-dream.vercel.app",    // Frontend
            "https://hackathon-pione-dream-vzj5.vercel.app", // Chatbot
            "http://localhost:3000"                         // Development
        ));
        
        // Cho phép tất cả methods: GET, POST, PUT, DELETE
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        
        return new CorsFilter(source);
    }
}
```

**Kết quả:** Frontend có thể gọi Backend không bị chặn

---

## 📱 **VÍ DỤ THỰC TẾ**

### **Scenario: Phát hiện bệnh lá lúa mì**

```
1. Nông dân mở app trên điện thoại
   URL: https://hackathon-pione-dream.vercel.app/

2. Click "Phát hiện bệnh", chọn ảnh từ thư viện

3. Frontend gửi ảnh lên Backend:
   POST https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect
   Body: FormData với file ảnh

4. Backend nhận ảnh, forward đến Pest AI:
   POST https://kimngan0407-pest-disease.hf.space/api/detect
   Body: ảnh

5. Pest AI phân tích:
   - Load ảnh
   - Chạy Vision Transformer model
   - Dự đoán: "Brown Rust" với confidence 95%

6. Pest AI trả kết quả về Backend:
   {
     "predicted_class": "Brown Rust",
     "confidence": 0.95
   }

7. Backend lưu vào Database (optional)

8. Backend trả kết quả về Frontend

9. Frontend hiển thị cho nông dân:
   ┌─────────────────────────┐
   │  Kết quả phát hiện:     │
   │  🐛 Brown Rust          │
   │  📊 Độ chính xác: 95%   │
   │                         │
   │  💡 Khuyến nghị:        │
   │  - Phun thuốc...        │
   │  - Tăng thông gió...    │
   └─────────────────────────┘

10. Nông dân nhận thông tin và xử lý
```

---

## 🚀 **TRIỂN KHAI**

### **Đã deploy ở đâu?**

| Phần | Platform | URL | Status |
|------|----------|-----|--------|
| Frontend | Vercel | hackathon-pione-dream.vercel.app | ✅ |
| Backend | Railway | hackathonpionedream-production.up.railway.app | ✅ |
| Database | Railway | Internal connection | ✅ |
| Pest AI | Hugging Face | kimngan0407-pest-disease.hf.space | ✅ |
| Crop AI | Render | hackathon-pione-dream.onrender.com | ✅ |

### **Tự động deploy:**

```
Code thay đổi → Push lên GitHub → Platform tự động deploy

Frontend: Git push → Vercel auto-deploy (~1 phút)
Backend:  Git push → Railway auto-deploy (~3 phút)
```

---

## ✅ **TÓM TẮT**

**Các phần kết nối với nhau thông qua:**

1. **HTTP/HTTPS requests** - Frontend gọi Backend qua REST API
2. **REST API calls** - Backend gọi AI services qua HTTP
3. **Database connection** - Backend kết nối PostgreSQL qua JDBC
4. **CORS configuration** - Cho phép cross-origin requests
5. **Environment variables** - Config URLs và credentials

**Tất cả đã được cấu hình và sẵn sàng hoạt động!** ✅

---

## 📖 **ĐỌC THÊM**

- File chi tiết: `KET_NOI_CAC_SERVICES.md`
- Architecture: `SYSTEM_ARCHITECTURE.md`
- Deployment: `FINAL_DEPLOYMENT_CHECKLIST.md`

---

**🎉 HỆ THỐNG CỦA BẠN ĐÃ HOÀN TOÀN KẾT NỐI VỚI NHAU VÀ HOẠT ĐỘNG!**

