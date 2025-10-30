# 🎯 TỔNG QUAN HỆ THỐNG - GIẢI THÍCH ĐƠN GIẢN

## 📌 BẠN CÓ GÌ TRONG TAY?

### ✅ **Đã hoàn thành:**
1. **Smart Contract** đã deploy lên blockchain
2. **Oracle Node** đang chạy (cổng 5001)
3. **Flask API** đang chạy (cổng 8000)
4. **Arduino** đang gửi dữ liệu
5. **forwarder.py** đã chạy thành công

### ✅ **Dữ liệu đang chảy:**
```
Arduino → forwarder.py → Flask API → Database
                              ↓
                         Oracle Node → Blockchain
```

---

## 🎬 CHUYỆN GÌ ĐÃ XẢY RA? (Xem log của bạn)

### **1. Arduino gửi dữ liệu (mỗi 5 giây):**
```json
{"sensorId":1,"time":0,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
{"sensorId":1,"time":5,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
{"sensorId":1,"time":10,"temperature":26.70,"humidity":61.00,"soil_pct":100.00,"light":18.00}
{"sensorId":1,"time":15,"temperature":26.70,"humidity":61.00,"soil_pct":99.00,"light":18.00}
```

**Giải thích:**
- `sensorId: 1` = Arduino node số 1
- `time: 0, 5, 10, 15` = Thời gian (giây) kể từ khi Arduino khởi động
- `temperature: 26.70` = Nhiệt độ 26.7°C
- `humidity: 61.00` = Độ ẩm 61%
- `soil_pct: 100.00` = Độ ẩm đất 100%
- `light: 18.00` = Ánh sáng 18%

---

### **2. forwarder.py nhận và chuyển tiếp:**

**Ví dụ với bản ghi thứ 4:**
```
Received: {"sensorId":1,"time":15,"temperature":26.70,"humidity":61.00,"soil_pct":99.00,"light":18.00}
```

**forwarder.py làm gì?**
```python
1. Đọc JSON từ Arduino qua COM4
2. Parse JSON thành dict
3. Gửi POST request lên Flask API
4. In kết quả
```

**Response nhận được:**
```json
Response: 200 - {
  "canonical": "{\"sensorId\":1,\"time\":15,\"temperature\":26.7,\"humidity\":61.0,\"soil_pct\":99.0,\"light\":18.0}",
  "hash": "0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528",
  "ok": true,
  "oracle": {
    "ok": true,
    "txHash": "0xb9b44cce086fa19b9173b7d4c45ea5a1f301d3a8b8223fcbb2b3f5edbc77f919"
  }
}
```

**Giải thích từng phần:**

#### **a) canonical (Dữ liệu chuẩn hóa):**
```json
{"sensorId":1,"time":15,"temperature":26.7,"humidity":61.0,"soil_pct":99.0,"light":18.0}
```
- Là dữ liệu đã chuẩn hóa (thứ tự key cố định, không có space)
- Dùng để tính hash

#### **b) hash (Mã băm):**
```
0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```
- Là **"dấu vân tay"** của dữ liệu
- Tính bằng thuật toán Keccak256
- Nếu dữ liệu thay đổi 1 ký tự → hash hoàn toàn khác

**Ví dụ:**
```
Data:  {"sensorId":1,"time":15,"soil_pct":99.0}
Hash:  0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528

Data:  {"sensorId":1,"time":15,"soil_pct":98.0}  ← Chỉ đổi 99→98
Hash:  0x1a2b3c4d5e6f... ← Hash HOÀN TOÀN KHÁC!
```

#### **c) txHash (Transaction Hash):**
```
0xb9b44cce086fa19b9173b7d4c45ea5a1f301d3a8b8223fcbb2b3f5edbc77f919
```
- Là **mã giao dịch** trên blockchain
- Giống như **số tham chiếu** khi chuyển tiền ngân hàng
- Dùng để tra cứu trên blockchain explorer

**Xem chi tiết tại:**
https://zeroscan.org/tx/0xb9b44cce086fa19b9173b7d4c45ea5a1f301d3a8b8223fcbb2b3f5edbc77f919

---

### **3. Flask API làm gì với dữ liệu?**

#### **Bước 1: Lưu vào Database**
```sql
-- Tách 1 JSON thành 4 bản ghi
INSERT INTO sensor_data (sensor_id, value, time) VALUES (7, 26.7, timestamp);   -- Temperature
INSERT INTO sensor_data (sensor_id, value, time) VALUES (8, 61.0, timestamp);   -- Humidity
INSERT INTO sensor_data (sensor_id, value, time) VALUES (9, 99.0, timestamp);   -- Soil
INSERT INTO sensor_data (sensor_id, value, time) VALUES (10, 18.0, timestamp);  -- Light
```

**Tại sao tách ra?**
- Database thiết kế theo chuẩn normalized
- Mỗi sensor 1 dòng → dễ query, dễ phân tích

**Kiểm tra trong database:**
```sql
SELECT s.sensor_name, sd.value, sd.time 
FROM sensor_data sd
JOIN sensor s ON s.id = sd.sensor_id
WHERE sd.time = '2025-10-28 11:56:34'
ORDER BY s.id;
```

**Kết quả:**
```
sensor_name           | value | time
----------------------|-------|---------------------
Temperature Sensor    | 26.7  | 2025-10-28 11:56:34
Humidity Sensor       | 61.0  | 2025-10-28 11:56:34
Soil Moisture Sensor  | 99.0  | 2025-10-28 11:56:34
Light Sensor          | 18.0  | 2025-10-28 11:56:34
```

#### **Bước 2: Tính Hash**
```python
# 1. Chuẩn hóa JSON
canonical = '{"sensorId":1,"time":15,"temperature":26.7,"humidity":61.0,"soil_pct":99.0,"light":18.0}'

# 2. Tính Keccak256
hash = keccak256(canonical)
# → 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```

**Tại sao cần hash?**
- Blockchain đắt tiền (phải trả phí gas)
- Lưu toàn bộ JSON: ~200 bytes → tốn nhiều gas
- Lưu hash: 32 bytes → rẻ hơn 6 lần
- Hash vẫn đảm bảo tính toàn vẹn dữ liệu

#### **Bước 3: Gửi hash lên Oracle Node**
```javascript
POST http://localhost:5001/oracle/push
Body: {
  "time": 15,
  "hash": "0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528"
}
```

---

### **4. Oracle Node làm gì?**

```javascript
// 1. Nhận time và hash từ Flask API
const { time, hash } = req.body;

// 2. Gọi smart contract
const tx = await contract.storeHash(time, hash);

// 3. Đợi transaction được confirm
const receipt = await tx.wait();

// 4. Trả về txHash
return { ok: true, txHash: receipt.hash };
```

**Chi tiết transaction:**
- **From:** `0xeF58A95e514E6c83b6F73C26B644df75a2042aEa` (Ví của bạn)
- **To:** `0xec2d978F58A0505280Fa0b253f2e81ca553D34B8` (Smart Contract)
- **Function:** `storeHash(15, "0x7e87...")`
- **Gas Used:** ~50,000 gas
- **Gas Price:** ~1 Gwei

---

### **5. Smart Contract làm gì?**

```solidity
function storeHash(uint256 time, string calldata dataHash) external {
    emit SensorHashStored(msg.sender, time, dataHash);
}
```

**Chỉ có 1 dòng code!**
- Emit event `SensorHashStored`
- Event này được lưu **vĩnh viễn** trên blockchain
- **Không ai có thể xóa hoặc sửa**

**Event đã lưu:**
```
Event: SensorHashStored
  sender: 0xeF58A95e514E6c83b6F73C26B644df75a2042aEa
  time: 15
  hash: 0x7e8736ce593919683b5c6cd14ea30feaca83a9d52bdc51280a3544b984fc2528
```

---

## 🔐 TẠI SAO LÀM VẬY?

### **Kịch bản 1: Dữ liệu bình thường**

**Ngày 28/10/2025:**
```
Arduino → Database: temperature = 26.7°C
Hash tính được: 0x7e87...
Hash trên blockchain: 0x7e87...
✅ KHỚP → Dữ liệu đúng!
```

### **Kịch bản 2: Có người hack database**

**Ngày 30/10/2025:**
```
Hacker sửa database: 26.7°C → 40.0°C
Hash tính lại: 0x1a2b... ← KHÁC!
Hash trên blockchain: 0x7e87... ← Vẫn giữ nguyên
❌ KHÔNG KHỚP → Phát hiện giả mạo!
```

**Kết luận:**
- Blockchain = **Bảo vệ** cho database
- Không thể giả mạo mà không bị phát hiện

---

## 📊 TỔNG KẾT LUỒNG DỮ LIỆU

### **Thời điểm t=15 giây:**

```
┌──────────────────────────────────────────────────────────────┐
│ BƯỚC 1: ARDUINO ĐỌC CẢM BIẾN                                 │
└──────────────────────────────────────────────────────────────┘
DHT22    → 26.7°C, 61% humidity
Soil     → 99%
Light    → 18%
         ↓
┌──────────────────────────────────────────────────────────────┐
│ BƯỚC 2: ARDUINO GỬI JSON                                     │
└──────────────────────────────────────────────────────────────┘
Serial.println('{"sensorId":1,"time":15,...}')
         ↓ USB/COM4
┌──────────────────────────────────────────────────────────────┐
│ BƯỚC 3: FORWARDER.PY CHUYỂN TIẾP                             │
└──────────────────────────────────────────────────────────────┘
ser.readline() → Parse JSON → POST http://localhost:8000
         ↓ HTTP
┌──────────────────────────────────────────────────────────────┐
│ BƯỚC 4: FLASK API XỬ LÝ                                      │
└──────────────────────────────────────────────────────────────┘
├─→ Lưu PostgreSQL (4 records)
└─→ Tính hash → 0x7e87...
         ↓ HTTP
┌──────────────────────────────────────────────────────────────┐
│ BƯỚC 5: ORACLE NODE GỬI BLOCKCHAIN                           │
└──────────────────────────────────────────────────────────────┘
contract.storeHash(15, "0x7e87...")
         ↓ Web3 Transaction
┌──────────────────────────────────────────────────────────────┐
│ BƯỚC 6: BLOCKCHAIN LƯU VĨnh VIỄN                             │
└──────────────────────────────────────────────────────────────┘
Event SensorHashStored saved forever!
TxHash: 0xb9b44cce...
```

---

## 🎓 CÁC KHÁI NIỆM QUAN TRỌNG

### 1. **Serial Communication (Giao tiếp Serial)**
- Arduino gửi dữ liệu qua cổng USB
- Giống như "nói chuyện" qua dây
- Tốc độ: 9600 baud = 9600 bits/giây

### 2. **JSON (JavaScript Object Notation)**
- Định dạng dữ liệu dễ đọc
- Cả người và máy đều hiểu
```json
{"name": "Ngân", "age": 20}
```

### 3. **Hash (Mã băm)**
- "Dấu vân tay" của dữ liệu
- Thay đổi 1 bit → hash hoàn toàn khác
- Không thể đảo ngược (từ hash → data gốc)

### 4. **Blockchain**
- Sổ cái phân tán
- Dữ liệu lưu vĩnh viễn
- Không thể sửa đổi

### 5. **Smart Contract**
- Chương trình chạy trên blockchain
- Tự động thực thi
- Không cần bên thứ 3

### 6. **Oracle**
- "Cầu nối" giữa thế giới thực và blockchain
- Đưa dữ liệu từ ngoài vào blockchain

---

## 📈 DỮ LIỆU THỰC TẾ TỪ HỆ THỐNG CỦA BẠN

Dựa vào log, bạn đã gửi thành công **5 transactions:**

| Thời gian | Temp | Humidity | Soil | Light | TxHash |
|-----------|------|----------|------|-------|--------|
| time=0    | 26.7 | 61.0     | 100  | 18    | 0xdf258b92... |
| time=5    | 26.7 | 61.0     | 100  | 18    | 0x09ef4649... |
| time=10   | 26.7 | 61.0     | 100  | 18    | 0xed164368... |
| time=15   | 26.7 | 61.0     | **99** | 18  | 0xb9b44cce... |
| time=20   | 26.7 | 61.0     | 100  | 18    | ⚠️ Bị ngắt |

**Nhận xét:**
- Nhiệt độ, độ ẩm, ánh sáng ổn định
- Độ ẩm đất giảm 1% (100→99) ở t=15
- Transaction 5 bị ngắt (bạn nhấn Ctrl+C)

---

## ❓ CÂU HỎI TRÌNH BÀY

### **Q1: Tại sao cần blockchain?**
**A:** Để đảm bảo dữ liệu không bị giả mạo. Database có thể bị hack và sửa đổi, nhưng blockchain thì không.

### **Q2: Tại sao không lưu hết dữ liệu lên blockchain?**
**A:** Blockchain đắt tiền. Chỉ lưu hash (32 bytes) thay vì toàn bộ JSON (~200 bytes) tiết kiệm chi phí nhưng vẫn đảm bảo an toàn.

### **Q3: Làm sao kiểm tra dữ liệu có bị giả mạo?**
**A:** 
1. Lấy dữ liệu từ database
2. Tính hash
3. So sánh với hash trên blockchain
4. Nếu khớp → OK, nếu khác → Bị giả mạo

### **Q4: Ai trả phí gas?**
**A:** Ví `0xeF58A95e...` (ví bạn đã cung cấp private key). Mỗi transaction tốn ~0.00005 PZO.

### **Q5: Hệ thống có tự động không?**
**A:** Có! Arduino tự động gửi mỗi 5 giây, hệ thống tự động xử lý và lưu blockchain.

---

## 🚀 DEMO THỰC TẾ

**Xem transaction của bạn:**
https://zeroscan.org/tx/0xb9b44cce086fa19b9173b7d4c45ea5a1f301d3a8b8223fcbb2b3f5edbc77f919

**Xem smart contract:**
https://zeroscan.org/address/0xec2d978F58A0505280Fa0b253f2e81ca553D34B8

**Xem tất cả transactions của ví bạn:**
https://zeroscan.org/address/0xeF58A95e514E6c83b6F73C26B644df75a2042aEa

---

## 📚 TÀI LIỆU THAM KHẢO

1. `GIAI_THICH_CHI_TIET.md` - Giải thích code chi tiết
2. `HUONG_DAN_ARDUINO_USB.md` - Hướng dẫn setup Arduino
3. `README.md` - Tổng quan dự án

---

**Bạn còn phần nào chưa hiểu không? Hãy hỏi tôi cụ thể! 😊**


