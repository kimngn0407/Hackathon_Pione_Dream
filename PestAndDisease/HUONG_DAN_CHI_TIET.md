# 🚀 HƯỚNG DẪN CHẠY PEST AND DISEASE DETECTION - CHI TIẾT

## 📋 Mục lục
1. [Kiểm tra yêu cầu hệ thống](#1-kiểm-tra-yêu-cầu-hệ-thống)
2. [Cài đặt môi trường](#2-cài-đặt-môi-trường)
3. [Chạy service](#3-chạy-service)
4. [Xử lý lỗi](#4-xử-lý-lỗi)

---

## 1. Kiểm tra yêu cầu hệ thống

### ✅ Cần có:
- ✓ Python 3.8 trở lên
- ✓ Khoảng 1-2GB RAM trống
- ✓ Khoảng 2GB ổ cứng trống

### 🔍 Kiểm tra Python:
```bash
python --version
```
Kết quả mong đợi: `Python 3.8.x` hoặc cao hơn

---

## 2. Cài đặt môi trường

### 🎯 CÁCH 1: Tự động (KHUYẾN NGHỊ)

**Chạy file `FIX_NOW.bat`** (double-click hoặc qua CMD):
```bash
FIX_NOW.bat
```

File này sẽ tự động:
- ✓ Tạo virtual environment (nếu chưa có)
- ✓ Cài đặt tất cả dependencies
- ✓ Test load model
- ✓ Báo kết quả

### 🛠️ CÁCH 2: Thủ công từng bước

#### Bước 2.1: Mở Command Prompt
```bash
# Di chuyển vào thư mục
cd E:\DoAnJ2EE\PestAndDisease
```

#### Bước 2.2: Tạo virtual environment (nếu chưa có)
```bash
python -m venv .venv
```

#### Bước 2.3: Kích hoạt virtual environment
```bash
.venv\Scripts\activate
```
👉 Sau lệnh này, bạn sẽ thấy `(.venv)` ở đầu dòng lệnh

#### Bước 2.4: Cập nhật pip
```bash
python -m pip install --upgrade pip
```

#### Bước 2.5: Cài đặt dependencies
```bash
# Cài Flask, Pillow, NumPy
pip install flask flask-cors pillow numpy

# Cài PyTorch (CPU version - nhẹ hơn)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Cài timm (PyTorch Image Models)
pip install timm
```

#### Bước 2.6: Kiểm tra cài đặt
```bash
python test_installation.py
```

Kết quả mong đợi:
```
✓ PyTorch: ĐÃ CÀI
✓ timm (PyTorch Image Models): ĐÃ CÀI
✓ Pillow: ĐÃ CÀI
✓ Flask: ĐÃ CÀI
✓ Flask-CORS: ĐÃ CÀI
✓ TẤT CẢ DEPENDENCIES ĐÃ CÀI ĐẶT!
```

---

## 3. Chạy service

### 🎯 CÁCH 1: Dùng script (Đơn giản)
```bash
start_service.bat
```

### 🛠️ CÁCH 2: Thủ công
```bash
# Đảm bảo đã activate venv
.venv\Scripts\activate

# Chạy service
python pest_disease_service.py
```

### ✅ Kết quả mong đợi:
```
========================================
🚀 PEST AND DISEASE DETECTION SERVICE
========================================
📂 Model Path: best_vit_wheat_model_4classes.pth
✓ Pest and Disease Detection Model loaded successfully!

 * Serving Flask app 'pest_disease_service'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
 * Running on http://[YOUR_IP]:5001
```

### 🧪 Test service:
Mở trình duyệt, truy cập: **http://localhost:5001/health**

Kết quả mong đợi:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu",
  "classes": 4
}
```

---

## 4. Xử lý lỗi

### ❌ Lỗi 1: "Module 'torch' not found"
**Nguyên nhân:** Chưa cài PyTorch

**Giải pháp:**
```bash
.venv\Scripts\activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

---

### ❌ Lỗi 2: "Module 'timm' not found"
**Nguyên nhân:** Chưa cài timm

**Giải pháp:**
```bash
.venv\Scripts\activate
pip install timm
```

---

### ❌ Lỗi 3: "Model file không tồn tại"
**Nguyên nhân:** File `best_vit_wheat_model_4classes.pth` bị mất

**Giải pháp:**
- Kiểm tra file có tồn tại không:
```bash
dir *.pth
```
- Nếu không có, phải copy lại file model vào thư mục này

---

### ❌ Lỗi 4: "Error loading model state_dict"
**Nguyên nhân:** Model architecture không khớp với checkpoint

**Giải pháp:** Chạy test để kiểm tra chi tiết:
```bash
.venv\Scripts\activate
python test_model_load.py
```

Script này sẽ:
- ✓ Kiểm tra file model
- ✓ Thử nhiều cách load model khác nhau
- ✓ Báo cáo chi tiết từng bước

---

### ❌ Lỗi 5: "Port 5001 already in use"
**Nguyên nhân:** Cổng 5001 đang được sử dụng

**Giải pháp 1:** Tắt service đang chạy trên port 5001

**Giải pháp 2:** Đổi port trong `pest_disease_service.py`:
```python
# Dòng cuối cùng, đổi 5001 thành port khác (ví dụ: 5002)
app.run(host='0.0.0.0', port=5002, debug=True)
```

---

## 📞 Hỗ trợ

### 🔍 Debug từng bước:
```bash
# 1. Kiểm tra cài đặt
python test_installation.py

# 2. Kiểm tra load model
python test_model_load.py

# 3. Chạy service
python pest_disease_service.py
```

### 📝 File quan trọng:
- `pest_disease_service.py` - Service chính
- `best_vit_wheat_model_4classes.pth` - Model AI (327MB)
- `requirements.txt` - Danh sách dependencies
- `start_service.bat` - Script khởi động nhanh
- `FIX_NOW.bat` - Script sửa lỗi tự động

---

## 🎯 Tóm tắt lệnh quan trọng

```bash
# Di chuyển vào thư mục
cd E:\DoAnJ2EE\PestAndDisease

# Kích hoạt môi trường
.venv\Scripts\activate

# Kiểm tra cài đặt
python test_installation.py

# Test load model
python test_model_load.py

# Chạy service
python pest_disease_service.py
```

---

**✅ Sau khi service chạy thành công, bạn có thể:**
1. Test qua browser: `http://localhost:5001/health`
2. Gọi API từ Java backend
3. Tích hợp vào React frontend

**🎉 Chúc bạn thành công!**

