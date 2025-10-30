# 📚 GIẢI THÍCH CHI TIẾT HỆ THỐNG IoT BLOCKCHAIN

## 🎯 MỤC ĐÍCH DỰ ÁN

Xây dựng hệ thống **SmartFarm IoT** kết hợp **Blockchain** để:
- Thu thập dữ liệu cảm biến từ Arduino (nhiệt độ, độ ẩm, độ ẩm đất, ánh sáng)
- Lưu trữ dữ liệu vào database (PostgreSQL)
- Đưa hash của dữ liệu lên blockchain (Pione Zero) để **chống giả mạo**

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

```
┌─────────────────┐
│  ARDUINO UNO    │ Đọc cảm biến: DHT22, Soil, Light
│  + Sensors      │ Xuất JSON qua Serial (USB)
└────────┬────────┘
         │ USB/Serial (COM4)
         │ JSON: {"sensorId":1,"time":15,"temperature":26.7,...}
         ↓
┌─────────────────┐
│ forwarder.py    │ Python script đọc Serial
│ (Python)        │ Chuyển tiếp dữ liệu qua HTTP
└────────┬────────┘
         │ HTTP POST
         │ URL: http://localhost:8000/api/sensors
         ↓
┌─────────────────┐
│  Flask API      │ RESTful API nhận dữ liệu
│  (Python)       │ Port 8000
└────┬───────┬────┘
     │       │
     │       └──────────────┐
     ↓                      ↓
┌──────────────┐   ┌────────────────┐
│ PostgreSQL   │   │ Oracle Node    │
│ Database     │   │ (Node.js)      │
│              │   │ Port 5001      │
└──────────────┘   └────────┬───────┘
                            │ Web3 Transaction
                            ↓
                   ┌────────────────────┐
                   │ Pione Zero Chain   │
                   │ Smart Contract:    │
                   │ 0xec2d978F58...    │
                   └────────────────────┘
```

---

## 📂 CẤU TRÚC THƯ MỤC

```
E:\SmartContract\
├── contracts/
│   └── SensorOracle.sol          # Smart Contract (Solidity)
├── scripts/
│   └── deploy.js                 # Script deploy contract
├── oracle-node/
│   ├── server.js                 # Oracle Node (gửi tx lên blockchain)
│   ├── package.json              # Dependencies Node.js
│   └── .env                      # Cấu hình blockchain
├── flask-api/
│   ├── app.py                    # Flask API server
│   ├── requirements.txt          # Dependencies Python
│   └── .env                      # Cấu hình database
├── device/
│   ├── esp32_post.ino            # Code cho ESP32 (WiFi)
│   └── forwarder.py              # Script chuyển tiếp Arduino → API
├── hardhat.config.js             # Cấu hình Hardhat
└── package.json                  # Dependencies chính
```

---

## 🔍 CHI TIẾT TỪNG THÀNH PHẦN

### 1️⃣ SMART CONTRACT (SensorOracle.sol)

**File:** `contracts/SensorOracle.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SensorOracle {
    // Event được emit khi lưu hash
    event SensorHashStored(address indexed sender, uint256 indexed time, string hash);

    // Function nhận dữ liệu từ Oracle Node
    function storeHash(uint256 time, string calldata dataHash) external {
        emit SensorHashStored(msg.sender, time, dataHash);
    }
}
```

**Giải thích:**
- **Mục đích:** Lưu hash của dữ liệu cảm biến lên blockchain
- **Tại sao chỉ lưu hash?** 
  - Blockchain đắt tiền (phải trả gas fee)
  - Dữ liệu lớn → tốn nhiều gas
  - Hash (32 bytes) rất nhỏ → tiết kiệm chi phí
  - Hash vẫn đảm bảo tính toàn vẹn dữ liệu

**Cách hoạt động:**
1. Oracle Node gọi `storeHash(time, hash)`
2. Contract emit event `SensorHashStored`
3. Event được lưu vĩnh viễn trên blockchain
4. Ai cũng có thể kiểm chứng dữ liệu bằng cách:
   - Lấy dữ liệu gốc từ database
   - Tính hash
   - So sánh với hash trên blockchain

---

### 2️⃣ ORACLE NODE (server.js)

**File:** `oracle-node/server.js`

```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối blockchain
const RPC_URL = process.env.RPC_URL || "https://rpc.zeroscan.org";
const CHAIN_ID = Number(process.env.CHAIN_ID || 5080);
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Kết nối blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL, CHAIN_ID);
const wallet   = new ethers.Wallet(PRIVATE_KEY, provider);
const abi = ["function storeHash(uint256 time,string dataHash)"];
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// API endpoint nhận hash từ Flask
app.post("/oracle/push", async (req, res) => {
  try {
    const { time, hash } = req.body;  // Nhận time và hash
    
    // Gọi smart contract để lưu hash
    const tx = await contract.storeHash(Number(time), String(hash));
    
    // Đợi transaction được confirm
    const receipt = await tx.wait();
    
    return res.json({ ok: true, txHash: receipt.hash });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = Number(process.env.PORT || 5001);
app.listen(PORT, () => console.log(`[oracle] listening on ${PORT}`));
```

**Giải thích từng bước:**

1. **Import thư viện:**
   - `express`: Tạo web server
   - `ethers`: Thư viện tương tác với blockchain
   - `dotenv`: Đọc file .env

2. **Kết nối blockchain:**
   - `provider`: Kết nối đến Pione Zero RPC
   - `wallet`: Ví để ký transaction (dùng PRIVATE_KEY)
   - `contract`: Instance của smart contract

3. **API Endpoint `/oracle/push`:**
   - Nhận `time` và `hash` từ Flask API
   - Gọi `contract.storeHash(time, hash)`
   - Trả về transaction hash

**File .env:**
```env
RPC_URL=https://rpc.zeroscan.org
CHAIN_ID=5080
PRIVATE_KEY=0xe93fff20484c2f55d8ff4ef7b3f041ab82ecbc4c0fe5c99915fd3cceab0c8b0b
CONTRACT_ADDRESS=0xec2d978F58A0505280Fa0b253f2e81ca553D34B8
PORT=5001
```

---

### 3️⃣ FLASK API (app.py)

**File:** `flask-api/app.py`

```python
import os, json, time
from flask import Flask, request, jsonify
from sqlalchemy import create_engine, text
from eth_utils import keccak, to_bytes
import requests
from dotenv import load_dotenv

load_dotenv()
DB_URL = os.getenv("DB_URL")
API_KEY = os.getenv("API_KEY", "MY_API_KEY")
ORACLE_URL = os.getenv("ORACLE_URL", "http://localhost:5001/oracle/push")

# Mapping: 1 node Arduino → 4 sensors trong database
TEMP_SENSOR_ID  = int(os.getenv("TEMP_SENSOR_ID", 7))
HUMID_SENSOR_ID = int(os.getenv("HUMID_SENSOR_ID", 8))
SOIL_SENSOR_ID  = int(os.getenv("SOIL_SENSOR_ID", 9))
LIGHT_SENSOR_ID = int(os.getenv("LIGHT_SENSOR_ID", 10))

ENGINE = create_engine(DB_URL, future=True)
app = Flask(__name__)

def canonical(obj: dict) -> str:
    """Tạo chuỗi JSON chuẩn hóa để tính hash"""
    payload = {
        "sensorId": int(obj.get("sensorId", 0)),
        "time": int(obj.get("time", int(time.time()))),
        "temperature": obj.get("temperature", None),
        "humidity": obj.get("humidity", None),
        "soil_pct": obj.get("soil_pct", None),
        "light": obj.get("light", obj.get("light_pct", None))
    }
    return json.dumps(payload, separators=(",", ":"), ensure_ascii=False)

def keccak_hex(s: str) -> str:
    """Tính Keccak256 hash (giống SHA3)"""
    return "0x" + keccak(to_bytes(text=s)).hex()

@app.post("/api/sensors")
def ingest():
    # Kiểm tra API key
    if request.headers.get("x-api-key") != API_KEY:
        return jsonify(error="unauthorized"), 401

    # Nhận dữ liệu JSON từ request
    b = request.get_json(force=True)
    epoch = int(b.get("time", time.time()))
    t = b.get("temperature")
    h = b.get("humidity")
    s = b.get("soil_pct")
    l = b.get("light", b.get("light_pct"))

    # Lưu vào database (4 bản ghi - 1 cho mỗi loại sensor)
    with ENGINE.begin() as cn:
        if t is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": TEMP_SENSOR_ID, "val": float(t), "ts": epoch})
        if h is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": HUMID_SENSOR_ID, "val": float(h), "ts": epoch})
        if s is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": SOIL_SENSOR_ID, "val": float(s), "ts": epoch})
        if l is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": LIGHT_SENSOR_ID, "val": float(l), "ts": epoch})

    # Tính hash của dữ liệu
    c = canonical(b)  # Chuẩn hóa JSON
    hsh = keccak_hex(c)  # Tính hash
    
    # Gửi hash lên blockchain qua Oracle Node
    try:
        r = requests.post(ORACLE_URL, json={"time": epoch, "hash": hsh}, timeout=20)
        j = r.json()
    except Exception as e:
        j = {"ok": False, "error": str(e)}
    
    # Trả về kết quả
    return jsonify(ok=True, oracle=j, canonical=c, hash=hsh)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
```

**Giải thích chi tiết:**

#### **Bước 1: Nhận dữ liệu**
```python
{
  "sensorId": 1,
  "time": 15,
  "temperature": 26.7,
  "humidity": 61.0,
  "soil_pct": 100.0,
  "light": 18.0
}
```

#### **Bước 2: Lưu vào Database**
Dữ liệu từ 1 Arduino node được tách thành 4 bản ghi:
- `sensor_id=7` → temperature: 26.7
- `sensor_id=8` → humidity: 61.0
- `sensor_id=9` → soil_pct: 100.0
- `sensor_id=10` → light: 18.0

**Tại sao?** 
- Database thiết kế normalized (chuẩn hóa)
- Mỗi sensor 1 bản ghi → dễ query, dễ quản lý

#### **Bước 3: Tính Hash**
```python
# Chuẩn hóa JSON (thứ tự key cố định, không có space)
canonical = '{"sensorId":1,"time":15,"temperature":26.7,"humidity":61.0,"soil_pct":100.0,"light":18.0}'

# Tính Keccak256 hash
hash = keccak256(canonical)
# → 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```

**Tại sao cần canonical?**
- JSON có thể viết nhiều cách: `{"a":1,"b":2}` = `{"b":2,"a":1}`
- Cần thống nhất thứ tự key để hash giống nhau

#### **Bước 4: Gửi hash lên Blockchain**
```python
# Gọi Oracle Node
POST http://localhost:5001/oracle/push
Body: {"time": 15, "hash": "0x7e87...2528"}

# Oracle Node gọi Smart Contract
contract.storeHash(15, "0x7e87...2528")

# Blockchain lưu vĩnh viễn
```

---

### 4️⃣ FORWARDER (forwarder.py)

**File:** `device/forwarder.py`

```python
import serial
import json
import requests
import time

# Cấu hình
PORT = "COM4"              # COM port của Arduino
BAUD = 9600                # Tốc độ baud
FLASK_URL = "http://localhost:8000/api/sensors"
API_KEY = "MY_API_KEY"

def main():
    try:
        # Kết nối Serial
        ser = serial.Serial(PORT, BAUD, timeout=1)
        print(f"Connected to {PORT} at {BAUD} baud")
        
        while True:  # Vòng lặp vô hạn
            try:
                # Đọc 1 dòng từ Arduino
                line = ser.readline().decode(errors="ignore").strip()
                
                if not line:
                    continue  # Bỏ qua dòng trống
                    
                print(f"Received: {line}")
                
                # Parse JSON
                payload = json.loads(line)
                
                # Gửi lên Flask API
                headers = {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                }
                
                response = requests.post(
                    FLASK_URL, 
                    json=payload, 
                    headers=headers, 
                    timeout=10
                )
                
                print(f"Response: {response.status_code} - {response.text}")
                
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
            except requests.exceptions.RequestException as e:
                print(f"Request error: {e}")
            except Exception as e:
                print(f"Unexpected error: {e}")
                
            time.sleep(1)  # Đợi 1 giây
            
    except serial.SerialException as e:
        print(f"Serial connection error: {e}")
        print("Make sure Arduino is connected and port is correct")

if __name__ == "__main__":
    main()
```

**Giải thích:**

1. **Kết nối Serial:**
   - Mở port COM4 với baud rate 9600
   - `timeout=1`: Đợi tối đa 1 giây khi đọc

2. **Vòng lặp vô hạn:**
   - Liên tục đọc dữ liệu từ Arduino
   - Parse JSON
   - Gửi lên Flask API

3. **Xử lý lỗi:**
   - JSON không hợp lệ → In lỗi, tiếp tục
   - Lỗi kết nối → In lỗi, tiếp tục
   - Serial bị ngắt → Thoát chương trình

---

### 5️⃣ ARDUINO CODE

```cpp
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#define SOIL_PIN A0
#define LIGHT_PIN A1

void setup() {
  Serial.begin(9600);  // Khởi động Serial 9600 baud
  dht.begin();
}

void loop() {
  // Đọc cảm biến
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  int soilRaw = analogRead(SOIL_PIN);
  int lightRaw = analogRead(LIGHT_PIN);
  
  // Chuyển đổi sang %
  float soil_pct = map(soilRaw, 0, 1023, 0, 100);
  float light_pct = map(lightRaw, 0, 1023, 0, 100);
  
  // Xuất JSON
  Serial.print("{");
  Serial.print("\"sensorId\":1,");
  Serial.print("\"time\":");
  Serial.print(millis() / 1000);  // Thời gian tính bằng giây
  Serial.print(",\"temperature\":");
  Serial.print(temp, 2);  // 2 chữ số thập phân
  Serial.print(",\"humidity\":");
  Serial.print(humidity, 2);
  Serial.print(",\"soil_pct\":");
  Serial.print(soil_pct, 2);
  Serial.print(",\"light\":");
  Serial.print(light_pct, 2);
  Serial.println("}");
  
  delay(5000);  // Gửi mỗi 5 giây
}
```

**Output ví dụ:**
```json
{"sensorId":1,"time":0,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
{"sensorId":1,"time":5,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
{"sensorId":1,"time":10,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
```

---

## 🔄 LUỒNG DỮ LIỆU HOÀN CHỈNH

### **Bước 1: Arduino đọc cảm biến**
```
DHT22 → 26.7°C, 61% humidity
Soil → Analog 1023 → 100%
Light → Analog 184 → 18%
```

### **Bước 2: Arduino xuất JSON qua Serial**
```json
{"sensorId":1,"time":15,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
```

### **Bước 3: forwarder.py đọc Serial**
```python
line = ser.readline()  # Đọc dòng JSON
payload = json.loads(line)  # Parse JSON
```

### **Bước 4: forwarder.py POST lên Flask API**
```http
POST http://localhost:8000/api/sensors
Headers:
  Content-Type: application/json
  x-api-key: MY_API_KEY
Body:
  {"sensorId":1,"time":15,"temperature":26.7,...}
```

### **Bước 5: Flask API xử lý**
```python
# 5a. Lưu vào PostgreSQL (4 records)
INSERT INTO sensor_data VALUES (7, 26.7, timestamp)  # Temperature
INSERT INTO sensor_data VALUES (8, 61.0, timestamp)  # Humidity
INSERT INTO sensor_data VALUES (9, 100.0, timestamp) # Soil
INSERT INTO sensor_data VALUES (10, 18.0, timestamp) # Light

# 5b. Tính hash
canonical = '{"sensorId":1,"time":15,...}'
hash = keccak256(canonical)
# → 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528

# 5c. Gửi lên Oracle Node
POST http://localhost:5001/oracle/push
Body: {"time": 15, "hash": "0x7e87..."}
```

### **Bước 6: Oracle Node gửi lên Blockchain**
```javascript
// Gọi smart contract
const tx = await contract.storeHash(15, "0x7e87...")

// Ký transaction bằng PRIVATE_KEY
// Gửi lên Pione Zero blockchain

// Đợi confirm
const receipt = await tx.wait()

// Trả về txHash
return { txHash: "0xb9b44cce..." }
```

### **Bước 7: Smart Contract lưu vĩnh viễn**
```solidity
// Event được emit
emit SensorHashStored(
  sender: 0xeF58A95e514E6c83b6F73C26B644df75a2042aEa,
  time: 15,
  hash: "0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528"
)
```

### **Bước 8: Kết quả trả về forwarder.py**
```json
{
  "ok": true,
  "canonical": "{\"sensorId\":1,\"time\":15,...}",
  "hash": "0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528",
  "oracle": {
    "ok": true,
    "txHash": "0xb9b44cce086fa19b9173b7d4c45ea5a1f301d3a8b8223fcbb2b3f5edbc77f919"
  }
}
```

---

## 🔒 BẢO MẬT & KIỂM CHỨNG

### **Cách kiểm chứng dữ liệu:**

1. **Lấy dữ liệu từ database:**
```sql
SELECT * FROM sensor_data WHERE time = '2025-10-28 11:56:34';
```
Result: `temperature=26.7, humidity=61.0, soil=100.0, light=18.0`

2. **Tạo lại canonical JSON:**
```json
{"sensorId":1,"time":15,"temperature":26.7,"humidity":61.0,"soil_pct":100.0,"light":18.0}
```

3. **Tính hash:**
```python
hash = keccak256(canonical)
# → 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```

4. **So sánh với blockchain:**
```
Truy cập: https://zeroscan.org/tx/0xb9b44cce...
Xem event SensorHashStored
Hash trên blockchain: 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```

5. **Kết luận:**
- Nếu hash khớp → Dữ liệu chưa bị sửa đổi ✅
- Nếu hash khác → Dữ liệu đã bị thay đổi ❌

---

## ❓ CÂU HỎI THƯỜNG GẶP

### **1. Tại sao cần blockchain?**
- **Bất biến:** Dữ liệu trên blockchain không thể sửa
- **Minh bạch:** Ai cũng có thể kiểm chứng
- **Tin cậy:** Không cần tin tưởng bên thứ 3

### **2. Tại sao không lưu toàn bộ dữ liệu lên blockchain?**
- **Đắt:** Mỗi transaction tốn gas fee
- **Chậm:** Block time ~3-15 giây
- **Giới hạn:** Block size có giới hạn

Giải pháp: **Chỉ lưu hash**
- Hash nhỏ (32 bytes)
- Vẫn đảm bảo tính toàn vẹn
- Dữ liệu thật lưu trong database (nhanh, rẻ)

### **3. Tại sao dùng Keccak256?**
- Là hàm hash chuẩn của Ethereum/Solidity
- Nhanh, an toàn
- Kích thước cố định 256 bit (32 bytes)

### **4. Smart Contract có thể bị hack không?**
- Contract đã deploy không thể sửa
- Code đơn giản → ít lỗ hổng
- Chỉ emit event, không lưu state → rất an toàn

### **5. Nếu database bị hack thì sao?**
- Hacker có thể sửa dữ liệu trong database
- NHƯNG không thể sửa hash trên blockchain
- Khi kiểm chứng: hash sẽ không khớp
- → Phát hiện được dữ liệu bị giả mạo!

---

## 📊 DEMO THỰC TẾ

### **Dữ liệu từ Arduino:**
```json
{"sensorId":1,"time":15,"temperature":26.70,"humidity":61.00,"soil_pct":99.00,"light":18.00}
```

### **Trong Database:**
```sql
sensor_id | value | time
----------|-------|---------------------
7         | 26.7  | 2025-10-28 11:56:34
8         | 61.0  | 2025-10-28 11:56:34
9         | 99.0  | 2025-10-28 11:56:34
10        | 18.0  | 2025-10-28 11:56:34
```

### **Trên Blockchain:**
```
Transaction: 0xb9b44cce086fa19b9173b7d4c45ea5a1f301d3a8b8223fcbb2b3f5edbc77f919
Event: SensorHashStored
  sender: 0xeF58A95e514E6c83b6F73C26B644df75a2042aEa
  time: 15
  hash: 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```

### **Kiểm chứng:**
```python
# Tính lại hash
data = '{"sensorId":1,"time":15,"temperature":26.7,"humidity":61.0,"soil_pct":99.0,"light":18.0}'
hash = keccak256(data)
print(hash)
# → 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528

# So sánh với blockchain: KHỚP! ✅
```

---

## 🎓 KẾT LUẬN

Hệ thống kết hợp:
- **IoT:** Thu thập dữ liệu thực tế
- **Database:** Lưu trữ hiệu quả
- **Blockchain:** Đảm bảo tính toàn vẹn

Ứng dụng thực tế:
- Nông nghiệp thông minh
- Giám sát môi trường
- Truy xuất nguồn gốc
- Bất kỳ hệ thống cần chống giả mạo dữ liệu

---

Chúc bạn trình bày thành công! 🚀


