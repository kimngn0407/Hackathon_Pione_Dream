# ⚡ DEPLOY NHANH LÊN HUGGING FACE (5 PHÚT)

## 🎯 CÁC BƯỚC

### 1. Tạo Space (2 phút)
```
→ https://huggingface.co/spaces
→ "Create new Space"
→ Name: pest-disease-detection
→ SDK: Docker
→ Hardware: CPU basic (Free)
→ Create
```

### 2. Clone Space (1 phút)
```bash
git clone https://huggingface.co/spaces/YOUR-USERNAME/pest-disease-detection
cd pest-disease-detection
```

### 3. Copy Files (1 phút)
```bash
# Copy từ PestAndDisease/
- Dockerfile
- pest_disease_service.py
- requirements-cpu.txt
- best_vit_wheat_model_4classes.pth
- README_HUGGINGFACE.md → rename to README.md
```

### 4. Push (1 phút)
```bash
git add .
git commit -m "Deploy Pest Detection API"
git push
```

### 5. Đợi Build (5-10 phút)
→ Check logs tại Space
→ Khi "Running" → Done! ✅

---

## 🔗 URL

```
https://YOUR-USERNAME-pest-disease-detection.hf.space
```

---

## ✅ Test

```bash
curl https://YOUR-URL.hf.space/health
```

---

**Chi tiết đầy đủ**: Xem `DEPLOY_HUGGINGFACE.md`

