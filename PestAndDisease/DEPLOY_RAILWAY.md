# 🚀 DEPLOY PEST & DISEASE DETECTION LÊN RAILWAY

## ✅ ĐÃ CHUẨN BỊ SẴN:
- ✅ `requirements.txt` - Python dependencies
- ✅ `railway.toml` - Railway configuration  
- ✅ `Procfile` - Start command
- ✅ `pest_disease_service.py` - Đã fix PORT từ env
- ✅ Model file: `best_vit_wheat_model_4classes.pth`

---

## 📋 CÁC BƯỚC DEPLOY (5 PHÚT)

### **BƯỚC 1: Push Code Lên GitHub** ✅ (Đã xong)
Code đã có trên GitHub repository

---

### **BƯỚC 2: Tạo Service Mới Trên Railway**

1. Vào https://railway.app
2. Mở project **Hackathon_Pione_Dream** (đã tạo trước đó)
3. Click **"+ New"** → **"GitHub Repo"**
4. Chọn repository: `kimngn0407/Hackathon_Pione_Dream`

---

### **BƯỚC 3: Cấu Hình Service**

#### 3.1. Set Root Directory
1. Click vào **Service** vừa tạo
2. Vào tab **"Settings"**
3. Tìm **"Root Directory"**
4. Nhập: `PestAndDisease`
5. Click **"Save"**

#### 3.2. Set Environment Variables
Vào tab **"Variables"**, thêm:

```
PYTHON_VERSION=3.9
PORT=5001
```

#### 3.3. Kiểm Tra Build Settings
Trong **Settings** → **Build**:
- **Build Command**: `pip install -r requirements.txt` (tự động)
- **Start Command**: `python pest_disease_service.py` (tự động từ Procfile)

---

### **BƯỚC 4: Deploy**
- Railway tự động deploy
- Đợi build xong (5-10 phút do phải download PyTorch)
- Check logs tại tab **"Deployments"**

---

### **BƯỚC 5: Generate Domain**
1. Vào tab **"Settings"**
2. Scroll xuống **"Networking"**
3. Click **"Generate Domain"**
4. Copy URL (VD: `https://pestdisease-production.up.railway.app`)

---

## ✅ KIỂM TRA DEPLOYMENT

### Test Health Check:
```
GET https://your-domain.up.railway.app/health
```

**Kết quả mong đợi:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu",
  "num_classes": 4
}
```

### Test API Detect:
```
POST https://your-domain.up.railway.app/api/detect
Content-Type: multipart/form-data

Body: file=<your_image.jpg>
```

### Get Classes:
```
GET https://your-domain.up.railway.app/api/classes
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

### **1. Model File Size**
File `best_vit_wheat_model_4classes.pth` có thể khá lớn (>100MB).  
Railway có thể mất thời gian download khi build.

**Nếu quá lớn**, xem xét:
- Upload model lên cloud storage (S3, Google Drive)
- Download model khi service start
- Hoặc dùng Hugging Face Model Hub

### **2. Memory**
PyTorch + ViT model cần ít nhất **1GB RAM**.  
Railway free tier có thể không đủ → cần upgrade.

### **3. Build Time**
Build lần đầu có thể mất 5-10 phút do:
- Download PyTorch (~700MB)
- Download torchvision
- Install dependencies

---

## 🔧 XỬ LÝ LỖI

### **Lỗi: "Out of memory"**
✅ Fix: Upgrade Railway plan hoặc deploy lên Render (có 512MB free)

### **Lỗi: "Model file not found"**
✅ Fix: Đảm bảo `best_vit_wheat_model_4classes.pth` đã push lên GitHub

### **Lỗi: "Torch not available"**
✅ Fix: Check requirements.txt có đúng version torch không

### **Build quá lâu (>15 phút)**
✅ Fix: 
- Dùng torch CPU version (nhẹ hơn)
- Update requirements.txt:
```
torch==2.0.1+cpu
torchvision==0.15.2+cpu
```

---

## 🎯 SAU KHI DEPLOY XONG

**Lưu lại URL:**
```
PEST_DISEASE_API_URL=https://your-domain.up.railway.app
```

**Cập nhật Frontend** để gọi API này:
```javascript
const PEST_API_URL = "https://your-domain.up.railway.app";
```

---

## 🚀 ALTERNATIVE: DEPLOY LÊN RENDER

Nếu Railway không đủ memory, dùng **Render.com**:
1. File `render.yaml` đã có sẵn
2. Connect GitHub repo
3. Render tự động detect và deploy
4. Free tier: 512MB RAM (đủ cho model này)

---

**CHÚC BẠN DEPLOY THÀNH CÔNG!** 🎉

