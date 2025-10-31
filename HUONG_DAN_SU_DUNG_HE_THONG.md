# 📖 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG SMART FARM

## 🌐 **TẤT CẢ URL HỆ THỐNG**

| Service | URL | Mô tả |
|---------|-----|-------|
| **Frontend** | https://hackathon-pione-dream.vercel.app/ | Giao diện người dùng |
| **Backend API** | https://hackathonpionedream-production.up.railway.app/ | API Server + Database |
| **AI Chatbot** | https://hackathon-pione-dream-vzj5.vercel.app/ | Trợ lý AI nông nghiệp |
| **AI Cây trồng** | https://hackathon-pione-dream.onrender.com/ | Gợi ý cây trồng |
| **AI Sâu bệnh** | https://kimngan0407-pest-disease.hf.space/ | Phát hiện sâu bệnh |

---

## 👥 **CHO NGƯỜI DÙNG CUỐI (NÔNG DÂN)**

### **1. Truy cập hệ thống**

Mở trình duyệt và vào:
```
https://hackathon-pione-dream.vercel.app/
```

### **2. Đăng ký/Đăng nhập**

- Click "Đăng ký" nếu chưa có tài khoản
- Hoặc "Đăng nhập" nếu đã có

### **3. Xem Dashboard**

- Theo dõi dữ liệu cảm biến (nhiệt độ, độ ẩm, đất)
- Xem biểu đồ theo thời gian
- Nhận cảnh báo khi có vấn đề

### **4. Phát hiện bệnh lá cây**

**Bước 1:** Click menu "Phát hiện bệnh"

**Bước 2:** Chụp ảnh hoặc upload ảnh lá cây

**Bước 3:** Click "Phân tích"

**Bước 4:** Xem kết quả:
```
✅ Loại bệnh: Brown Rust
📊 Độ chính xác: 95%
💡 Khuyến nghị: Phun thuốc...
```

### **5. Nhận gợi ý cây trồng**

**Bước 1:** Click menu "Gợi ý cây trồng"

**Bước 2:** Nhập thông tin:
- Nhiệt độ: 25°C
- Độ ẩm: 70%
- pH đất: 6.5
- Lượng mưa: 100mm
- NPK (N:90, P:42, K:43)

**Bước 3:** Click "Nhận gợi ý"

**Bước 4:** Xem kết quả:
```
🌾 Cây trồng phù hợp: Lúa mì
📈 Độ phù hợp: 85%
💰 Dự kiến thu hoạch: 5 tấn/ha
```

### **6. Chat với AI Bot**

**Cách 1: Trong Frontend**
- Click icon chat góc dưới phải
- Hỏi: "Cách trồng lúa mì?"
- AI trả lời ngay

**Cách 2: Mở Chatbot riêng**
- Vào: https://hackathon-pione-dream-vzj5.vercel.app/
- Chat trực tiếp với AI

---

## 💻 **CHO DEVELOPERS (TÍCH HỢP API)**

### **API Endpoints Backend**

**Base URL:**
```
https://hackathonpionedream-production.up.railway.app
```

#### **1. Pest & Disease Detection**

```javascript
// Health Check
GET /api/pest-disease/health

// Get supported classes
GET /api/pest-disease/classes

// Detect disease from image
POST /api/pest-disease/detect
Content-Type: multipart/form-data
Body: {
  file: <image file>
}

// Response example:
{
  "predicted_class": "Brown Rust",
  "confidence": 0.95,
  "all_predictions": {
    "Brown Rust": 0.95,
    "Septoria": 0.03,
    "Yellow Rust": 0.01,
    "Healthy": 0.01
  }
}
```

#### **2. Crop Recommendation**

```javascript
// Get recommendation
POST /api/crop/recommend
Content-Type: application/json
Body: {
  "temperature": 25.5,
  "humidity": 70,
  "soilMoisture": 50,
  "ph": 6.8,
  "rainfall": 100,
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43
}

// Response example:
{
  "success": true,
  "prediction": "Rice",
  "confidence": 0.85,
  "recommendations": [...]
}
```

#### **3. Sensors**

```javascript
// Get all sensors
GET /api/sensors

// Get sensor data
GET /api/sensors/data

// Add sensor reading
POST /api/sensors/data
Content-Type: application/json
Body: {
  "sensorId": 1,
  "temperature": 25.5,
  "humidity": 70,
  "soilMoisture": 50
}
```

#### **4. Authentication**

```javascript
// Register
POST /api/auth/register
Content-Type: application/json
Body: {
  "username": "farmer1",
  "email": "farmer1@example.com",
  "password": "password123"
}

// Login
POST /api/auth/login
Content-Type: application/json
Body: {
  "username": "farmer1",
  "password": "password123"
}

// Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {...}
}
```

---

## 🔗 **TÍCH HỢP FRONTEND VỚI BACKEND**

### **JavaScript/React Example:**

```javascript
// File: src/config/api.js
export const API_CONFIG = {
  BACKEND: 'https://hackathonpionedream-production.up.railway.app',
  PEST_AI: 'https://kimngan0407-pest-disease.hf.space',
  CROP_AI: 'https://hackathon-pione-dream.onrender.com',
  CHATBOT: 'https://hackathon-pione-dream-vzj5.vercel.app'
};

// File: src/services/diseaseService.js
import { API_CONFIG } from '../config/api';

export async function detectDisease(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  const response = await fetch(
    `${API_CONFIG.BACKEND}/api/pest-disease/detect`,
    {
      method: 'POST',
      body: formData
    }
  );
  
  if (!response.ok) {
    throw new Error('Detection failed');
  }
  
  return response.json();
}

// File: src/services/cropService.js
export async function getCropRecommendation(data) {
  const response = await fetch(
    `${API_CONFIG.BACKEND}/api/crop/recommend`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  
  return response.json();
}

// Usage in component:
import { detectDisease } from './services/diseaseService';

function DiseaseDetector() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      setLoading(true);
      const detection = await detectDisease(file);
      setResult(detection);
    } catch (error) {
      alert('Lỗi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
        disabled={loading}
      />
      
      {loading && <p>Đang phân tích...</p>}
      
      {result && (
        <div className="result">
          <h3>Kết quả:</h3>
          <p>Bệnh: {result.predicted_class}</p>
          <p>Độ chính xác: {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🧪 **TEST HỆ THỐNG**

### **1. Test bằng trình duyệt:**

#### **Test Frontend:**
```
Mở: https://hackathon-pione-dream.vercel.app/
Kiểm tra: Giao diện load đầy đủ
```

#### **Test Chatbot:**
```
Mở: https://hackathon-pione-dream-vzj5.vercel.app/
Chat thử: "Cách trồng lúa mì?"
```

#### **Test Backend Health:**
```
Mở: https://hackathonpionedream-production.up.railway.app/api/pest-disease/health
Thấy: JSON response {"service":"pest-disease","status":"healthy"}
```

### **2. Test bằng Postman:**

#### **Test Pest Detection:**

```
Method: POST
URL: https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect
Body: form-data
  - Key: file
  - Type: File
  - Value: [chọn ảnh lá bệnh]
  
Click "Send"

Response:
{
  "predicted_class": "Brown Rust",
  "confidence": 0.95
}
```

#### **Test Crop Recommendation:**

```
Method: POST
URL: https://hackathonpionedream-production.up.railway.app/api/crop/recommend
Headers:
  - Content-Type: application/json
Body (raw JSON):
{
  "temperature": 25.5,
  "humidity": 70,
  "soilMoisture": 50,
  "ph": 6.8,
  "rainfall": 100,
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43
}

Click "Send"

Response:
{
  "success": true,
  "prediction": "Rice"
}
```

### **3. Test bằng cURL:**

```bash
# Test Backend Health
curl https://hackathonpionedream-production.up.railway.app/api/pest-disease/health

# Test Get Classes
curl https://hackathonpionedream-production.up.railway.app/api/pest-disease/classes

# Test Upload Image
curl -X POST \
  https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect \
  -F "file=@wheat_leaf.jpg"

# Test Crop Recommendation
curl -X POST \
  https://hackathonpionedream-production.up.railway.app/api/crop/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "temperature": 25.5,
    "humidity": 70,
    "soilMoisture": 50,
    "ph": 6.8,
    "rainfall": 100,
    "nitrogen": 90,
    "phosphorus": 42,
    "potassium": 43
  }'
```

### **4. Test bằng JavaScript Console:**

Mở Frontend (F12 → Console):

```javascript
// Test Backend Health
fetch('https://hackathonpionedream-production.up.railway.app/api/pest-disease/health')
  .then(r => r.json())
  .then(d => console.log('Backend health:', d))
  .catch(e => console.error('Error:', e));

// Test Upload Image
const input = document.querySelector('input[type="file"]');
const file = input.files[0];
const formData = new FormData();
formData.append('file', file);

fetch('https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect', {
  method: 'POST',
  body: formData
})
  .then(r => r.json())
  .then(d => console.log('Detection result:', d));
```

---

## 🚨 **XỬ LÝ LỖI THƯỜNG GẶP**

### **1. CORS Error**
```
Access to fetch blocked by CORS policy
```

**Nguyên nhân:** Frontend domain chưa được whitelist

**Giải pháp:** Đã fix! CORS đã cấu hình cho:
- https://hackathon-pione-dream.vercel.app
- https://hackathon-pione-dream-vzj5.vercel.app

### **2. 404 Not Found**
```
POST /api/pest-disease/detect 404
```

**Nguyên nhân:** URL sai hoặc Backend chưa deploy

**Giải pháp:**
1. Kiểm tra URL spelling
2. Xem Railway deployment status
3. Đợi deploy xong (~2-3 phút)

### **3. 500 Internal Server Error**

**Nguyên nhân:** AI service không kết nối được

**Giải pháp:**
1. Test AI service trực tiếp:
   ```
   https://kimngan0407-pest-disease.hf.space/health
   ```
2. Nếu Render (Crop AI) sleep → đợi 30 giây
3. Xem logs trong Railway để debug

### **4. Network Error**

**Nguyên nhân:** Backend offline hoặc network issue

**Giải pháp:**
1. Check Railway status
2. Test với curl/Postman
3. Kiểm tra internet connection

---

## 📊 **MONITORING**

### **Check Health All Services:**

```javascript
// Create health check dashboard
const services = [
  {
    name: 'Backend',
    url: 'https://hackathonpionedream-production.up.railway.app/api/health'
  },
  {
    name: 'Pest AI',
    url: 'https://kimngan0407-pest-disease.hf.space/health'
  },
  {
    name: 'Crop AI',
    url: 'https://hackathon-pione-dream.onrender.com/health'
  }
];

async function checkAllServices() {
  for (const service of services) {
    try {
      const response = await fetch(service.url);
      const status = response.ok ? '✅ Online' : '❌ Offline';
      console.log(`${service.name}: ${status}`);
    } catch (error) {
      console.log(`${service.name}: ❌ Offline (${error.message})`);
    }
  }
}

checkAllServices();
```

---

## 🎯 **USE CASES THỰC TẾ**

### **Use Case 1: Nông dân phát hiện bệnh lúa mì**

```
1. Nông dân mở app trên điện thoại
2. Chụp ảnh lá lúa mì bị bệnh
3. Upload lên hệ thống
4. AI phân tích → "Brown Rust" (95%)
5. Hệ thống gợi ý cách xử lý
6. Nông dân áp dụng và theo dõi
```

### **Use Case 2: Lựa chọn cây trồng mới**

```
1. Nông dân có mảnh đất mới
2. Nhập thông tin đất và khí hậu
3. Hệ thống gợi ý 3 cây trồng phù hợp nhất
4. Hiển thị dự đoán năng suất và lợi nhuận
5. Nông dân chọn cây và bắt đầu trồng
```

### **Use Case 3: Chat với AI để học**

```
1. Nông dân muốn học về kỹ thuật mới
2. Mở chatbot
3. Hỏi: "Cách tưới nước tiết kiệm cho lúa mì?"
4. AI trả lời chi tiết với các bước cụ thể
5. Có thể hỏi tiếp nhiều câu khác
```

---

## 🔐 **BẢO MẬT**

### **Đã áp dụng:**
- ✅ HTTPS cho tất cả services
- ✅ CORS whitelist specific domains
- ✅ Environment variables cho secrets
- ✅ Database SSL connection
- ✅ JWT authentication (trong backend)

### **Khuyến nghị cho production:**
- Thêm rate limiting
- Enable API key authentication
- Add request validation
- Implement logging và monitoring
- Setup automated backups

---

## 📱 **ỨNG DỤNG MOBILE**

Có thể truy cập qua trình duyệt mobile:
```
https://hackathon-pione-dream.vercel.app/
```

Responsive design tự động điều chỉnh cho màn hình nhỏ.

**Tương lai:** Có thể phát triển native app (iOS/Android) sử dụng cùng backend APIs.

---

## 💡 **TIPS & TRICKS**

### **1. Để AI phát hiện bệnh chính xác hơn:**
- Chụp ảnh rõ nét, ánh sáng tốt
- Focus vào lá bị bệnh
- Chụp cận cảnh
- Tránh bóng đổ

### **2. Để gợi ý cây trồng tốt hơn:**
- Nhập đầy đủ thông tin NPK
- Đo pH đất chính xác
- Cập nhật lượng mưa trung bình
- Xem xét điều kiện địa phương

### **3. Chat với AI hiệu quả:**
- Hỏi câu cụ thể, rõ ràng
- Cung cấp context (vùng, mùa vụ...)
- Có thể hỏi nhiều câu liên quan

---

## 📞 **HỖ TRỢ**

### **Nếu gặp vấn đề:**

1. **Đọc phần XỬ LÝ LỖI ở trên**
2. **Check service status:**
   - Railway: https://railway.app/dashboard
   - Vercel: https://vercel.com/dashboard
   - HuggingFace: https://huggingface.co/spaces/kimngan0407
3. **Xem logs để debug**
4. **Test với Postman hoặc cURL**

---

## 🎉 **CHÚC MỪNG!**

**Hệ thống Smart Farm của bạn đã hoàn toàn sẵn sàng sử dụng!**

Tất cả services đang chạy và kết nối với nhau hoàn hảo.

---

*Tài liệu này sẽ được cập nhật khi có thêm tính năng mới.*
*Version: 1.0.0*
*Last Updated: October 31, 2025*

