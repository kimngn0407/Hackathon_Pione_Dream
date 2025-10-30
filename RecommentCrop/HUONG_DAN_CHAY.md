# 🚀 HƯỚNG DẪN CHẠY CROP RECOMMENDATION SERVICE

## 📋 YÊU CẦU

- ✅ Python 3.8+
- ✅ Virtual environment đã setup
- ✅ Đã cài đặt dependencies

---

## 🎯 CÁCH 1: CHẠY NHANH (Dùng Script)

### Bước 1: Mở Command Prompt (CMD)
Nhấn `Win + R`, gõ `cmd`, Enter

### Bước 2: Chạy script
```bash
cd E:\DoAnJ2EE\RecommentCrop
start_service.bat
```

**Kết quả mong đợi:**
```
✓ Virtual environment activated
✓ Service starting...
 * Running on http://0.0.0.0:5000
```

---

## 🛠️ CÁCH 2: CHẠY THỦ CÔNG (Từng Bước)

### Bước 1: Mở CMD
```bash
Win + R → gõ "cmd" → Enter
```

### Bước 2: Di chuyển vào thư mục
```bash
cd E:\DoAnJ2EE\RecommentCrop
```

### Bước 3: Kích hoạt Virtual Environment
```bash
.venv\Scripts\activate
```

**Sau lệnh này, bạn sẽ thấy `(.venv)` ở đầu dòng:**
```
(.venv) E:\DoAnJ2EE\RecommentCrop>
```

### Bước 4: Chạy Python Service
```bash
python crop_recommendation_service.py
```

**Kết quả thành công:**
```
INFO:__main__:✓ Model đã được load thành công!
INFO:__main__:Model type: <class 'sklearn.ensemble._forest.RandomForestClassifier'>
INFO:__main__:✓ Model có method predict()
INFO:__main__:Đang khởi động Crop Recommendation Service...
INFO:__main__:API sẽ chạy tại: http://localhost:5000

Endpoints available:
  - GET  /health                    - Health check
  - POST /api/recommend-crop        - Gợi ý cây trồng (single)
  - POST /api/recommend-crop/batch  - Gợi ý cây trồng (batch)
  - GET  /api/crops                 - Danh sách cây trồng

 * Serving Flask app 'crop_recommendation_service'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### Bước 5: Kiểm tra Service đang chạy
Mở trình duyệt, truy cập: **http://localhost:5000/health**

Hoặc mở CMD mới:
```bash
curl http://localhost:5000/health
```

**Kết quả:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

---

## 🧪 TEST SERVICE

### Test 1: Health Check
```bash
curl http://localhost:5000/health
```

### Test 2: Gợi ý cây trồng
Mở CMD mới (giữ service chạy ở CMD cũ):
```bash
curl -X POST http://localhost:5000/api/recommend-crop ^
  -H "Content-Type: application/json" ^
  -d "{\"temperature\": 25, \"humidity\": 80, \"soil_moisture\": 45}"
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "recommended_crop": "Lúa",
  "crop_name_en": "rice",
  "confidence": 0.95,
  "input_data": {
    "temperature": 25,
    "humidity": 80,
    "soil_moisture": 45
  }
}
```

### Test 3: Danh sách cây trồng
```bash
curl http://localhost:5000/api/crops
```

---

## 🐛 XỬ LÝ LỖI

### Lỗi 1: "python: command not found"
**Nguyên nhân:** Python chưa cài hoặc chưa add vào PATH

**Giải pháp:**
```bash
# Kiểm tra Python
python --version

# Nếu không có, download tại:
# https://www.python.org/downloads/
```

### Lỗi 2: ".venv is not recognized"
**Nguyên nhân:** Chưa tạo virtual environment

**Giải pháp:**
```bash
# Tạo virtual environment
python -m venv .venv

# Kích hoạt
.venv\Scripts\activate

# Cài dependencies
pip install -r requirements.txt
```

### Lỗi 3: "ModuleNotFoundError: No module named 'sklearn'"
**Nguyên nhân:** Chưa cài dependencies

**Giải pháp:**
```bash
# Đảm bảo đã activate venv
.venv\Scripts\activate

# Cài lại dependencies
pip install -r requirements.txt
```

### Lỗi 4: "Port 5000 is already in use"
**Nguyên nhân:** Service đang chạy hoặc port bị chiếm

**Giải pháp 1:** Tắt service cũ
```bash
# Tìm process đang dùng port 5000
netstat -ano | findstr :5000

# Kill process (PID là số cuối cùng)
taskkill /PID <PID> /F
```

**Giải pháp 2:** Đổi port trong file `crop_recommendation_service.py`
```python
# Dòng cuối cùng, đổi 5000 thành port khác
app.run(host='0.0.0.0', port=5001, debug=True)
```

### Lỗi 5: "Model file không tồn tại"
**Nguyên nhân:** Thiếu file model

**Giải pháp:**
```bash
# Kiểm tra file model có tồn tại không
dir RandomForest_RecomentTree.pkl

# Nếu không có, cần copy file model vào thư mục này
```

---

## 🔄 DỪNG SERVICE

Để dừng service:
1. Vào CMD đang chạy service
2. Nhấn `Ctrl + C`
3. Gõ `Y` hoặc nhấn Enter

---

## 📊 KIỂM TRA LOGS

Service sẽ hiển thị logs trong CMD:

```
INFO:__main__:Calling ML API for crop recommendation: Temperature=25, Humidity=80, SoilMoisture=45
INFO:__main__:✓ Model đã được load thành công!
```

Nếu có lỗi, sẽ hiển thị:
```
ERROR:__main__:Lỗi khi load model: ...
```

---

## 🎯 TÍCH HỢP VỚI HỆ THỐNG

### Sau khi Crop Recommendation chạy OK:

**Bước 1:** Chạy Spring Boot Backend
```bash
# CMD mới
cd E:\DoAnJ2EE\demoSmartFarm\demo
mvn spring-boot:run
```

**Bước 2:** Chạy React Frontend
```bash
# CMD mới nữa
cd E:\DoAnJ2EE\J2EE_Frontend
npm start
```

### Kiểm tra toàn bộ hệ thống:
1. ✅ Python service: http://localhost:5000/health
2. ✅ Spring Boot: http://localhost:8080/api/crop-recommendation/health
3. ✅ React: http://localhost:3000/crop-recommendation

---

## 💡 TIPS

### Tip 1: Giữ CMD mở
- KHÔNG đóng CMD đang chạy service
- Service sẽ dừng nếu đóng CMD

### Tip 2: Chạy ngầm (Background)
Nếu muốn chạy ngầm, dùng:
```bash
start /B python crop_recommendation_service.py
```

### Tip 3: Auto restart khi có lỗi
Service có `debug=True` nên sẽ tự restart khi edit code

### Tip 4: Check dependencies
```bash
.venv\Scripts\activate
pip list
```

Cần có:
- Flask
- numpy
- scikit-learn
- flask-cors

---

## 📝 CHECKLIST TRƯỚC KHI CHẠY

- [ ] ✅ Python đã cài (python --version)
- [ ] ✅ Virtual environment đã tạo (.venv folder)
- [ ] ✅ Dependencies đã cài (pip list)
- [ ] ✅ File model tồn tại (RandomForest_RecomentTree.pkl)
- [ ] ✅ Port 5000 chưa bị chiếm
- [ ] ✅ Đã activate venv (thấy (.venv) ở đầu dòng)

---

## 🎉 THÀNH CÔNG KHI:

```
 * Running on http://127.0.0.1:5000
 * Running on http://[YOUR_IP]:5000

Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: XXX-XXX-XXX
```

→ Service đã sẵn sàng nhận request!

---

**Chúc bạn chạy thành công! 🚀**

