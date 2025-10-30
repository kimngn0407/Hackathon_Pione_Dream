# 🚂 HƯỚNG DẪN DEPLOY AI CHATBOT LÊN RAILWAY

## ❌ LỖI: "GOOGLE_API_KEY references Secret which does not exist"

**Nguyên nhân:** Railway không tìm thấy environment variable `GOOGLE_API_KEY`

---

## ✅ GIẢI PHÁP: THÊM GOOGLE_API_KEY VÀO RAILWAY

---

## **BƯỚC 1: LẤY GOOGLE API KEY** 🔑

### 1.1. Truy cập Google AI Studio

1. Mở trình duyệt: **https://aistudio.google.com/**
2. Đăng nhập bằng **tài khoản Google**

### 1.2. Tạo API Key

1. Nhìn **sidebar bên trái**
2. Click **"Get API Key"** hoặc **"API Keys"**
3. Click **"Create API Key"**
4. Chọn:
   - ✅ **"Create API key in new project"** (Khuyến nghị)
   - Hoặc chọn project có sẵn
5. Click **"Create"**

### 1.3. Copy API Key

1. Popup hiện ra với API Key (dạng: `AIzaSy...`)
2. **Copy API Key**
3. ⚠️ **LƯU Ý:**
   - API Key chỉ hiển thị **MỘT LẦN**
   - Lưu vào notepad
   - **KHÔNG chia sẻ công khai**

---

## **BƯỚC 2: THÊM VÀO RAILWAY** 🚀

### 2.1. Vào Railway Dashboard

1. Mở **https://railway.app/**
2. Đăng nhập
3. Click vào **Project** của bạn
4. Click vào service **AI_SmartFarm_CHatbot**

### 2.2. Thêm Environment Variable

1. Click tab **"Variables"** (hoặc Settings → Variables)
2. Click **"+ Add Variable"** hoặc **"New Variable"**

### 2.3. Nhập thông tin

**Tên biến (Variable Name):**
```
GOOGLE_API_KEY
```

**Giá trị (Value):**
```
AIzaSy...  ← Paste API Key bạn vừa copy
```

3. Click **"Add"** hoặc **"Save"**

### 2.4. (Optional) Thêm NODE_ENV

Thêm biến thứ 2:

**Variable Name:**
```
NODE_ENV
```

**Value:**
```
production
```

### 2.5. Verify

Sau khi thêm, bạn sẽ thấy:

```
✓ GOOGLE_API_KEY = AIzaSy••••••••••••• (ẩn một phần)
✓ NODE_ENV = production
```

---

## **BƯỚC 3: DEPLOY** 🎯

### Railway sẽ TỰ ĐỘNG REDEPLOY

Sau khi thêm/sửa environment variable, Railway tự động:

1. Trigger build mới
2. Inject environment variables
3. Deploy

**Chờ 2-3 phút**, kiểm tra tab **"Deployments"**:

```
✓ Building...
✓ Deploying...
✓ Live! 🎉
```

### (Optional) Manual Redeploy

Nếu không tự động:

1. Click tab **"Deployments"**
2. Click **"Redeploy"** hoặc **"New Deployment"**

---

## **BƯỚC 4: KIỂM TRA LOGS** 📋

1. Click tab **"Logs"** hoặc **"View Logs"**
2. Tìm dòng:

```
✓ Server listening on http://localhost:9002
✓ Ready in ...ms
```

3. **KHÔNG CÒN LỖI:**
   - ❌ `GOOGLE_API_KEY is not set`
   - ❌ `Secret "google-api-key" does not exist`

---

## **BƯỚC 5: TEST CHATBOT** 🤖

### 5.1. Lấy Public URL

Trong Railway:
- Service **AI_SmartFarm_CHatbot**
- Tab **"Settings"**
- Phần **"Domains"** hoặc **"Public Networking"**
- Copy URL (dạng: `https://xxx.up.railway.app`)

### 5.2. Mở trong trình duyệt

1. Paste URL vào trình duyệt
2. Trang chatbot sẽ load
3. Gửi tin nhắn test: **"Xin chào"**
4. Chatbot trả lời → **SUCCESS!** ✅

---

## 🔍 **TÓM TẮT NHANH**

```bash
# 1. LẤY API KEY
https://aistudio.google.com/ → Create API Key → Copy

# 2. VÀO RAILWAY
Railway → AI_SmartFarm_CHatbot → Variables

# 3. THÊM VARIABLE
Name: GOOGLE_API_KEY
Value: AIzaSy... (paste)

# 4. SAVE
→ Tự động redeploy

# 5. KIỂM TRA
Logs → Không còn lỗi
URL → Chatbot hoạt động ✅
```

---

## 🐛 **TROUBLESHOOTING**

### ❌ Lỗi: "API Key invalid"

**Nguyên nhân:** API Key sai hoặc bị vô hiệu hóa

**Fix:**
1. Vào https://aistudio.google.com/
2. Kiểm tra API Key
3. Tạo key mới nếu cần
4. Cập nhật trên Railway

---

### ❌ Lỗi: "Quota exceeded"

**Nguyên nhân:** Free tier hết quota

**Fix:**
- Đợi ngày mai (quota reset mỗi ngày)
- Tạo Google Account mới → key mới
- Nâng cấp lên paid tier

---

### ❌ Railway vẫn báo "Secret not found"

**Nguyên nhân:** Railway đang tìm "Secret" thay vì "Variable"

**Fix 1:** Dùng Variables (đã làm ở trên) ✅

**Fix 2:** Thêm vào Secrets:
1. Railway → Settings → Secrets (không phải Variables)
2. Add Secret:
   - Name: `google-api-key`
   - Value: (API Key)

---

### ❌ Build thành công nhưng không chạy

**Kiểm tra:**
1. Logs có lỗi gì không?
2. Port có đúng không? (Railway tự động set `$PORT`)
3. Start command có đúng không?

**Fix:** Update `package.json`:
```json
{
  "scripts": {
    "start": "next start -p ${PORT:-9002}"
  }
}
```

---

## 📚 **TÀI LIỆU THAM KHẢO**

- Google AI Studio: https://aistudio.google.com/
- Railway Docs: https://docs.railway.app/
- Genkit Docs: https://firebase.google.com/docs/genkit
- Next.js Deployment: https://nextjs.org/docs/deployment

---

## ✅ **CHECKLIST DEPLOYMENT**

- [ ] Tạo Google API Key
- [ ] Copy API Key vào notepad
- [ ] Vào Railway Dashboard
- [ ] Chọn service AI_SmartFarm_CHatbot
- [ ] Click Variables tab
- [ ] Add: GOOGLE_API_KEY = (paste key)
- [ ] Add: NODE_ENV = production (optional)
- [ ] Save
- [ ] Chờ auto redeploy (2-3 phút)
- [ ] Kiểm tra Logs → Không còn lỗi
- [ ] Lấy Public URL
- [ ] Test chatbot → Trả lời tin nhắn

---

**🎉 DONE! Chatbot đã hoạt động!**

