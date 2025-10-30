# 🐛 PEST AND DISEASE DETECTION - THÔNG TIN CÁC LỚP

Model phát hiện **4 loại sâu bệnh** trên lúa mì:

---

## 📊 DANH SÁCH CÁC LỚP

**⚠️ LƯU Ý:** Class 2 và 3 đã được đảo ngược để khớp với model thực tế!

### Class 0: **Aphid** (Rệp)
**Tên tiếng Việt:** Rệp (hại lúa mì)

**Mô tả:**
- Côn trùng nhỏ, hút nhựa cây
- Gây vàng lá, cong quăn lá
- Tiết ra chất ngọt thu hút kiến

**Triệu chứng:**
- Lá bị cong, xoăn
- Cây còi cọc, phát triển chậm
- Có côn trùng nhỏ màu xanh/đen trên lá

**Xử lý:**
- Thuốc trừ sâu sinh học (neem oil)
- Thuốc hóa học (imidacloprid, thiamethoxam)
- Bẫy dính màu vàng
- Khuyến khích thiên địch (bọ rùa, ong ký sinh)

---

### Class 1: **Blast** (Bệnh đạo ôn)
**Tên tiếng Việt:** Bệnh đạo ôn (cháy lá / cháy cổ bông)

**Mô tả:**
- Do nấm *Magnaporthe oryzae*
- Bệnh nguy hiểm nhất của lúa
- Lây lan nhanh trong điều kiện ẩm

**Triệu chứng:**
- Vết đốm hình thoi trên lá
- Màu nâu xám ở giữa, viền sẫm
- Lá khô cháy từ đỉnh xuống
- Cổ bông gãy đổ

**Xử lý:**
- Fungicide: Tricyclazole, Isoprothiolane
- Cắt bỏ phần bị bệnh
- Cải thiện thoát nước
- Tăng kali, giảm đạm

---

### Class 2: **Septoria** (Bệnh đốm lá Septoria) ⚠️ ĐÃ ĐẢO
**Tên tiếng Việt:** Bệnh đốm lá do nấm Septoria

**Mô tả:**
- Do nấm *Septoria tritici*
- Phổ biến trên lúa mì
- Phát triển mạnh khi ẩm ướt

**Triệu chứng:**
- Đốm nhỏ màu vàng/nâu trên lá
- Đốm dần mở rộng, có viền vàng
- Trung tâm đốm có chấm đen nhỏ (pycnidia)
- Lá khô từ dưới lên trên

**Xử lý:**
- Fungicide: Azoxystrobin, Epoxiconazole
- Loại bỏ tàn dư cây
- Tăng cường thoát khí
- Giảm mật độ trồng

---

### Class 3: **Smut** (Bệnh than) ⚠️ ĐÃ ĐẢO
**Tên tiếng Việt:** Bệnh than (đen hạt / đen bông)

**Mô tả:**
- Do nấm *Tilletia* hoặc *Ustilago*
- Hạt bị thay thế bởi bào tử đen
- Mùi hôi tanh đặc trưng

**Triệu chứng:**
- Hạt chuyển thành bột đen
- Bông lúa đen sì
- Hạt bị vỡ ra bột đen

**Xử lý:**
- Xử lý hạt giống (Carboxin, Thiram)
- Loại bỏ cây bị bệnh ngay
- Luân canh
- Đốt rơm rạ sau thu hoạch

---

## 🎯 LƯU Ý

### Model này:
- ✅ **CHỈ** phát hiện 4 loại sâu bệnh trên
- ❌ **KHÔNG** có class "Healthy" (Khỏe mạnh)
- ✅ Trained trên dataset lúa mì
- ✅ Input: Ảnh lá cây 224x224 pixels

### Độ chính xác:
- Tốt nhất với ảnh rõ nét, tập trung vào vùng bị bệnh
- Ánh sáng tự nhiên tốt hơn ánh sáng nhân tạo
- Nên chụp nhiều góc độ khác nhau

### Khuyến nghị:
- Nếu confidence < 70%: Chụp lại ảnh rõ hơn
- Nếu không chắc chắn: Tham khảo chuyên gia
- Theo dõi định kỳ để phát hiện sớm

---

**Ngày cập nhật:** 30/10/2025

