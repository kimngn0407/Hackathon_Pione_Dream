package com.example.demo.Services;

import com.example.demo.DTO.AIPredictionRequest;
import com.example.demo.DTO.AIPredictionResponse;
import com.example.demo.DTO.AIHealthResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

@Service
public class AIRecommendationService {

    private static final Logger logger = LoggerFactory.getLogger(AIRecommendationService.class);

    @Autowired
    @Qualifier("aiRestTemplate")
    private RestTemplate restTemplate;

    @Value("${crop.recommendation.service.url:http://localhost:5000}")
    private String aiApiUrl;

    @Value("${ai.api.enabled:true}")
    private boolean aiApiEnabled;

    /**
     * Check if AI API is healthy and model is loaded
     */
    public boolean isHealthy() {
        if (!aiApiEnabled) {
            logger.warn("AI API is disabled");
            return false;
        }

        try {
            String url = aiApiUrl + "/health";
            ResponseEntity<AIHealthResponse> response = restTemplate.getForEntity(
                url,
                AIHealthResponse.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                AIHealthResponse health = response.getBody();
                return health != null && Boolean.TRUE.equals(health.getModelLoaded());
            }

            return false;

        } catch (RestClientException e) {
            logger.error("AI API health check failed: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Get crop recommendation prediction from sensor data
     */
    public AIPredictionResponse getPrediction(Double temperature, Double humidity, 
                                              Double soilMoisture, Double ph,
                                              Double rainfall, Integer nitrogen, 
                                              Integer phosphorus, Integer potassium) {
        if (!aiApiEnabled) {
            logger.warn("AI API is disabled, skipping prediction");
            return createErrorResponse("AI API is disabled");
        }

        try {
            String url = aiApiUrl + "/predict";

            // Create request
            AIPredictionRequest request = new AIPredictionRequest(
                temperature, humidity, soilMoisture, ph,
                rainfall, nitrogen, phosphorus, potassium
            );

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<AIPredictionRequest> entity = new HttpEntity<>(request, headers);

            // Make API call
            logger.info("Calling AI API for prediction: {}", request);

            ResponseEntity<AIPredictionResponse> response = restTemplate.postForEntity(
                url,
                entity,
                AIPredictionResponse.class
            );

            AIPredictionResponse result = response.getBody();

            if (result != null && Boolean.TRUE.equals(result.getSuccess())) {
                logger.info("AI prediction successful: {}", result.getPrediction());
                return result;
            } else {
                logger.error("AI prediction failed: {}", result != null ? result.getError() : "Unknown error");
                return createErrorResponse(result != null ? result.getError() : "Prediction failed");
            }

        } catch (RestClientException e) {
            logger.error("Error calling AI API: {}", e.getMessage());
            return createErrorResponse("AI API connection error: " + e.getMessage());
        }
    }

    /**
     * Get recommendation from SensorData entity
     */
    public AIPredictionResponse getPredictionFromSensorData(
            Double temperature, Double humidity, Double soilMoisture) {
        // Use default values for missing data
        return getPrediction(
            temperature != null ? temperature : 25.0,
            humidity != null ? humidity : 70.0,
            soilMoisture != null ? soilMoisture : 50.0,
            6.5,  // Default pH
            100.0, // Default rainfall
            50,    // Default N
            30,    // Default P
            40     // Default K
        );
    }

    /**
     * Get crop recommendation score (0-100)
     */
    public Double getRecommendationScore(Double temperature, Double humidity, 
                                         Double soilMoisture, Double ph,
                                         Double rainfall, Integer nitrogen,
                                         Integer phosphorus, Integer potassium) {
        AIPredictionResponse response = getPrediction(
            temperature, humidity, soilMoisture, ph,
            rainfall, nitrogen, phosphorus, potassium
        );

        if (response != null && Boolean.TRUE.equals(response.getSuccess())) {
            // Extract score from prediction (adjust based on model output)
            if (response.getPrediction() != null && 
                !response.getPrediction().isEmpty() &&
                !response.getPrediction().get(0).isEmpty()) {
                
                Double score = response.getPrediction().get(0).get(0);
                return score * 100; // Convert to percentage
            }
        }

        return null;
    }

    private AIPredictionResponse createErrorResponse(String errorMessage) {
        AIPredictionResponse response = new AIPredictionResponse();
        response.setSuccess(false);
        response.setError(errorMessage);
        return response;
    }
}

