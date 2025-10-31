# 🏗️ SMART FARM - SYSTEM ARCHITECTURE

## 📊 **COMPLETE SYSTEM DIAGRAM**

```
┌─────────────────────────────────────────────────────────────────────┐
│                         🌐 FRONTEND LAYER                            │
│                                                                       │
│              https://hackathon-pione-dream.vercel.app/               │
│                    (Vercel - React/J2EE/JSP)                        │
│                                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Dashboard │  │  Sensors │  │  Disease │  │   Chat   │           │
│  │   UI     │  │  Monitor │  │ Detection│  │    Bot   │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         │ HTTPS
                         ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      🔧 BACKEND API LAYER                            │
│                                                                       │
│         https://hackathonpionedream-production.up.railway.app/      │
│                    (Railway - Spring Boot)                           │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │AuthService   │  │SensorService │  │ AlertService │             │
│  │- Login/      │  │- Get Data    │  │- Manage      │             │
│  │  Register    │  │- Store Data  │  │  Alerts      │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐                                │
│  │DiseaseService│  │  CropService │                                │
│  │- Call AI     │  │- Call AI     │                                │
│  └──────────────┘  └──────────────┘                                │
└───┬────────────┬────────────┬───────────────┬────────────────────┘
    │            │            │               │
    │            │            │               │
    ↓            ↓            ↓               ↓
┌─────────┐  ┌──────────────────┐  ┌────────────────────┐  ┌────────────┐
│Database │  │  AI Services     │  │  AI Services       │  │ Blockchain │
│         │  │                  │  │                    │  │            │
│Railway  │  │🐛 Pest Detection│  │🌱 Crop Recommend   │  │ Pioneer    │
│Postgres │  │Hugging Face     │  │Render              │  │ ZeroChain  │
│         │  │kimngan0407-pest-│  │hackathon-pione-    │  │            │
│✅ LIVE  │  │disease.hf.space │  │dream.onrender.com  │  │✅ LIVE     │
└─────────┘  └──────────────────┘  └────────────────────┘  └────────────┘
                                                                  ↑
                                                                  │
                                              ┌───────────────────┴──────┐
                                              │  🤖 AI Chatbot           │
                                              │  Vercel                  │
                                              │  hackathon-pione-dream-  │
                                              │  vzj5.vercel.app         │
                                              └──────────────────────────┘
                                                        ↑
                                                        │
                                              ┌─────────┴──────────┐
                                              │   📟 Arduino IoT    │
                                              │   Smart Sensors     │
                                              │   (Temperature,     │
                                              │    Humidity, etc.)  │
                                              └────────────────────┘
```

---

## 🔄 **DATA FLOW**

### 1. **Sensor Data Collection**
```
Arduino → Blockchain (Pioneer) → Backend API → PostgreSQL → Frontend
```

### 2. **Disease Detection**
```
User Upload Image → Frontend → Backend → Pest AI (HF) → Response → Frontend
```

### 3. **Crop Recommendation**
```
User Input Soil Data → Frontend → Backend → Crop AI (Render) → Response → Frontend
```

### 4. **Chatbot Interaction**
```
User Question → Chatbot UI (Vercel) → Google Gemini AI → Response → UI
```

---

## 🔐 **SECURITY LAYERS**

```
┌──────────────────────────────────────┐
│         User Authentication          │
│       (JWT Tokens in Backend)        │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│             HTTPS/TLS                │
│     (All communications encrypted)   │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│        Environment Variables         │
│  (Secrets stored in Railway/Vercel)  │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│           CORS Protection            │
│   (Whitelist frontend domain only)   │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│         Database Security            │
│    (PostgreSQL with SSL enabled)     │
└──────────────────────────────────────┘
```

---

## 📊 **SERVICE DEPENDENCIES**

### Frontend Dependencies:
- ✅ Backend API (Railway)
- ✅ Chatbot (Vercel)
- ⚠️ Can work offline with cached data

### Backend Dependencies:
- ✅ PostgreSQL Database (Railway)
- ✅ Pest Detection AI (Hugging Face)
- ✅ Crop Recommendation AI (Render)
- ✅ Blockchain (Pioneer)

### AI Services:
- 🐛 **Pest Detection:** Independent, always ready
- 🌱 **Crop Recommendation:** May sleep (Render free), 30s wake
- 🤖 **Chatbot:** Requires Google Gemini API key

---

## 💾 **DATA STORAGE**

### PostgreSQL Database (Railway):
```
Tables:
├── users            (Authentication data)
├── sensors          (IoT sensor readings)
├── alerts           (Farm alerts/notifications)
├── crops            (Crop information)
├── diseases         (Disease detection history)
└── recommendations  (Crop recommendation history)
```

### Blockchain (Pioneer ZeroChain):
```
Smart Contract:
└── Immutable sensor data logs
    - Timestamp
    - Sensor values
    - Transaction hash
```

---

## 🚀 **SCALABILITY**

### Current Capacity:
- **Frontend:** Unlimited (Vercel CDN)
- **Backend:** 1GB RAM, can scale (Railway)
- **Database:** 1GB storage, can upgrade (Railway)
- **AI Services:** Shared resources (Free tier)

### Scaling Options:
```
Traffic Growth → Upgrade Plans
├── Railway: Pro Plan ($5-20/month)
├── Render: Paid Plan ($7+/month)  
├── Hugging Face: Pro Plan ($9/month)
└── Vercel: Pro Plan ($20/month)
```

---

## 📈 **PERFORMANCE METRICS**

### Expected Response Times:
```
Frontend Load:        < 2s
Backend API:          < 500ms
Database Query:       < 200ms
Pest AI Prediction:   < 3s
Crop AI Prediction:   < 2s (or 30s if sleeping)
Chatbot Response:     < 2s
```

### Optimization:
- ✅ CDN for frontend assets
- ✅ Database indexing
- ✅ API response caching
- ⏳ Image compression (TODO)
- ⏳ Load balancing (TODO)

---

## 🔧 **TECHNOLOGY STACK**

### Frontend:
```
Framework:  J2EE/JSP + React
Hosting:    Vercel
CDN:        Vercel Edge Network
SSL:        Auto-provisioned
```

### Backend:
```
Framework:  Spring Boot 3.x
Language:   Java 17
Database:   PostgreSQL 15
Hosting:    Railway
Runtime:    Nixpacks
```

### AI Services:
```
Pest Detection:
  - Model: Vision Transformer (ViT-B/16)
  - Framework: PyTorch
  - Hosting: Hugging Face Spaces
  - Docker: Python 3.9 + PyTorch CPU

Crop Recommendation:
  - Model: Random Forest / SVM
  - Framework: Scikit-learn
  - Hosting: Render
  - Runtime: Python 3.9

Chatbot:
  - Model: Google Gemini AI
  - Framework: Next.js
  - Hosting: Vercel
```

### Blockchain:
```
Chain:      Pioneer ZeroChain
Language:   Solidity
Purpose:    Immutable data storage
```

---

## 🌐 **DEPLOYMENT PLATFORMS**

| Platform | Services | Free Tier | Paid Plans |
|----------|----------|-----------|------------|
| **Railway** | Backend, DB | 500 hrs/month, $5 credit | $5-20/month |
| **Vercel** | Frontend, Chatbot | 100GB bandwidth | $20/month Pro |
| **Hugging Face** | Pest AI | Unlimited (shared CPU) | $9/month Pro |
| **Render** | Crop AI | 750 hrs/month | $7+/month |
| **Pioneer** | Blockchain | Testnet free | Mainnet fees |

---

## 🔄 **CI/CD PIPELINE**

### Current Flow:
```
Local Development
       ↓
   Git Commit
       ↓
   Git Push to GitHub
       ↓
Auto-Deploy Triggers:
├── Vercel (Frontend + Chatbot)
├── Railway (Backend)
└── Render (Crop AI)
```

### Manual Deploy:
- Hugging Face Spaces (upload files via web)

---

## 📞 **API ENDPOINTS REFERENCE**

### Backend API:
```
BASE: https://hackathonpionedream-production.up.railway.app

Authentication:
POST   /api/auth/register       - User registration
POST   /api/auth/login          - User login
GET    /api/auth/profile        - Get user profile

Sensors:
GET    /api/sensors             - Get all sensor data
POST   /api/sensors             - Add sensor data
GET    /api/sensors/{id}        - Get specific sensor

Alerts:
GET    /api/alerts              - Get all alerts
POST   /api/alerts              - Create alert
DELETE /api/alerts/{id}         - Delete alert

Disease Detection:
POST   /api/disease/detect      - Detect disease (calls AI)
GET    /api/disease/history     - Get detection history

Crop Recommendation:
POST   /api/crop/recommend      - Get recommendations (calls AI)
GET    /api/crop/history        - Get recommendation history
```

### Pest & Disease AI:
```
BASE: https://kimngan0407-pest-disease.hf.space

GET    /health                  - Health check
POST   /api/detect              - Detect disease from image
GET    /api/classes             - Get supported classes
```

### Crop Recommendation AI:
```
BASE: https://hackathon-pione-dream.onrender.com

GET    /health                  - Health check
POST   /api/recommend           - Get crop recommendations
GET    /api/crops               - Get supported crops
```

---

## 🎯 **SYSTEM HEALTH MONITORING**

### Dashboards:
- Railway: https://railway.app/dashboard
- Vercel: https://vercel.com/dashboard  
- Render: https://dashboard.render.com
- Hugging Face: https://huggingface.co/spaces/kimngan0407

### Health Checks:
```bash
# Check all services
curl https://hackathonpionedream-production.up.railway.app/health
curl https://kimngan0407-pest-disease.hf.space/health
curl https://hackathon-pione-dream.onrender.com/health
```

---

## ✨ **SYSTEM FEATURES**

### For Farmers:
- ✅ Real-time sensor monitoring
- ✅ Disease detection from photos
- ✅ Crop recommendations
- ✅ AI farming assistant
- ✅ Alert notifications
- ✅ Historical data tracking

### For Admins:
- ✅ User management
- ✅ System monitoring
- ✅ Data analytics
- ✅ Alert configuration

### For Developers:
- ✅ RESTful API
- ✅ Docker containerization
- ✅ Auto-deployment
- ✅ Environment management
- ✅ Logging & monitoring

---

*Architecture Version: 1.0*
*Last Updated: October 31, 2025*
*Status: ✅ PRODUCTION READY*

