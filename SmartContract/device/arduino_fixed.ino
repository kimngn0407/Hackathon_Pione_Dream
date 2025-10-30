/*
 * Arduino SmartFarm - PHIÊN BẢN SỬA LỖI
 * Sửa: Gửi Unix timestamp thay vì millis()
 */

#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#define SOIL_PIN A0
#define LIGHT_PIN A1

// QUAN TRỌNG: Thay đổi base_time thành thời gian hiện tại
// Unix timestamp hiện tại: https://www.unixtimestamp.com/
// Ví dụ: 28/10/2025 12:00:00 = 1730116800
unsigned long base_time = 1730116800;  // ← THAY ĐỔI GIÁ TRỊ NÀY!

void setup() {
  Serial.begin(9600);
  dht.begin();
  
  // Đợi 2 giây để DHT ổn định
  delay(2000);
}

void loop() {
  // Đọc cảm biến
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  int soilRaw = analogRead(SOIL_PIN);
  int lightRaw = analogRead(LIGHT_PIN);
  
  // Kiểm tra lỗi DHT
  if (isnan(temp) || isnan(humidity)) {
    Serial.println("{\"error\":\"DHT read failed\"}");
    delay(5000);
    return;
  }
  
  // Chuyển đổi sang %
  float soil_pct = map(soilRaw, 0, 1023, 0, 100);
  float light_pct = map(lightRaw, 0, 1023, 0, 100);
  
  // Tính Unix timestamp = base_time + số giây từ khi khởi động
  unsigned long current_time = base_time + (millis() / 1000);
  
  // Xuất JSON
  Serial.print("{");
  Serial.print("\"sensorId\":1,");
  Serial.print("\"time\":");
  Serial.print(current_time);  // ← Unix timestamp thật
  Serial.print(",\"temperature\":");
  Serial.print(temp, 2);
  Serial.print(",\"humidity\":");
  Serial.print(humidity, 2);
  Serial.print(",\"soil_pct\":");
  Serial.print(soil_pct, 2);
  Serial.print(",\"light\":");
  Serial.print(light_pct, 2);
  Serial.println("}");
  
  delay(5000);  // Gửi mỗi 5 giây
}


