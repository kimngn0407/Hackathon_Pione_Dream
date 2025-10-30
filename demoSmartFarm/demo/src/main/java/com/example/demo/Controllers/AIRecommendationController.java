package com.example.demo.Controllers;

import com.example.demo.DTO.AIPredictionRequest;
import com.example.demo.DTO.AIPredictionResponse;
import com.example.demo.Services.AIRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIRecommendationController {

    @Autowired
    private AIRecommendationService aiService;

    /**
     * Check AI API health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        boolean healthy = aiService.isHealthy();
        
        Map<String, Object> response = new HashMap<>();
        response.put("healthy", healthy);
        response.put("message", healthy ? "AI API is ready" : "AI API is not available");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get crop recommendation prediction
     */
    @PostMapping("/recommend")
    public ResponseEntity<AIPredictionResponse> getRecommendation(
            @RequestBody AIPredictionRequest request) {
        
        AIPredictionResponse prediction = aiService.getPrediction(
            request.getTemperature(),
            request.getHumidity(),
            request.getSoilMoisture(),
            request.getPh(),
            request.getRainfall(),
            request.getNitrogen(),
            request.getPhosphorus(),
            request.getPotassium()
        );

        return ResponseEntity.ok(prediction);
    }

    /**
     * Get recommendation score only
     */
    @PostMapping("/score")
    public ResponseEntity<Map<String, Object>> getRecommendationScore(
            @RequestBody AIPredictionRequest request) {
        
        Double score = aiService.getRecommendationScore(
            request.getTemperature(),
            request.getHumidity(),
            request.getSoilMoisture(),
            request.getPh(),
            request.getRainfall(),
            request.getNitrogen(),
            request.getPhosphorus(),
            request.getPotassium()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("success", score != null);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get quick recommendation from basic sensor data
     */
    @GetMapping("/quick-recommend")
    public ResponseEntity<AIPredictionResponse> getQuickRecommendation(
            @RequestParam(required = false) Double temperature,
            @RequestParam(required = false) Double humidity,
            @RequestParam(required = false) Double soilMoisture) {
        
        AIPredictionResponse prediction = aiService.getPredictionFromSensorData(
            temperature, humidity, soilMoisture
        );

        return ResponseEntity.ok(prediction);
    }
}

