---
title: Pest and Disease Detection
emoji: 🌾
colorFrom: green
colorTo: yellow
sdk: docker
pinned: false
---

# 🌾 Wheat Pest and Disease Detection API

AI-powered wheat pest and disease detection using Vision Transformer (ViT).

## API Endpoints

### Health Check
```bash
GET /health
```

### Detect Disease
```bash
POST /api/detect
Content-Type: multipart/form-data
Body: file (image file)
```

### Get Classes
```bash
GET /api/classes
```

## Classes Detected
1. Brown Rust
2. Healthy
3. Septoria
4. Yellow Rust

## Model
- Architecture: Vision Transformer Base (ViT-B/16)
- Classes: 4
- Input: 224x224 RGB images

## Usage Example

```python
import requests

url = "https://kimngan0407-pest-disease-detection.hf.space/api/detect"
files = {'file': open('wheat_leaf.jpg', 'rb')}
response = requests.post(url, files=files)
print(response.json())
```

## Response Format

```json
{
  "predicted_class": "Brown Rust",
  "confidence": 0.95,
  "all_predictions": {
    "Brown Rust": 0.95,
    "Septoria": 0.03,
    "Yellow Rust": 0.01,
    "Healthy": 0.01
  }
}
```
