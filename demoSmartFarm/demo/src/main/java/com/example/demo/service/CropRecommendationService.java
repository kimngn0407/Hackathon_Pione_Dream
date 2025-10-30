package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Service để gọi Python ML API cho crop recommendation
 */
@Service
public class CropRecommendationService {
    
    private static final Logger logger = LoggerFactory.getLogger(CropRecommendationService.class);
    private final RestTemplate restTemplate;
    private final String API_BASE_URL = "http://localhost:5000/api";
    
    public CropRecommendationService() {
        this.restTemplate = new RestTemplate();
    }
    
    /**
     * Gợi ý cây trồng dựa trên điều kiện môi trường
     * Model nhận 3 features: Temperature, Humidity, Soil_Moisture
     * 
     * @param temperature Nhiệt độ (°C)
     * @param humidity Độ ẩm không khí (%)
     * @param soilMoisture Độ ẩm đất (%)
     * @return Map chứa thông tin cây trồng được gợi ý
     */
    public Map<String, Object> recommendCrop(double temperature, double humidity, double soilMoisture) {
        try {
            String url = API_BASE_URL + "/recommend-crop";
            
            // Chuẩn bị request body - 3 FEATURES: Temperature, Humidity, Soil_Moisture
            Map<String, Object> request = new HashMap<>();
            request.put("temperature", temperature);
            request.put("humidity", humidity);
            request.put("soil_moisture", soilMoisture);
            
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            
            logger.info("Calling ML API for crop recommendation: Temperature={}, Humidity={}, SoilMoisture={}", 
                        temperature, humidity, soilMoisture);
            
            // Gọi API
            ResponseEntity<Map> response = restTemplate.exchange(
                url, 
                HttpMethod.POST, 
                entity, 
                Map.class
            );
            
            Map<String, Object> result = response.getBody();
            logger.info("ML API response: {}", result);
            
            return result;
            
        } catch (Exception e) {
            logger.error("Error calling ML API: {}", e.getMessage(), e);
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Không thể kết nối đến ML service: " + e.getMessage());
            error.put("recommended_crop", null);
            
            return error;
        }
    }
    
    /**
     * Gợi ý cây trồng batch cho nhiều mẫu
     */
    public Map<String, Object> recommendCropBatch(Map<String, Object> requestData) {
        try {
            String url = API_BASE_URL + "/recommend-crop/batch";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestData, headers);
            
            logger.info("Calling ML API for batch crop recommendation");
            
            ResponseEntity<Map> response = restTemplate.exchange(
                url, 
                HttpMethod.POST, 
                entity, 
                Map.class
            );
            
            return response.getBody();
            
        } catch (Exception e) {
            logger.error("Error calling ML API (batch): {}", e.getMessage(), e);
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Không thể kết nối đến ML service: " + e.getMessage());
            
            return error;
        }
    }
    
    /**
     * Lấy danh sách các loại cây trồng
     */
    public Map<String, Object> getCropList() {
        try {
            String url = API_BASE_URL + "/crops";
            
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            return response.getBody();
            
        } catch (Exception e) {
            logger.error("Error getting crop list: {}", e.getMessage(), e);
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Không thể lấy danh sách cây trồng: " + e.getMessage());
            
            return error;
        }
    }
    
    /**
     * Kiểm tra health của ML service
     */
    public Map<String, Object> checkHealth() {
        try {
            String url = "http://localhost:5000/health";
            
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            return response.getBody();
            
        } catch (Exception e) {
            logger.error("ML service is not available: {}", e.getMessage());
            
            Map<String, Object> error = new HashMap<>();
            error.put("status", "unhealthy");
            error.put("model_loaded", false);
            error.put("error", e.getMessage());
            
            return error;
        }
    }
}


