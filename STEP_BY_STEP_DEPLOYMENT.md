# 🎓 HƯỚNG DẪN DEPLOY TỪNG BƯỚC - CHO NGƯỜI MỚI HOÀN TOÀN

> **Mục tiêu:** Deploy toàn bộ Smart Farm System lên Internet để ai cũng có thể truy cập, KHÔNG CẦN kiến thức trước!

**⏱️ Thời gian dự kiến:** 2-3 giờ (lần đầu tiên)

---

## 📋 CHUẨN BỊ TRƯỚC KHI BẮT ĐẦU

### **Bạn cần có:**
- [ ] Máy tính có kết nối Internet
- [ ] Email (Gmail, Outlook, bất kỳ)
- [ ] Trình duyệt web (Chrome, Edge, Firefox)
- [ ] Code của bạn đã chạy được trên local (đã test)

### **KHÔNG CẦN:**
- ❌ Thẻ tín dụng (dùng free tier)
- ❌ Kiến thức Linux/Server
- ❌ Kinh nghiệm deploy trước đó

---

## 🎯 TỔNG QUAN: CHÚNG TA SẼ LÀM GÌ?

Chúng ta sẽ deploy **5 thành phần chính** (Database và Blockchain sẽ làm sau):

1. **Frontend React** → Vercel (Web interface)
2. **AI Chatbot** → Vercel (Chat widget)
3. **Backend Java** → Railway (API server)
4. **ML Crop Service** → Render (Python AI)
5. **ML Pest Service** → Render (Python AI)

**Kết quả:** 5 domain miễn phí để truy cập hệ thống!

---

## 📝 PHẦN 0: CHUẨN BỊ TÀI KHOẢN (15 phút)

### **Bước 0.1: Tạo tài khoản GitHub**

**GitHub là gì?** Nơi lưu code, giống Google Drive nhưng cho developer.

1. Mở trình duyệt, vào: **https://github.com**
2. Click nút **"Sign up"** (góc trên bên phải)
3. Nhập email của bạn → Click **"Continue"**
4. Tạo password (ít nhất 8 ký tự) → Click **"Continue"**
5. Nhập username (ví dụ: `john-doe`) → Click **"Continue"**
6. Làm theo hướng dẫn verify (có thể giải puzzle)
7. Click **"Create account"**
8. Vào email → Mở email từ GitHub → Click link xác nhận

✅ **Xong! Bạn đã có tài khoản GitHub**

---

### **Bước 0.2: Cài đặt Git trên máy**

**Git là gì?** Công cụ để đưa code lên GitHub.

#### **Trên Windows:**

1. Vào: **https://git-scm.com/download/win**
2. Click link download (file `.exe` sẽ tự động tải)
3. Mở file vừa tải → Click **"Next"** liên tục
4. Chọn **"Git Bash Here"** khi hỏi
5. Click **"Install"** → Đợi cài đặt xong → **"Finish"**

#### **Kiểm tra Git đã cài chưa:**

1. Mở **Command Prompt** (Nhấn `Windows + R` → gõ `cmd` → Enter)
2. Gõ lệnh:
```bash
git --version
```
3. Nếu hiện ra `git version 2.x.x` → **Thành công!** ✅

---

### **Bước 0.3: Tạo tài khoản Vercel**

**Vercel là gì?** Nơi host Frontend/Chatbot miễn phí.

1. Vào: **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Đăng nhập GitHub (nếu chưa)
5. Click **"Authorize Vercel"** (cho phép Vercel truy cập GitHub)

✅ **Xong! Bạn đã có tài khoản Vercel**

---

### **Bước 0.4: Tạo tài khoản Railway**

**Railway là gì?** Nơi host Backend Java miễn phí.

1. Vào: **https://railway.app**
2. Click **"Login"** (góc trên bên phải)
3. Click **"Login with GitHub"**
4. Click **"Authorize Railway"**

✅ **Xong! Bạn đã có tài khoản Railway**

---

### **Bước 0.5: Tạo tài khoản Render**

**Render là gì?** Nơi host Python ML services miễn phí.

1. Vào: **https://render.com**
2. Click **"Get Started"**
3. Click **"GitHub"**
4. Click **"Authorize Render"**

✅ **Xong! Bạn đã có tài khoản Render**

---

## 🚀 PHẦN 1: PUSH CODE LÊN GITHUB (20 phút)

### **Bước 1.1: Mở Git Bash trong thư mục dự án**

1. Mở File Explorer → Vào thư mục `E:\DoAnJ2EE`
2. Click chuột phải trong thư mục (chỗ trống)
3. Chọn **"Git Bash Here"**
4. Một cửa sổ đen (terminal) sẽ mở ra

---

### **Bước 1.2: Cấu hình Git (chỉ làm 1 lần)**

Gõ từng lệnh sau (thay `your-email@gmail.com` và `Your Name`):

```bash
git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"
```

**Ví dụ:**
```bash
git config --global user.email "john@gmail.com"
git config --global user.name "John Doe"
```

---

### **Bước 1.3: Khởi tạo Git repository**

Gõ lệnh:

```bash
git init
```

Bạn sẽ thấy: `Initialized empty Git repository in E:/DoAnJ2EE/.git/`

✅ **Thành công!**

---

### **Bước 1.4: Thêm tất cả files vào Git**

```bash
git add .
```

**Lưu ý:** Có dấu chấm (`.`) ở cuối!

Lệnh này sẽ thêm TẤT CẢ files trong thư mục vào Git.

⏳ **Đợi 10-30 giây** (tùy số lượng files)

---

### **Bước 1.5: Commit (lưu) code**

```bash
git commit -m "Smart Farm - Ready for deployment"
```

Bạn sẽ thấy danh sách files được commit.

✅ **Thành công!**

---

### **Bước 1.6: Tạo repository trên GitHub**

1. Mở trình duyệt → Vào **https://github.com**
2. Click nút **"+"** (góc trên bên phải) → Chọn **"New repository"**
3. Điền thông tin:
   - **Repository name:** `SmartFarm` (hoặc tên bạn muốn)
   - **Description:** "Smart Farm IoT + AI System" (tùy chọn)
   - **Public** (chọn option này - QUAN TRỌNG!)
   - **KHÔNG** tick "Add a README file"
   - **KHÔNG** tick "Add .gitignore"
4. Click **"Create repository"**

---

### **Bước 1.7: Kết nối Git local với GitHub**

Trên trang GitHub vừa tạo, bạn sẽ thấy hướng dẫn. Copy lệnh có dạng:

```bash
git remote add origin https://github.com/YOUR-USERNAME/SmartFarm.git
```

**Thay `YOUR-USERNAME` bằng username GitHub của bạn!**

Ví dụ:
```bash
git remote add origin https://github.com/john-doe/SmartFarm.git
```

Paste vào Git Bash → Enter

---

### **Bước 1.8: Đổi tên branch sang `main`**

```bash
git branch -M main
```

---

### **Bước 1.9: Push code lên GitHub**

```bash
git push -u origin main
```

**Lần đầu tiên**, GitHub sẽ yêu cầu đăng nhập:
1. Một cửa sổ pop-up sẽ hiện ra
2. Click **"Sign in with your browser"**
3. Đăng nhập GitHub
4. Click **"Authorize"**

⏳ **Đợi 2-5 phút** (tùy kích thước code và tốc độ mạng)

**Nếu thấy lỗi "large files":**
- Đó là do model files (`.pth`, `.pkl`) quá lớn
- Xem phần "Troubleshooting" cuối file

✅ **Khi thành công, refresh trang GitHub, bạn sẽ thấy code của mình!**

---

## 🎨 PHẦN 2: DEPLOY FRONTEND REACT (15 phút)

### **Bước 2.1: Vào Vercel Dashboard**

1. Mở trình duyệt → Vào **https://vercel.com**
2. Đăng nhập (nếu chưa)
3. Bạn sẽ thấy Dashboard

---

### **Bước 2.2: Tạo project mới**

1. Click **"Add New..."** (góc trên bên phải)
2. Chọn **"Project"**

---

### **Bước 2.3: Import GitHub repository**

1. Phần **"Import Git Repository"**, bạn sẽ thấy `SmartFarm`
   - Nếu **KHÔNG** thấy: Click **"Adjust GitHub App Permissions"** → Cho phép Vercel truy cập repo
2. Click **"Import"** bên cạnh `SmartFarm`

---

### **Bước 2.4: Configure project**

Vercel sẽ mở trang cấu hình:

1. **Project Name:** Để nguyên hoặc đổi (ví dụ: `smartfarm-frontend`)
2. **Framework Preset:** Vercel sẽ tự nhận `Create React App` - **Để nguyên**
3. **Root Directory:** Click **"Edit"** → Chọn `J2EE_Frontend` → **QUAN TRỌNG!**
4. **Build Command:** Để mặc định `npm run build`
5. **Output Directory:** Để mặc định `build`
6. **Install Command:** Để mặc định `npm install`

---

### **Bước 2.5: Environment Variables (Bỏ qua lúc này)**

Kéo xuống phần **"Environment Variables"** → **BỎ QUA** (sẽ thêm sau)

---

### **Bước 2.6: Deploy!**

1. Click nút **"Deploy"** (màu xanh to, ở dưới cùng)
2. Vercel bắt đầu build:
   - ⏳ **Đợi 3-5 phút** cho lần đầu
   - Bạn sẽ thấy log chạy (như code đang install packages)

---

### **Bước 2.7: Kiểm tra kết quả**

Khi build xong, bạn sẽ thấy:
- 🎉 **Confetti animation** (pháo hoa)
- Nút **"Visit"**

1. Click **"Visit"**
2. Frontend của bạn sẽ mở ra với URL dạng: `https://smartfarm-abc123.vercel.app`

✅ **Frontend đã LIVE!** (Tuy nhiên chưa kết nối Backend nên một số chức năng chưa hoạt động)

**📝 LƯU LẠI URL này!** Bạn sẽ cần nó sau!

---

## 🤖 PHẦN 3: DEPLOY AI CHATBOT (10 phút)

**Làm tương tự như Frontend, chỉ khác Root Directory!**

### **Bước 3.1-3.3:** Giống Phần 2 (Add New → Project → Import `SmartFarm`)

### **Bước 3.4: Configure project**

1. **Project Name:** `smartfarm-chatbot` (hoặc tên khác)
2. **Framework Preset:** `Next.js` (Vercel tự nhận)
3. **Root Directory:** Click **"Edit"** → Chọn `AI_SmartFarm_CHatbot` ✅
4. **Build/Install Command:** Để mặc định

### **Bước 3.5: Environment Variables**

**LẦN NÀY CẦN THÊM!**

1. Kéo xuống phần **"Environment Variables"**
2. Click **"Add"**
3. Thêm:
   - **Key:** `GOOGLE_API_KEY`
   - **Value:** (Để trống hoặc nhập `test` - sẽ update sau)
   - Click **"Add"**

### **Bước 3.6: Deploy**

Click **"Deploy"** → Đợi 3-5 phút

### **Bước 3.7: Lấy URL**

Sau khi deploy xong → Click **"Visit"** → Lưu URL: `https://smartfarm-chatbot-xyz.vercel.app`

✅ **Chatbot đã LIVE!**

---

## ☕ PHẦN 4: DEPLOY BACKEND JAVA (20 phút)

### **Bước 4.1: Vào Railway Dashboard**

1. Mở trình duyệt → Vào **https://railway.app**
2. Đăng nhập
3. Click **"New Project"**

---

### **Bước 4.2: Deploy from GitHub**

1. Click **"Deploy from GitHub repo"**
2. Chọn repository `SmartFarm`
3. Railway sẽ phát hiện code

---

### **Bước 4.3: Configure service**

1. Railway sẽ hỏi **"Which service to deploy?"**
2. Click **"Add variables"** (góc trên)
3. Thêm biến:

Click **"New Variable"** và thêm từng cái sau:

**Variable 1:**
- **Variable Name:** `NIXPACKS_JDK_VERSION`
- **Value:** `17`

**Variable 2:**
- **Variable Name:** `MAVEN_OPTS`
- **Value:** `-Xmx512m`

**Variable 3:**
- **Variable Name:** `ROOT_DIRECTORY`
- **Value:** `demoSmartFarm/demo`

4. Click **"Deploy"** (ở dưới)

---

### **Bước 4.4: Đợi build**

⏳ **Đợi 10-15 phút** cho lần đầu (Maven cần download dependencies)

Bạn sẽ thấy logs:
- `Downloading maven dependencies...`
- `Building with Maven...`
- `[INFO] BUILD SUCCESS`

---

### **Bước 4.5: Generate domain**

Khi build xong:

1. Click tab **"Settings"**
2. Kéo xuống phần **"Networking"**
3. Click **"Generate Domain"**
4. Railway sẽ tạo domain dạng: `smartfarm-production-abc.up.railway.app`

**📝 LƯU LẠI URL này!**

---

### **Bước 4.6: Thêm Database (Optional ngay lúc này)**

1. Click **"New"** (góc trên)
2. Chọn **"Database"** → **"Add PostgreSQL"**
3. Railway tự động tạo database và link với Backend

✅ **Backend đã LIVE!**

**Test:** Mở `https://your-backend-url.up.railway.app/actuator/health` → Nếu thấy `{"status":"UP"}` → **Thành công!**

---

## 🐍 PHẦN 5: DEPLOY ML CROP SERVICE (15 phút)

### **Bước 5.1: Vào Render Dashboard**

1. Mở **https://render.com**
2. Đăng nhập
3. Click **"New +"** (góc trên)
4. Chọn **"Web Service"**

---

### **Bước 5.2: Connect GitHub**

1. Click **"Connect account"** (nếu chưa kết nối GitHub)
2. Authorize Render
3. Tìm repository `SmartFarm` → Click **"Connect"**

---

### **Bước 5.3: Configure service**

Render sẽ mở form:

1. **Name:** `crop-recommendation` (hoặc tên khác)
2. **Region:** `Singapore` (gần Việt Nam nhất)
3. **Branch:** `main`
4. **Root Directory:** `RecommentCrop` ✅ **QUAN TRỌNG!**
5. **Runtime:** `Python 3`
6. **Build Command:** `pip install -r requirements.txt`
7. **Start Command:** `python crop_recommendation_service.py`
8. **Instance Type:** **Free** ✅

---

### **Bước 5.4: Environment Variables**

Kéo xuống **"Environment Variables"** → Click **"Add Environment Variable"**

Thêm:
- **Key:** `PYTHON_VERSION`
- **Value:** `3.10`

Click **"Add"**

Thêm tiếp:
- **Key:** `PORT`
- **Value:** `5000`

---

### **Bước 5.5: Deploy**

1. Click **"Create Web Service"** (dưới cùng)
2. Render bắt đầu build

⏳ **Đợi 10-20 phút** (lần đầu rất lâu vì phải cài PyTorch, scikit-learn)

---

### **Bước 5.6: Lấy URL**

Khi deploy xong, ở đầu page sẽ có URL: `https://crop-recommendation.onrender.com`

**📝 LƯU LẠI!**

**Test:** Mở `https://crop-recommendation.onrender.com/health` → Nếu thấy `{"status":"healthy"}` → **Thành công!**

---

## 🐛 PHẦN 6: DEPLOY ML PEST SERVICE (15 phút)

**Làm HOÀN TOÀN GIỐNG Phần 5**, chỉ khác:

### **Khác biệt:**
- **Name:** `pest-disease-detection`
- **Root Directory:** `PestAndDisease` ✅
- **Start Command:** `python pest_disease_service.py`
- **PORT:** `5001`

Làm từ Bước 5.1 → 5.6 với config trên.

**📝 LƯU URL:** `https://pest-disease-detection.onrender.com`

---

## 🔗 PHẦN 7: KẾT NỐI CÁC SERVICE (20 phút)

**Bây giờ các services đã LIVE nhưng CHƯA nói chuyện với nhau!**

---

### **Bước 7.1: Update Backend Environment Variables**

1. Vào **Railway Dashboard**
2. Click vào project **Backend**
3. Click tab **"Variables"**
4. Click **"New Variable"**

Thêm từng biến sau (thay bằng URL thực tế của bạn):

```
CROP_ML_URL=https://crop-recommendation.onrender.com
PEST_ML_URL=https://pest-disease-detection.onrender.com
ALLOWED_ORIGINS=https://smartfarm-abc123.vercel.app,https://smartfarm-chatbot-xyz.vercel.app
```

**⚠️ QUAN TRỌNG:** Thay bằng URL THỰC TẾ của bạn!

5. Click **"Add"** sau mỗi biến
6. Railway sẽ tự động **redeploy** (đợi 2-3 phút)

---

### **Bước 7.2: Update Frontend Environment Variables**

1. Vào **Vercel Dashboard**
2. Click vào project **smartfarm-frontend**
3. Click tab **"Settings"**
4. Click **"Environment Variables"** (menu bên trái)
5. Click **"Add New"**

Thêm từng biến:

**Variable 1:**
- **Key:** `REACT_APP_API_URL`
- **Value:** `https://your-backend.up.railway.app` (URL Backend của bạn)
- **Environment:** Tick cả 3 (Production, Preview, Development)
- Click **"Save"**

**Variable 2:**
- **Key:** `REACT_APP_CROP_ML_URL`
- **Value:** `https://crop-recommendation.onrender.com`
- Click **"Save"**

**Variable 3:**
- **Key:** `REACT_APP_PEST_ML_URL`
- **Value:** `https://pest-disease-detection.onrender.com`
- Click **"Save"**

---

### **Bước 7.3: Redeploy Frontend**

1. Click tab **"Deployments"**
2. Click menu **"..."** ở deployment mới nhất
3. Click **"Redeploy"**
4. Đợi 2-3 phút

---

### **Bước 7.4: Update Chatbot Environment Variables**

Làm tương tự Bước 7.2 nhưng cho project **smartfarm-chatbot**:

Thêm:
- **Key:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://your-backend.up.railway.app`

Redeploy.

---

## 🎉 PHẦN 8: KIỂM TRA HỆ THỐNG (10 phút)

### **Bước 8.1: Test Backend API**

Mở trình duyệt → Vào:
```
https://your-backend.up.railway.app/actuator/health
```

**Kết quả mong đợi:**
```json
{"status":"UP"}
```

✅ **Thành công!**

---

### **Bước 8.2: Test ML Crop**

```
https://crop-recommendation.onrender.com/health
```

**Kết quả:**
```json
{"status":"healthy","model_loaded":true}
```

**⚠️ Lưu ý:** Lần đầu mở có thể mất 30-60 giây (Render "đánh thức" service)

---

### **Bước 8.3: Test ML Pest**

```
https://pest-disease-detection.onrender.com/health
```

**Kết quả tương tự.**

---

### **Bước 8.4: Test Frontend**

1. Mở: `https://smartfarm-abc123.vercel.app`
2. Thử đăng nhập/đăng ký
3. Vào trang **Crop Recommendation**
4. Nhập dữ liệu:
   - Nhiệt độ: `25`
   - Độ ẩm: `80`
   - Độ ẩm đất: `45`
5. Click **"Gợi ý cây trồng"**

**Nếu hiện kết quả (tên cây) → ✅ THÀNH CÔNG!**

---

### **Bước 8.5: Test Pest Detection**

1. Vào trang **Pest Detection**
2. Upload 1 ảnh lá cây
3. Click **"Phân tích"**

**Nếu hiện kết quả → ✅ THÀNH CÔNG!**

---

## 🎊 HOÀN THÀNH!

### **Bạn đã có:**

✅ **Frontend:** `https://smartfarm-abc123.vercel.app`  
✅ **Chatbot:** `https://smartfarm-chatbot-xyz.vercel.app`  
✅ **Backend:** `https://your-backend.up.railway.app`  
✅ **ML Crop:** `https://crop-recommendation.onrender.com`  
✅ **ML Pest:** `https://pest-disease-detection.onrender.com`  

### **Tất cả MIỄN PHÍ!** 🎉

---

## 📝 GHI CHÚ QUAN TRỌNG

### **1. Render Services "ngủ" sau 15 phút**

Nếu không có ai truy cập, Render sẽ tắt service để tiết kiệm tài nguyên.

**Khi có người truy cập lại:**
- Service sẽ "thức dậy"
- Mất 30-60 giây lần đầu
- Sau đó hoạt động bình thường

**Giải pháp:** Dùng UptimeRobot (free) để ping service mỗi 5 phút (xem phần Bonus bên dưới)

---

### **2. Railway Free Tier**

- **500 giờ runtime/tháng** = ~20 ngày
- Đủ cho demo, testing
- Nếu hết giờ → Service tắt → Cần upgrade ($5/tháng)

---

### **3. Vercel Free Tier**

- **Không giới hạn** projects
- 100 GB bandwidth/tháng (rất nhiều!)
- Hoàn toàn đủ cho production

---

## 🐛 TROUBLESHOOTING - XỬ LÝ LỖI

### **Lỗi 1: Git push bị reject vì file quá lớn**

**Triệu chứng:**
```
remote: error: File RecommentCrop/RandomForest_RecomentTree.pkl is 150 MB; this exceeds GitHub's file size limit of 100 MB
```

**Giải pháp:**

**Option A: Dùng Git LFS (Large File Storage)**

```bash
# Cài Git LFS
git lfs install

# Track các file lớn
git lfs track "*.pkl"
git lfs track "*.pth"

# Add .gitattributes
git add .gitattributes

# Commit lại
git add .
git commit -m "Use Git LFS for large files"
git push
```

**Option B: Xóa file lớn khỏi Git (deploy riêng)**

1. Tạo file `.gitignore` trong thư mục gốc
2. Thêm:
```
*.pkl
*.pth
```
3. Commit và push lại

**Sau đó:** Upload model lên Google Drive, sửa Python code để download khi start (xem hướng dẫn trong `COMPLETE_DEPLOYMENT_GUIDE.md`)

---

### **Lỗi 2: Frontend không connect được Backend**

**Triệu chứng:** Mở F12 trong browser → Console → Thấy lỗi CORS

**Giải pháp:**

1. Kiểm tra Backend có chạy không: Mở `https://your-backend.up.railway.app/actuator/health`
2. Kiểm tra Frontend có đúng URL Backend không: Vào Vercel → Settings → Environment Variables → Xem `REACT_APP_API_URL`
3. Kiểm tra Backend có CORS cho Frontend domain không

**Update CORS trong Backend:**

File `CropRecommendationController.java`:
```java
@CrossOrigin(origins = {
    "https://smartfarm-abc123.vercel.app",  // ← Thay bằng URL thực của bạn
    "http://localhost:3000"
})
```

Sau đó commit → push → Railway auto-redeploy.

---

### **Lỗi 3: Render build timeout**

**Triệu chứng:** Render build quá 15 phút → Fail

**Nguyên nhân:** File `requirements.txt` có quá nhiều packages hoặc PyTorch quá lớn

**Giải pháp:**

1. Kiểm tra `requirements.txt` có dư packages không
2. Dùng PyTorch CPU thay vì GPU:
```
torch==2.0.0+cpu
torchvision==0.15.0+cpu
```

---

### **Lỗi 4: Railway build fail "Could not find pom.xml"**

**Nguyên nhân:** Railway không tìm thấy file `pom.xml` vì ROOT_DIRECTORY sai

**Giải pháp:**

1. Vào Railway → Settings → Environment Variables
2. Kiểm tra `ROOT_DIRECTORY` = `demoSmartFarm/demo` (chính xác!)
3. Redeploy

---

## 🎁 BONUS: GIẢM COLD START CHO RENDER

### **Dùng UptimeRobot (FREE) để ping service**

1. Vào **https://uptimerobot.com**
2. Đăng ký tài khoản miễn phí
3. Click **"Add New Monitor"**
4. Chọn **"HTTP(s)"**
5. Điền:
   - **Friendly Name:** `Crop Service`
   - **URL:** `https://crop-recommendation.onrender.com/health`
   - **Monitoring Interval:** `5 minutes`
6. Click **"Create Monitor"**
7. Lặp lại cho Pest Service

**Kết quả:** Render sẽ không bao giờ "ngủ" vì có request mỗi 5 phút!

---

## 📞 HỖ TRỢ

Nếu gặp lỗi:

1. **Screenshot lỗi** (toàn bộ màn hình)
2. **Copy error message** (nếu có)
3. **Cho biết đang ở bước nào**
4. Hỏi tôi!

**Tôi sẽ giúp bạn debug! 🚀**

---

**Chúc mừng bạn đã deploy thành công hệ thống Smart Farm! 🎉🌾**

