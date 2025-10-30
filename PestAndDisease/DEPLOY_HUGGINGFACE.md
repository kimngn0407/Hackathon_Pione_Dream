# 🤗 DEPLOY PEST & DISEASE DETECTION LÊN HUGGING FACE SPACES

## ✅ TẠI SAO CHỌN HUGGING FACE?

- ✅ **FREE** với 16GB RAM (đủ cho PyTorch models)
- ✅ Chuyên cho ML/AI applications
- ✅ Auto rebuild khi push code
- ✅ Free SSL + CDN
- ✅ Không cần credit card

---

## 🚀 HƯỚNG DẪN DEPLOY (10 PHÚT)

### **BƯỚC 1: Tạo Tài Khoản Hugging Face**

1. Vào https://huggingface.co/join
2. Đăng ký (miễn phí, dùng email hoặc GitHub)
3. Xác nhận email

---

### **BƯỚC 2: Tạo Space Mới**

1. Vào https://huggingface.co/spaces
2. Click **"Create new Space"**
3. Điền thông tin:
   - **Owner**: Chọn username của bạn
   - **Space name**: `pest-disease-detection`
   - **License**: `mit` (hoặc tùy chọn)
   - **Select the Space SDK**: Chọn **"Docker"**
   - **Space hardware**: **"CPU basic - Free"**
4. Click **"Create Space"**

---

### **BƯỚC 3: Push Code Lên Space**

#### Option A: Dùng Git (Đề xuất)

1. **Clone Space repository:**
```bash
git clone https://huggingface.co/spaces/YOUR-USERNAME/pest-disease-detection
cd pest-disease-detection
```

2. **Copy files từ PestAndDisease:**
```bash
# Copy tất cả files cần thiết
copy E:\DoAnJ2EE\PestAndDisease\* .

# Đảm bảo có các files:
# - Dockerfile
# - pest_disease_service.py
# - requirements-cpu.txt
# - best_vit_wheat_model_4classes.pth
# - README_HUGGINGFACE.md (đổi tên thành README.md)
```

3. **Rename README:**
```bash
ren README_HUGGINGFACE.md README.md
```

4. **Commit và push:**
```bash
git add .
git commit -m "Initial deployment of Pest Disease Detection API"
git push
```

#### Option B: Upload qua Web UI

1. Vào Space vừa tạo
2. Click **"Files"** tab
3. Click **"Add file"** → **"Upload files"**
4. Upload các files:
   - `Dockerfile`
   - `pest_disease_service.py`
   - `requirements-cpu.txt`
   - `best_vit_wheat_model_4classes.pth` ⚠️ (nếu <500MB)
   - `README_HUGGINGFACE.md` (đổi tên → `README.md`)

---

### **BƯỚC 4: Đợi Build**

1. Hugging Face sẽ tự động build Docker image
2. Check logs tại tab **"Logs"** (góc phải)
3. Build mất khoảng 5-10 phút (download PyTorch)
4. Khi thấy **"Running"** → Deployment thành công! 🎉

---

### **BƯỚC 5: Test API**

**Space URL:**
```
https://YOUR-USERNAME-pest-disease-detection.hf.space
```

**Test endpoints:**

1. **Health check:**
```bash
curl https://YOUR-USERNAME-pest-disease-detection.hf.space/health
```

2. **Detect disease:**
```bash
curl -X POST \
  -F "file=@test_image.jpg" \
  https://YOUR-USERNAME-pest-disease-detection.hf.space/api/detect
```

3. **Get classes:**
```bash
curl https://YOUR-USERNAME-pest-disease-detection.hf.space/api/classes
```

---

## ⚠️ XỬ LÝ VẤN ĐỀ MODEL FILE LỚN

### **Nếu model file > 500MB:**

**Giải pháp 1: Upload riêng lên Hugging Face Model Hub**

1. Tạo Model repository:
```bash
# Tại https://huggingface.co/new
# Chọn "Model" thay vì "Space"
```

2. Upload model:
```bash
pip install huggingface_hub
huggingface-cli login
huggingface-cli upload YOUR-USERNAME/pest-disease-model best_vit_wheat_model_4classes.pth
```

3. Download trong code:
```python
from huggingface_hub import hf_hub_download

MODEL_PATH = hf_hub_download(
    repo_id="YOUR-USERNAME/pest-disease-model",
    filename="best_vit_wheat_model_4classes.pth"
)
```

**Giải pháp 2: Dùng Git LFS**

1. Enable Git LFS:
```bash
git lfs install
git lfs track "*.pth"
```

2. Add và push:
```bash
git add .gitattributes
git add best_vit_wheat_model_4classes.pth
git commit -m "Add model with Git LFS"
git push
```

---

## 📝 CẤU HÌNH CORS (Nếu Cần)

Nếu Frontend gọi API bị CORS error, thêm domain vào `pest_disease_service.py`:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "https://your-frontend.vercel.app",
    "http://localhost:3000"  # for local development
])
```

---

## 🔗 TÍCH HỢP VÀO FRONTEND

**Update Frontend environment variables:**

```env
REACT_APP_PEST_API_URL=https://YOUR-USERNAME-pest-disease-detection.hf.space
```

**Gọi API từ Frontend:**

```javascript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch(`${process.env.REACT_APP_PEST_API_URL}/api/detect`, {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

---

## 💡 TỐI ƯU HIỆU NĂNG

### **1. Giảm kích thước model**
Nếu model quá lớn, xem xét:
- Model quantization (PyTorch)
- Pruning
- Knowledge distillation

### **2. Caching**
Thêm caching cho predictions:
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def predict_cached(image_hash):
    # prediction logic
```

### **3. Async processing**
Dùng Celery/Redis cho long-running tasks

---

## 📊 MONITORING

**Check Space status:**
- https://huggingface.co/spaces/YOUR-USERNAME/pest-disease-detection

**View logs:**
- Click tab "Logs" trong Space

**Metrics:**
- Hugging Face tự động track requests
- Xem Analytics tab

---

## 🆓 FREE TIER LIMITS

Hugging Face Spaces Free tier:
- ✅ 2 CPU cores
- ✅ 16GB RAM
- ✅ 50GB storage
- ✅ Sleep sau 48h không dùng (auto wake khi access)

**Upgrade nếu cần:**
- Persistent storage: $5/month
- Better CPU: $10/month
- GPU T4: $30/month

---

## 🎯 CHECKLIST

- [ ] Tạo Hugging Face account
- [ ] Tạo Space với Docker SDK
- [ ] Copy files vào Space
- [ ] Rename README_HUGGINGFACE.md → README.md
- [ ] Push code (Git hoặc Upload)
- [ ] Đợi build xong
- [ ] Test `/health` endpoint
- [ ] Test `/api/detect` với ảnh
- [ ] Lưu lại Space URL
- [ ] Update Frontend với API URL
- [ ] Test integration Frontend ↔ API

---

## 🚀 NEXT STEPS

Sau khi Pest Disease API chạy OK:
1. Deploy Crop Recommendation service (tương tự)
2. Deploy Frontend lên Vercel
3. Deploy Chatbot lên Vercel
4. Kết nối tất cả services

---

**CHÚC BẠN DEPLOY THÀNH CÔNG!** 🎉🤗

Need help? Check:
- Hugging Face Docs: https://huggingface.co/docs/hub/spaces
- Community: https://discuss.huggingface.co

