-- Script tạo database và bảng cho SmartFarm IoT
-- Chạy script này sau khi cài đặt PostgreSQL

-- 1. Tạo database
CREATE DATABASE smartfarm_db;

-- 2. Kết nối vào database smartfarm_db
\c smartfarm_db;

-- 3. Tạo bảng sensor
CREATE TABLE public.sensor (
    id SERIAL PRIMARY KEY,
    field_id INTEGER,
    sensor_name VARCHAR(100),
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    type VARCHAR(50),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Tạo bảng sensor_data
CREATE TABLE public.sensor_data (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER REFERENCES public.sensor(id),
    value DECIMAL(10,2),
    "time" TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Thêm dữ liệu mẫu cho 4 sensor
INSERT INTO public.sensor (id, sensor_name, type, status) VALUES 
(7, 'Temperature Sensor', 'temperature', 'active'),
(8, 'Humidity Sensor', 'humidity', 'active'), 
(9, 'Soil Moisture Sensor', 'soil', 'active'),
(10, 'Light Sensor', 'light', 'active');

-- 6. Kiểm tra dữ liệu
SELECT * FROM public.sensor WHERE id IN (7,8,9,10);

-- 7. Tạo index để tối ưu performance
CREATE INDEX idx_sensor_data_sensor_id ON public.sensor_data(sensor_id);
CREATE INDEX idx_sensor_data_time ON public.sensor_data("time");

-- 8. Hiển thị thông tin database
SELECT 
    'Database created successfully!' as message,
    current_database() as database_name,
    current_user as current_user;


