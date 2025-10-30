# 🌾 Pest and Disease Detection Service

Service phát hiện sâu bệnh trên cây trồng sử dụng Vision Transformer (ViT).

## 📋 Model Information

- **Model:** Vision Transformer (ViT base patch16 224)
- **Classes:** 4 loại
  - 0: Healthy (Khỏe mạnh)
  - 1: Leaf Rust (Bệnh gỉ sắt lá)
  - 2: Yellow Rust (Bệnh gỉ vàng)
  - 3: Powdery Mildew (Bệnh phấn trắng)
- **Input:** RGB images (224x224)
- **Framework:** PyTorch + timm

## 🚀 Setup

### 1. Tạo virtual environment và cài dependencies
```bash
# Chạy script setup
SETUP.bat

# Hoặc thủ công:
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Test model
```bash
.venv\Scripts\activate
python test_model.py
```

### 3. Start service
```bash
# Cách 1: Dùng script
start_service.bat

# Cách 2: Thủ công
.venv\Scripts\activate
python pest_disease_service.py
```

Service sẽ chạy tại: `http://localhost:5001`

## 📡 API Endpoints

### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu",
  "classes": 4
}
```

### 2. Phát hiện sâu bệnh
```http
POST /api/detect
Content-Type: multipart/form-data
```

**Request (Form-data):**
- `image`: Image file (JPG, PNG)

**OR (JSON với base64):**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
```json
{
  "success": true,
  "disease": "Bệnh gỉ sắt lá",
  "disease_en": "Leaf Rust",
  "class_id": 1,
  "confidence": 0.95,
  "all_predictions": [
    {
      "class_id": 1,
      "class_name_en": "Leaf Rust",
      "class_name_vi": "Bệnh gỉ sắt lá",
      "probability": 0.95
    },
    ...
  ]
}
```

### 3. Lấy danh sách bệnh
```http
GET /api/classes
```

**Response:**
```json
{
  "success": true,
  "total": 4,
  "classes": [
    {
      "class_id": 0,
      "name_en": "Healthy",
      "name_vi": "Khỏe mạnh"
    },
    ...
  ]
}
```

## 🧪 Test với cURL

```bash
# Health check
curl http://localhost:5001/health

# Detect disease
curl -X POST http://localhost:5001/api/detect \
  -F "image=@path/to/image.jpg"

# Get classes
curl http://localhost:5001/api/classes
```

## 🔗 Tích hợp vào Backend Java

### Tạo Service trong Spring Boot:

```java
// PestDiseaseService.java
@Service
public class PestDiseaseService {
    private final RestTemplate restTemplate;
    private final String API_BASE_URL = "http://localhost:5001/api";
    
    public Map<String, Object> detectDisease(MultipartFile image) {
        // Call Python API
    }
}
```

### Tạo Controller:

```java
// PestDiseaseController.java
@RestController
@RequestMapping("/api/pest-disease")
@CrossOrigin(origins = "*")
public class PestDiseaseController {
    
    @PostMapping("/detect")
    public ResponseEntity<Map<String, Object>> detect(
        @RequestParam("image") MultipartFile image
    ) {
        // Call service
    }
}
```

## 🎨 Tích hợp vào Frontend React

```javascript
// pestDiseaseService.js
const detectDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch(
    'http://localhost:8080/api/pest-disease/detect',
    {
      method: 'POST',
      body: formData
    }
  );
  
  return await response.json();
};
```

## 📊 Input Requirements

- **Format:** JPG, PNG, JPEG
- **Size:** Any (will be resized to 224x224)
- **Color:** RGB
- **Recommended:** Clear images of wheat leaves

## ⚙️ Configuration

**Port:** 5001 (Python Flask)  
**Model File:** `best_vit_wheat_model_4classes.pth`  
**CORS:** Enabled for all origins  

## 🔧 Troubleshooting

### Model không load được
```
- Kiểm tra file best_vit_wheat_model_4classes.pth có tồn tại không
- Kiểm tra PyTorch và timm đã cài đúng chưa
```

### Port 5001 bị chiếm
```bash
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### Lỗi dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## 📝 Notes

- Model chỉ hỗ trợ phát hiện bệnh trên lúa mì (wheat)
- Service chạy ở port 5001 (khác với Crop Recommendation ở 5000)
- Backend Java ở port 8080
- Frontend React ở port 3000

## 🎯 Next Steps

1. Start service: `start_service.bat`
2. Tạo backend Java service
3. Tạo frontend UI để upload ảnh
4. Tích hợp vào Field hoặc Crop management

---

**Happy Detecting! 🌾🔍**

