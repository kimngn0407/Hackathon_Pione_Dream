# 🔗 HƯỚNG DẪN KẾT NỐI CÁC SERVICES

## 📊 **TÓM TẮT KẾT NỐI**

```
Frontend (Vercel)
    ↓ REST API calls
Backend (Railway)  
    ├→ Pest AI (HF): https://kimngan0407-pest-disease.hf.space
    ├→ Crop AI (Render): https://hackathon-pione-dream.onrender.com
    └→ Database (Railway PostgreSQL)
```

---

## ✅ **ĐÃ CẤU HÌNH**

### 1. Backend → AI Services ✅
**File:** `demoSmartFarm/demo/src/main/resources/application.properties`

```properties
# AI Services URLs
pest.disease.service.url=https://kimngan0407-pest-disease.hf.space
crop.recommendation.service.url=https://hackathon-pione-dream.onrender.com
```

### 2. Backend Services ✅
**Đã tạo:**
- ✅ `PestDiseaseService.java` - Gọi Pest AI
- ✅ `AIRecommendationService.java` - Gọi Crop AI (đã cập nhật URL)
- ✅ `PestDiseaseController.java` - API endpoints cho Frontend

### 3. CORS Configuration ✅
**File:** `CorsConfig.java`

```java
Allowed Origins:
- https://hackathon-pione-dream.vercel.app (Frontend)
- https://hackathon-pione-dream-vzj5.vercel.app (Chatbot)  
- http://localhost:3000 (Dev)
```

---

## 🔧 **CẤU HÌNH FRONTEND → BACKEND**

### JavaScript/React Example:

```javascript
// Config file: src/config/api.js
const API_BASE_URL = 'https://hackathonpionedream-production.up.railway.app';

export const API_ENDPOINTS = {
  // Pest & Disease
  pestHealth: `${API_BASE_URL}/api/pest-disease/health`,
  pestClasses: `${API_BASE_URL}/api/pest-disease/classes`,
  pestDetect: `${API_BASE_URL}/api/pest-disease/detect`,
  
  // Crop Recommendation  
  cropHealth: `${API_BASE_URL}/api/crop/health`,
  cropRecommend: `${API_BASE_URL}/api/crop/recommend`,
  
  // Sensors
  sensors: `${API_BASE_URL}/api/sensors`,
  sensorData: `${API_BASE_URL}/api/sensors/data`,
  
  // Auth
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
};
```

### Fetch Example - Detect Disease:

```javascript
// Detect disease from image
async function detectDisease(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  try {
    const response = await fetch(
      'https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect',
      {
        method: 'POST',
        body: formData,
        // Don't set Content-Type, browser will set it with boundary
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Detection result:', result);
    
    // result format:
    // {
    //   "predicted_class": "Brown Rust",
    //   "confidence": 0.95,
    //   "all_predictions": {...}
    // }
    
    return result;
  } catch (error) {
    console.error('Error detecting disease:', error);
    throw error;
  }
}

// Usage in React component
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    setLoading(true);
    const result = await detectDisease(file);
    setDetectionResult(result);
  } catch (error) {
    alert('Failed to detect disease: ' + error.message);
  } finally {
    setLoading(false);
  }
};
```

### Axios Example - Get Crop Recommendation:

```javascript
import axios from 'axios';

const API_BASE = 'https://hackathonpionedream-production.up.railway.app';

// Get crop recommendation
async function getCropRecommendation(sensorData) {
  try {
    const response = await axios.post(
      `${API_BASE}/api/crop/recommend`,
      {
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        soilMoisture: sensorData.soilMoisture,
        ph: sensorData.ph || 6.5,
        rainfall: sensorData.rainfall || 100,
        nitrogen: sensorData.N || 50,
        phosphorus: sensorData.P || 30,
        potassium: sensorData.K || 40
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting crop recommendation:', error);
    throw error;
  }
}

// Usage
const handleGetRecommendation = async () => {
  try {
    const result = await getCropRecommendation({
      temperature: 25.5,
      humidity: 70,
      soilMoisture: 50,
      ph: 6.8,
      N: 90,
      P: 42,
      K: 43
    });
    
    console.log('Recommended crop:', result.prediction);
  } catch (error) {
    alert('Failed to get recommendation');
  }
};
```

---

## 🎯 **API ENDPOINTS ĐÃ SẴN SÀNG**

### Backend API Base:
```
https://hackathonpionedream-production.up.railway.app
```

### Pest & Disease Endpoints:

```bash
# 1. Health Check
GET /api/pest-disease/health
Response: {"service":"pest-disease","status":"healthy","ai_api_connected":true}

# 2. Get Classes
GET /api/pest-disease/classes  
Response: {"classes":["Brown Rust","Healthy","Septoria","Yellow Rust"]}

# 3. Detect Disease
POST /api/pest-disease/detect
Content-Type: multipart/form-data
Body: file=<image file>
Response: {
  "predicted_class": "Brown Rust",
  "confidence": 0.95,
  "all_predictions": {...}
}

# 4. Get History
GET /api/pest-disease/history
Response: {"message":"History feature coming soon","detections":[]}
```

### Crop Recommendation Endpoints:

```bash
# Health Check
GET /api/crop/health

# Get Recommendation  
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
```

---

## 🧪 **TEST KẾT NỐI**

### Test 1: Backend → Pest AI

```bash
# Từ local hoặc Postman
curl https://hackathonpionedream-production.up.railway.app/api/pest-disease/health
```

**Expected:**
```json
{
  "service": "pest-disease",
  "status": "healthy",
  "ai_api_connected": true
}
```

### Test 2: Backend → Crop AI

```bash
curl https://hackathonpionedream-production.up.railway.app/api/crop/health
```

### Test 3: Frontend → Backend (trong Console của trình duyệt)

```javascript
// Mở https://hackathon-pione-dream.vercel.app/
// Mở Console (F12) và chạy:

fetch('https://hackathonpionedream-production.up.railway.app/api/pest-disease/health')
  .then(r => r.json())
  .then(data => console.log('Backend response:', data))
  .catch(err => console.error('Error:', err));
```

**Nếu thành công:** Thấy response trong console
**Nếu lỗi CORS:** Kiểm tra CorsConfig trong Backend

---

## 🔐 **AUTHENTICATION (NẾU CÓ)**

### JWT Token Flow:

```javascript
// 1. Login
const login = async (username, password) => {
  const response = await fetch(
    'https://hackathonpionedream-production.up.railway.app/api/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }
  );
  
  const data = await response.json();
  
  // Save token
  localStorage.setItem('token', data.token);
  
  return data;
};

// 2. Use token for authenticated requests
const getProtectedData = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(
    'https://hackathonpionedream-production.up.railway.app/api/sensors',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.json();
};
```

---

## 📝 **FRONTEND INTEGRATION CHECKLIST**

### Trong Frontend Code:

```javascript
// 1. Create API config file
// File: src/config/api.js
export const API_BASE_URL = 'https://hackathonpionedream-production.up.railway.app';

// 2. Create API service
// File: src/services/pestService.js
export const detectDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  const response = await fetch(`${API_BASE_URL}/api/pest-disease/detect`, {
    method: 'POST',
    body: formData
  });
  
  return response.json();
};

// 3. Use in components
// File: src/components/DiseaseDetector.jsx
import { detectDisease } from '../services/pestService';

function DiseaseDetector() {
  const [result, setResult] = useState(null);
  
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const detection = await detectDisease(file);
    setResult(detection);
  };
  
  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {result && (
        <div>
          <h3>Disease: {result.predicted_class}</h3>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🚨 **XỬ LÝ LỖI THƯỜNG GẶP**

### Lỗi 1: CORS Error
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Nguyên nhân:** Frontend domain chưa được thêm vào CORS whitelist

**Giải pháp:**
1. Vào `CorsConfig.java`
2. Thêm domain Frontend vào `allowedOrigins`
3. Redeploy Backend

### Lỗi 2: 404 Not Found
```
POST https://hackathonpionedream-production.up.railway.app/api/pest-disease/detect 404
```

**Nguyên nhân:** Endpoint không tồn tại hoặc Backend chưa deploy

**Giải pháp:**
1. Kiểm tra Railway deployment status
2. Kiểm tra spelling của endpoint
3. Xem logs trong Railway

### Lỗi 3: 500 Internal Server Error
```
POST /api/pest-disease/detect 500
```

**Nguyên nhân:** AI service không kết nối được hoặc lỗi trong Backend

**Giải pháp:**
1. Test AI service trực tiếp:
   ```bash
   curl https://kimngan0407-pest-disease.hf.space/health
   ```
2. Xem Backend logs trong Railway
3. Kiểm tra `application.properties` có đúng URL không

### Lỗi 4: Network Error
```
Failed to fetch
```

**Nguyên nhân:** 
- Backend offline
- Network issue
- Render free tier đang sleep (cho Crop AI)

**Giải pháp:**
1. Kiểm tra Backend status trong Railway
2. Nếu là Crop AI, đợi 30 giây để service wake up
3. Test với curl để xác định

---

## 📊 **MONITORING**

### Check Health của tất cả services:

```bash
# Backend
curl https://hackathonpionedream-production.up.railway.app/api/health

# Pest AI  
curl https://kimngan0407-pest-disease.hf.space/health

# Crop AI
curl https://hackathon-pione-dream.onrender.com/health
```

### Tạo Health Dashboard (trong Frontend):

```javascript
const HealthDashboard = () => {
  const [health, setHealth] = useState({
    backend: 'checking...',
    pestAI: 'checking...',
    cropAI: 'checking...'
  });
  
  useEffect(() => {
    checkAllServices();
  }, []);
  
  const checkAllServices = async () => {
    // Check Backend
    try {
      await fetch('https://hackathonpionedream-production.up.railway.app/api/health');
      setHealth(prev => ({ ...prev, backend: '✅ Online' }));
    } catch {
      setHealth(prev => ({ ...prev, backend: '❌ Offline' }));
    }
    
    // Check Pest AI
    try {
      await fetch('https://kimngan0407-pest-disease.hf.space/health');
      setHealth(prev => ({ ...prev, pestAI: '✅ Online' }));
    } catch {
      setHealth(prev => ({ ...prev, pestAI: '❌ Offline' }));
    }
    
    // Similar for Crop AI
  };
  
  return (
    <div>
      <h3>System Health</h3>
      <p>Backend: {health.backend}</p>
      <p>Pest AI: {health.pestAI}</p>
      <p>Crop AI: {health.cropAI}</p>
    </div>
  );
};
```

---

## ✅ **DEPLOY VÀ TEST**

### Bước 1: Push code Backend
```bash
cd E:\DoAnJ2EE
git add demoSmartFarm/
git commit -m "Add AI service integration and CORS config"
git push origin main
```

### Bước 2: Đợi Railway deploy (~2-3 phút)

### Bước 3: Test endpoints
```bash
curl https://hackathonpionedream-production.up.railway.app/api/pest-disease/health
```

### Bước 4: Update Frontend với URLs
- Update API base URL trong Frontend config
- Test từ Frontend UI

### Bước 5: Deploy Frontend
- Push code Frontend lên GitHub
- Vercel tự động deploy

---

## 🎯 **TỔNG KẾT**

✅ **Backend đã sẵn sàng kết nối với:**
- Pest & Disease AI (Hugging Face)
- Crop Recommendation AI (Render)
- Database (Railway PostgreSQL)

✅ **CORS đã được cấu hình cho:**
- Frontend (Vercel)
- Chatbot (Vercel)
- Local development

✅ **API Endpoints đã tạo:**
- `/api/pest-disease/*` - Pest detection
- `/api/crop/*` - Crop recommendation
- Tất cả có CORS support

---

## 📞 **NEXT STEPS**

1. ✅ Push Backend code (đã làm ở trên)
2. ⏳ Update Frontend với Backend URLs
3. ⏳ Test toàn bộ flow từ Frontend
4. ⏳ Deploy Frontend

**Bạn muốn tôi giúp update Frontend code không?** 🚀

