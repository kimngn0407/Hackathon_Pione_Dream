# 📥 HƯỚNG DẪN SETUP MODEL DOWNLOAD TỪ GOOGLE DRIVE

> **Vấn đề:** Model files quá lớn (>100MB), không thể push lên GitHub  
> **Giải pháp:** Upload lên Google Drive, code sẽ tự download khi deploy

---

## 📝 BƯỚC 1: UPLOAD MODEL LÊN GOOGLE DRIVE

### **1.1. Upload files**

Upload 2 files sau lên Google Drive của bạn:
- `E:\DoAnJ2EE\RecommentCrop\RandomForest_RecomentTree.pkl`
- `E:\DoAnJ2EE\PestAndDisease\best_vit_wheat_model_4classes.pth`

### **1.2. Lấy shareable link**

Với MỖI file:
1. Click chuột phải vào file → **"Get link"** hoặc **"Chia sẻ"**
2. Chọn **"Anyone with the link"** → **"Viewer"**
3. Copy link (dạng: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)

### **1.3. Lấy FILE_ID**

Từ link: `https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing`

FILE_ID là: `1a2b3c4d5e6f7g8h9i0j`

**Lưu lại FILE_ID của 2 files!**

---

## 🐍 BƯỚC 2: CẬP NHẬT PYTHON CODE

### **2.1. Crop Recommendation Service**

File: `E:\DoAnJ2EE\RecommentCrop\crop_recommendation_service.py`

**Thêm vào đầu file (sau imports):**

```python
import os
import requests

MODEL_PATH = 'RandomForest_RecomentTree.pkl'
GDRIVE_FILE_ID = 'PASTE_FILE_ID_CUA_BAN_VAO_DAY'  # ← Thay bằng FILE_ID thực

def download_model_from_gdrive():
    """Download model from Google Drive if not exists"""
    if os.path.exists(MODEL_PATH):
        logger.info(f"✓ Model already exists: {MODEL_PATH}")
        return True
    
    logger.info("📥 Downloading model from Google Drive...")
    url = f"https://drive.google.com/uc?export=download&id={GDRIVE_FILE_ID}"
    
    try:
        # Download
        response = requests.get(url, stream=True)
        
        # Handle Google Drive warning for large files
        if 'download_warning' in response.text:
            # Get confirmation token
            for key, value in response.cookies.items():
                if key.startswith('download_warning'):
                    url = f"{url}&confirm={value}"
                    response = requests.get(url, stream=True)
                    break
        
        # Save file
        with open(MODEL_PATH, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        logger.info(f"✅ Model downloaded successfully: {MODEL_PATH}")
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to download model: {str(e)}")
        return False
```

**Cập nhật hàm `load_model()`:**

```python
def load_model():
    """Load RandomForest model từ file pkl"""
    global model
    
    # Download model if not exists
    if not download_model_from_gdrive():
        logger.error("Cannot download model from Google Drive")
        return False
    
    try:
        # ... existing code to load model ...
```

---

### **2.2. Pest Disease Service**

File: `E:\DoAnJ2EE\PestAndDisease\pest_disease_service.py`

**Thêm vào đầu file:**

```python
import os
import requests

MODEL_PATH = 'best_vit_wheat_model_4classes.pth'
GDRIVE_FILE_ID = 'PASTE_FILE_ID_CUA_BAN_VAO_DAY'  # ← Thay bằng FILE_ID thực

def download_model_from_gdrive():
    """Download model from Google Drive if not exists"""
    if os.path.exists(MODEL_PATH):
        logger.info(f"✓ Model already exists: {MODEL_PATH}")
        return True
    
    logger.info("📥 Downloading model from Google Drive...")
    url = f"https://drive.google.com/uc?export=download&id={GDRIVE_FILE_ID}"
    
    try:
        response = requests.get(url, stream=True)
        
        # Handle large file warning
        if 'download_warning' in response.text:
            for key, value in response.cookies.items():
                if key.startswith('download_warning'):
                    url = f"{url}&confirm={value}"
                    response = requests.get(url, stream=True)
                    break
        
        with open(MODEL_PATH, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        logger.info(f"✅ Model downloaded successfully: {MODEL_PATH}")
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to download model: {str(e)}")
        return False
```

**Cập nhật hàm `load_model()`:**

```python
def load_model():
    """Load Vision Transformer model"""
    global model
    
    # Download model if not exists
    if not download_model_from_gdrive():
        logger.error("Cannot download model from Google Drive")
        return False
    
    try:
        # ... existing code to load model ...
```

---

## 📦 BƯỚC 3: CẬP NHẬT REQUIREMENTS.TXT

Thêm `requests` vào cả 2 files:

**File: `RecommentCrop/requirements.txt`**
```
requests
flask
flask-cors
numpy
scikit-learn==1.2.2
```

**File: `PestAndDisease/requirements.txt`**
```
requests
flask
flask-cors
pillow
torch
torchvision
```

---

## ✅ BƯỚC 4: TEST LOCAL

### **4.1. Xóa model file local (để test download)**

```bash
del RecommentCrop\RandomForest_RecomentTree.pkl
del PestAndDisease\best_vit_wheat_model_4classes.pth
```

### **4.2. Chạy service**

```bash
# Test Crop Service
cd RecommentCrop
python crop_recommendation_service.py
```

**Kết quả mong đợi:**
```
📥 Downloading model from Google Drive...
✅ Model downloaded successfully: RandomForest_RecomentTree.pkl
✓ Model đã được load thành công!
```

Làm tương tự cho Pest Service.

---

## 🚀 BƯỚC 5: DEPLOY

Sau khi test local OK:

```bash
# Commit changes
git add .
git commit -m "Add model download from Google Drive"

# Push
git push
```

Deploy lên Render sẽ tự động download model khi start!

---

## 🔍 TROUBLESHOOTING

### **Lỗi: "403 Forbidden" khi download**

**Nguyên nhân:** Link không public

**Giải pháp:**
1. Vào Google Drive
2. Click chuột phải file → Share
3. Đảm bảo "Anyone with the link" → **Viewer**

---

### **Lỗi: Download file rỗng (0 bytes)**

**Nguyên nhân:** Google Drive trả về HTML warning thay vì file

**Giải pháp:** Code trên đã xử lý (check `download_warning`)

Nếu vẫn lỗi, dùng `gdown` library:

```bash
pip install gdown
```

```python
import gdown

def download_model_from_gdrive():
    if os.path.exists(MODEL_PATH):
        return True
    
    url = f'https://drive.google.com/uc?id={GDRIVE_FILE_ID}'
    gdown.download(url, MODEL_PATH, quiet=False)
    return os.path.exists(MODEL_PATH)
```

Thêm vào `requirements.txt`:
```
gdown
```

---

## 📊 KẾT QUẢ

✅ Model files KHÔNG push lên Git  
✅ Git push nhanh (<10 MB)  
✅ Service tự download model khi deploy  
✅ Hoạt động bình thường trên Render/Railway  

**Chi phí Google Drive:** MIỄN PHÍ (15 GB free)

---

**Nếu cần hỗ trợ thêm, hỏi tôi!** 🚀

