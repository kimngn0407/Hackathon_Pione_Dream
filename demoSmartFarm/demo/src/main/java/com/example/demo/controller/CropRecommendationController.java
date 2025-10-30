package com.example.demo.controller;

import com.example.demo.dto.CropRecommendationRequest;
import com.example.demo.service.CropRecommendationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller cho Crop Recommendation
 */
@RestController
@RequestMapping("/api/crop-recommendation")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
        allowCredentials = "false")
public class CropRecommendationController {
    
    private static final Logger logger = LoggerFactory.getLogger(CropRecommendationController.class);
    
    @Autowired
    private CropRecommendationService cropRecommendationService;
    
    /**
     * Handle OPTIONS request for CORS preflight
     */
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }
    
    /**
     * Endpoint để gợi ý cây trồng dựa trên điều kiện môi trường
     * Model nhận 3 features: Temperature, Humidity, Soil_Moisture
     * 
     * POST /api/crop-recommendation/recommend
     * 
     * Request body:
     * {
     *   "temperature": 25.5,      // Nhiệt độ (°C)
     *   "humidity": 80.0,         // Độ ẩm không khí (%)
     *   "soil_moisture": 45.0     // Độ ẩm đất (%)
     * }
     * 
     * Response:
     * {
     *   "success": true,
     *   "recommended_crop": "Lúa",
     *   "crop_name_en": "rice",
     *   "confidence": 0.95,
     *   "input_data": {...}
     * }
     */
    @PostMapping("/recommend")
    public ResponseEntity<Map<String, Object>> recommend(@RequestBody CropRecommendationRequest request) {
        logger.info("Received crop recommendation request: {}", request);
        
        // Validate
        if (request.getTemperature() == null || request.getHumidity() == null || request.getSoil_moisture() == null) {
            throw new IllegalArgumentException("Missing required fields: temperature, humidity, soil_moisture");
        }
        
        Map<String, Object> result = cropRecommendationService.recommendCrop(
            request.getTemperature(),
            request.getHumidity(),
            request.getSoil_moisture()
        );
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Endpoint để gợi ý cây trồng cho nhiều mẫu (batch)
     * 
     * POST /api/crop-recommendation/recommend-batch
     */
    @PostMapping("/recommend-batch")
    public ResponseEntity<Map<String, Object>> recommendBatch(@RequestBody Map<String, Object> data) {
        Map<String, Object> result = cropRecommendationService.recommendCropBatch(data);
        return ResponseEntity.ok(result);
    }
    
    /**
     * Endpoint để lấy danh sách các loại cây trồng
     * 
     * GET /api/crop-recommendation/crops
     */
    @GetMapping("/crops")
    public ResponseEntity<Map<String, Object>> getCrops() {
        Map<String, Object> result = cropRecommendationService.getCropList();
        return ResponseEntity.ok(result);
    }
    
    /**
     * Endpoint để kiểm tra trạng thái ML service
     * 
     * GET /api/crop-recommendation/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> result = cropRecommendationService.checkHealth();
        return ResponseEntity.ok(result);
    }
}


