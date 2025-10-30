# HƯỚNG DẪN CHẠY DỰ ÁN SMARTFARM IoT

## ✅ ĐÃ HOÀN THÀNH:
- ✅ Cài đặt Hardhat dependencies
- ✅ Compile smart contract thành công  
- ✅ Cài đặt Oracle Node dependencies
- ✅ Cài đặt Flask API dependencies

## 🔧 CẦN LÀM TIẾP:

### BƯỚC 1: Tạo file cấu hình

**1.1. Tạo file `flask-api/.env`:**
```bash
# Copy từ template
copy flask-api\env.sample flask-api\.env
```

Sau đó sửa nội dung file `flask-api/.env`:
```
DB_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/yourdb
API_KEY=MY_API_KEY
TEMP_SENSOR_ID=7
HUMID_SENSOR_ID=8
SOIL_SENSOR_ID=9
LIGHT_SENSOR_ID=10
ORACLE_URL=http://localhost:5001/oracle/push
```

**1.2. Tạo file `oracle-node/.env`:**
```bash
# Copy từ template  
copy oracle-node\env.sample oracle-node\.env
```

Sau đó sửa nội dung file `oracle-node/.env`:
```
RPC_URL=https://rpc.zeroscan.org
CHAIN_ID=5080
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
CONTRACT_ADDRESS=0xCONTRACT_AFTER_DEPLOY
PORT=5001
```

### BƯỚC 2: Chuẩn bị database PostgreSQL

**2.1. Tạo database:**
```sql
CREATE DATABASE yourdb;
```

**2.2. Tạo bảng sensor (nếu chưa có):**
```sql
CREATE TABLE public.sensor (
    id SERIAL PRIMARY KEY,
    field_id INTEGER,
    sensor_name VARCHAR(100),
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    type VARCHAR(50),
    status VARCHAR(20)
);

-- Thêm dữ liệu mẫu
INSERT INTO public.sensor (id, sensor_name, type) VALUES 
(7, 'Temperature', 'temperature'),
(8, 'Humidity', 'humidity'), 
(9, 'Soil Moisture', 'soil'),
(10, 'Light', 'light');
```

**2.3. Tạo bảng sensor_data:**
```sql
CREATE TABLE public.sensor_data (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER REFERENCES public.sensor(id),
    value DECIMAL(10,2),
    "time" TIMESTAMP
);
```

### BƯỚC 3: Deploy Smart Contract

**3.1. Lấy ví testnet Pione Zero:**
- Mở MetaMask
- Thêm network Pione Zero (Chain ID: 5080, RPC: https://rpc.zeroscan.org)
- Lấy testnet tokens từ faucet
- Copy private key

**3.2. Deploy contract:**
```bash
# Thay YOUR_PRIVATE_KEY bằng private key thật
RPC_URL=https://rpc.zeroscan.org CHAIN_ID=5080 PRIVATE_KEY=0xYOUR_PRIVATE_KEY npx hardhat run scripts/deploy.js --network pzo
```

**3.3. Copy địa chỉ contract vào `oracle-node/.env`:**
```
CONTRACT_ADDRESS=0x[địa_chỉ_contract_vừa_deploy]
```

### BƯỚC 4: Chạy các service

**4.1. Chạy Oracle Node (Terminal 1):**
```bash
cd oracle-node
npm start
```

**4.2. Chạy Flask API (Terminal 2):**
```bash
cd flask-api
python app.py
```

### BƯỚC 5: Test hệ thống

**5.1. Test bằng curl:**
```bash
curl -X POST http://localhost:8000/api/sensors -H "Content-Type: application/json" -H "x-api-key: MY_API_KEY" -d "{\"sensorId\":1,\"time\":1730000000,\"temperature\":26.8,\"humidity\":60.5,\"soil_pct\":42,\"light\":55}"
```

**5.2. Kiểm tra database:**
```sql
SELECT s.id, s.sensor_name, s.type, sd.value, sd."time"
FROM public.sensor_data sd
JOIN public.sensor s ON s.id = sd.sensor_id
WHERE s.id IN (7,8,9,10)
ORDER BY sd."time" DESC
LIMIT 10;
```

**5.3. Kiểm tra blockchain:**
- Vào https://zeroscan.org
- Tìm địa chỉ ví của bạn
- Xem events "SensorHashStored"

## 🎯 KẾT QUẢ MONG ĐỢI:

1. **Flask API** nhận JSON từ Arduino
2. **PostgreSQL** lưu 4 bản ghi sensor data  
3. **Oracle Node** ghi hash lên blockchain
4. **Blockchain** emit event SensorHashStored

## ❓ NẾU GẶP LỖI:

1. **Database connection error**: Kiểm tra DB_URL trong flask-api/.env
2. **Oracle connection error**: Kiểm tra RPC_URL và PRIVATE_KEY
3. **API key error**: Đảm bảo header x-api-key đúng
4. **Sensor ID error**: Kiểm tra sensor IDs có tồn tại trong database

## 📞 HỖ TRỢ:

Nếu gặp khó khăn ở bước nào, hãy cho tôi biết:
- Bạn đang ở bước nào?
- Lỗi gì xuất hiện?
- Database đã setup chưa?
- Có ví testnet chưa?


