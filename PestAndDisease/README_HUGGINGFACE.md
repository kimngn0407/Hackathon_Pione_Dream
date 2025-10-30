---
title: Pest Disease Detection
emoji: 🌾
colorFrom: green
colorTo: yellow
sdk: docker
pinned: false
app_port: 7860
---

# 🌾 Pest & Disease Detection API

AI-powered API for detecting pests and diseases in wheat crops using Vision Transformer.

## 🎯 Features

- 4 Classes Detection:
  - Aphid (Rệp)
  - Blast (Bệnh đạo ôn)
  - Septoria (Bệnh đốm lá Septoria)
  - Smut (Bệnh than)

- Model: Vision Transformer (ViT-B/16)
- Framework: PyTorch + Flask

## 🚀 API Endpoints

### Health Check
```
GET /health
```

### Detect Pest/Disease
```
POST /api/detect
Content-Type: multipart/form-data
Body: file=<image.jpg>
```

### Get Classes
```
GET /api/classes
```

## 📦 Model

Fine-tuned Vision Transformer on wheat disease dataset.

## 🔗 Integration

Use this API in your SmartFarm application:
```javascript
const response = await fetch('https://huggingface.co/spaces/YOUR-USERNAME/pest-disease-detection/api/detect', {
  method: 'POST',
  body: formData
});
```

## 🛠️ Tech Stack

- PyTorch 2.0.1
- Flask 2.3.3
- Vision Transformer (torchvision)
- Python 3.9

