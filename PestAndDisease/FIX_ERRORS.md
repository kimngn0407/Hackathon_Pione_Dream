# 🔧 FIX ERRORS - Pest and Disease Detection

## ❌ LỖI: "Không thể khởi động service do lỗi load model"

### NGUYÊN NHÂN THƯỜNG GẶP:

1. **Chưa cài đặt packages** (PyTorch, timm)
2. **Model file bị lỗi hoặc không đúng format**
3. **Virtual environment chưa được tạo**
4. **Version không tương thích**

---

## ✅ GIẢI PHÁP NHANH

### Bước 1: Chạy FIX_AND_RUN.bat

```bash
cd E:\DoAnJ2EE\PestAndDisease
FIX_AND_RUN.bat
```

Script này sẽ:
- ✅ Tạo virtual environment
- ✅ Cài tất cả packages cần thiết
- ✅ Test model load tự động
- ✅ Báo lỗi cụ thể nếu có

**Chờ 5-10 phút** cho quá trình cài đặt.

### Bước 2: Nếu vẫn lỗi, kiểm tra:

**a) Model file có đúng không:**
```bash
cd E:\DoAnJ2EE\PestAndDisease
dir best_vit_wheat_model_4classes.pth
```

Kích thước phải ~327MB (343,270,762 bytes)

**b) Packages đã cài chưa:**
```bash
cd E:\DoAnJ2EE\PestAndDisease
.venv\Scripts\pip.exe list
```

Cần có:
- torch
- torchvision
- timm
- flask
- flask-cors
- pillow
- numpy

**c) Test model thủ công:**
```bash
cd E:\DoAnJ2EE\PestAndDisease
.venv\Scripts\activate
python debug_model.py
```

---

## 🐛 CÁC LỖI CỤ THỂ VÀ CÁCH SỬA

### Lỗi 1: "Model file not found"

**Nguyên nhân:** File `best_vit_wheat_model_4classes.pth` không có trong thư mục

**Giải pháp:**
```
1. Kiểm tra file có trong E:\DoAnJ2EE\PestAndDisease\
2. Nếu không có, copy file model vào đúng thư mục này
3. Kiểm tra tên file chính xác (phân biệt hoa/thường)
```

### Lỗi 2: "No module named 'torch'"

**Nguyên nhân:** PyTorch chưa được cài

**Giải pháp:**
```bash
cd E:\DoAnJ2EE\PestAndDisease
.venv\Scripts\activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

### Lỗi 3: "No module named 'timm'"

**Nguyên nhân:** Package timm chưa được cài

**Giải pháp:**
```bash
cd E:\DoAnJ2EE\PestAndDisease
.venv\Scripts\activate
pip install timm
```

### Lỗi 4: "Error loading checkpoint"

**Nguyên nhân:** Model file có thể bị corrupt hoặc không đúng format

**Giải pháp:**
```bash
# Chạy debug để xem chi tiết
cd E:\DoAnJ2EE\PestAndDisease
.venv\Scripts\python.exe debug_model.py
```

Nếu vẫn lỗi, model file có thể bị hỏng. Cần model file mới.

### Lỗi 5: "RuntimeError: Error(s) in loading state_dict"

**Nguyên nhân:** Model architecture không khớp với weights

**Giải pháp:** Sửa code trong `pest_disease_service.py`:

```python
# Thay vì:
model.load_state_dict(checkpoint['model_state_dict'])

# Dùng:
model.load_state_dict(checkpoint['model_state_dict'], strict=False)
```

### Lỗi 6: "Port 5001 already in use"

**Nguyên nhân:** Service đã chạy hoặc port bị chiếm

**Giải pháp:**
```bash
# Tìm process
netstat -ano | findstr :5001

# Kill process
taskkill /PID <PID> /F

# Hoặc đổi port trong pest_disease_service.py
app.run(host='0.0.0.0', port=5002, debug=True)
```

### Lỗi 7: "Virtual environment not found"

**Nguyên nhân:** Chưa tạo .venv

**Giải pháp:**
```bash
cd E:\DoAnJ2EE\PestAndDisease
python -m venv .venv
```

---

## 🔍 DEBUGGING STEPS

### Step 1: Kiểm tra Python
```bash
python --version
```
Cần Python >= 3.8

### Step 2: Kiểm tra model file
```bash
cd E:\DoAnJ2EE\PestAndDisease
dir best_vit_wheat_model_4classes.pth
```
Size phải ~327MB

### Step 3: Tạo venv
```bash
python -m venv .venv
```

### Step 4: Cài packages
```bash
.venv\Scripts\activate
pip install flask flask-cors pillow numpy
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install timm
```

### Step 5: Test model
```bash
python debug_model.py
```

### Step 6: Start service
```bash
python pest_disease_service.py
```

---

## 📊 CHECKLIST DEBUG

- [ ] Python version >= 3.8: `python --version`
- [ ] Model file exists: `dir best_vit_wheat_model_4classes.pth`
- [ ] Model file size ~327MB
- [ ] Virtual environment exists: `dir .venv`
- [ ] Flask installed: `.venv\Scripts\pip list | findstr flask`
- [ ] PyTorch installed: `.venv\Scripts\pip list | findstr torch`
- [ ] timm installed: `.venv\Scripts\pip list | findstr timm`
- [ ] debug_model.py runs OK
- [ ] Port 5001 not in use: `netstat -ano | findstr :5001`

---

## 🚀 QUICK FIX COMMANDS

```bash
# All-in-one fix
cd E:\DoAnJ2EE\PestAndDisease
FIX_AND_RUN.bat

# Manual fix
cd E:\DoAnJ2EE\PestAndDisease
python -m venv .venv
.venv\Scripts\activate
pip install flask flask-cors pillow numpy torch torchvision timm
python debug_model.py
python pest_disease_service.py
```

---

## 📞 NẾU VẪN KHÔNG CHẠY ĐƯỢC

Cung cấp thông tin sau:
1. Output của `python --version`
2. Output của `debug_model.py`
3. Full error message từ `pest_disease_service.py`
4. Output của `.venv\Scripts\pip list`

---

## ✅ KHI MỌI THỨ OK

Bạn sẽ thấy:

```
✓ Model loaded successfully!
Type: Vision Transformer (ViT)
Classes: 4

Đang khởi động Pest and Disease Detection Service...
API sẽ chạy tại: http://localhost:5001
* Running on http://0.0.0.0:5001
```

**Service đã sẵn sàng!** 🌾🔍

---

**Scripts hữu ích:**
- `FIX_AND_RUN.bat` - Sửa tất cả và chạy
- `TEST_SIMPLE.bat` - Test packages
- `debug_model.py` - Debug chi tiết
- `start_service.bat` - Start service

**Good luck! 🚀**

