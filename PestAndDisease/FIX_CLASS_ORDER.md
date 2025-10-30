# 🔧 SỬA THỨ TỰ CLASS - Smut và Septoria bị đảo

## ❗ VẤN ĐỀ

Model đang dự đoán **LỘN** giữa **Smut** (Class 2) và **Septoria** (Class 3).

## 🔍 KIỂM TRA TRƯỚC KHI SỬA

### Bước 1: Chuẩn bị ảnh test

Đặt **ít nhất 2 ảnh** vào folder `PestAndDisease/`:
- 1 ảnh **Smut** (bệnh than - đen hạt/bông)
- 1 ảnh **Septoria** (bệnh đốm lá - đốm vàng/nâu)

### Bước 2: Chạy script test

```bash
cd E:\DoAnJ2EE\PestAndDisease
TEST_CLASS_ORDER.bat
```

Script sẽ:
1. Load model
2. Dự đoán từng ảnh
3. Hiện **4 khả năng mapping** khác nhau
4. Bạn so sánh và chọn mapping ĐÚNG

---

## 🛠️ CÁCH SỬA

### **CÁCH 1: Đảo Class 2 và 3** (Khuyến nghị)

Nếu kết quả test cho thấy cần đảo Class 2 và 3:

**Thay đổi trong `pest_disease_service.py`:**

```python
# TỪ:
CLASS_NAMES = {
    0: 'Aphid',
    1: 'Blast',
    2: 'Smut',       # ← Sai
    3: 'Septoria'    # ← Sai
}

CLASS_NAMES_VI = {
    0: 'Rệp (hại lúa mì)',
    1: 'Bệnh đạo ôn (cháy lá/cổ bông)',
    2: 'Bệnh than (đen hạt/bông)',         # ← Sai
    3: 'Bệnh đốm lá Septoria'              # ← Sai
}

# THÀNH:
CLASS_NAMES = {
    0: 'Aphid',
    1: 'Blast',
    2: 'Septoria',   # ← Đảo
    3: 'Smut'        # ← Đảo
}

CLASS_NAMES_VI = {
    0: 'Rệp (hại lúa mì)',
    1: 'Bệnh đạo ôn (cháy lá/cổ bông)',
    2: 'Bệnh đốm lá Septoria',             # ← Đảo
    3: 'Bệnh than (đen hạt/bông)'          # ← Đảo
}
```

### **CÁCH 2: Thử các mapping khác**

Nếu không chỉ là Smut/Septoria bị đảo, xem kết quả test và chọn mapping phù hợp.

---

## ✅ SAU KHI SỬA

### 1. **RESTART Python Service**

```bash
# Tắt service hiện tại (Ctrl+C)
# Rồi chạy lại:
cd E:\DoAnJ2EE\PestAndDisease
MANUAL_RUN.bat
```

### 2. **Test API**

```bash
curl -X POST http://localhost:5001/api/detect ^
  -F "file=@path/to/smut_image.jpg"
```

Kết quả phải là **Smut** (hoặc "Bệnh than").

### 3. **Test trên Frontend**

1. Vào **http://localhost:3000** → **Pest Detection**
2. Upload ảnh Smut → Kết quả phải là "Bệnh than"
3. Upload ảnh Septoria → Kết quả phải là "Bệnh đốm lá Septoria"

---

## 🎯 MAPPING REFERENCE

### Nếu model train theo alphabet order:

```
0: Aphid
1: Blast
2: Septoria    (S đứng trước)
3: Smut        (S đứng sau)
```

### Nếu model train theo severity:

```
0: Aphid (côn trùng)
1: Blast (nguy hiểm nhất)
2: Smut (nguy hiểm vừa)
3: Septoria (ít nguy hiểm hơn)
```

### Nếu model train theo file folder order:

Phụ thuộc vào tên folder khi train.

---

## 📝 GHI CHÚ

- **Không sửa code nếu chưa chạy test!**
- Model có thể có thứ tự class khác hẳn
- Nên chạy `TEST_CLASS_ORDER.bat` với nhiều ảnh test

---

**Sau khi có kết quả test, báo cho tôi và tôi sẽ sửa code chính xác!**

