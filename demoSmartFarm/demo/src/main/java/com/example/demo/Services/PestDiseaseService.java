package com.example.demo.Services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class PestDiseaseService {

    private static final Logger logger = LoggerFactory.getLogger(PestDiseaseService.class);

    private final RestTemplate restTemplate;

    @Value("${pest.disease.service.url:https://kimngan0407-pest-disease.hf.space}")
    private String pestDiseaseApiUrl;

    public PestDiseaseService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Check if Pest & Disease AI API is healthy
     */
    public boolean isHealthy() {
        try {
            String url = pestDiseaseApiUrl + "/health";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                return "ok".equals(body.get("status")) && "loaded".equals(body.get("model"));
            }
            return false;

        } catch (RestClientException e) {
            logger.error("Pest & Disease API health check failed: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Get supported disease classes
     */
    public Map<String, Object> getClasses() {
        try {
            String url = pestDiseaseApiUrl + "/api/classes";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            }
            return createErrorResponse("Failed to get classes");

        } catch (RestClientException e) {
            logger.error("Error getting pest classes: {}", e.getMessage());
            return createErrorResponse("API connection error: " + e.getMessage());
        }
    }

    /**
     * Detect pest/disease from image
     */
    public Map<String, Object> detectDisease(MultipartFile imageFile) {
        if (imageFile == null || imageFile.isEmpty()) {
            return createErrorResponse("Image file is required");
        }

        try {
            String url = pestDiseaseApiUrl + "/api/detect";

            // Prepare multipart request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new ByteArrayResource(imageFile.getBytes()) {
                @Override
                public String getFilename() {
                    return imageFile.getOriginalFilename();
                }
            });

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Make API call
            logger.info("Calling Pest Detection API with image: {}", imageFile.getOriginalFilename());

            ResponseEntity<Map> response = restTemplate.postForEntity(
                url,
                requestEntity,
                Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                logger.info("Pest detection successful");
                return response.getBody();
            } else {
                return createErrorResponse("Detection failed");
            }

        } catch (IOException e) {
            logger.error("Error reading image file: {}", e.getMessage());
            return createErrorResponse("Error reading image: " + e.getMessage());
        } catch (RestClientException e) {
            logger.error("Error calling Pest Detection API: {}", e.getMessage());
            return createErrorResponse("API connection error: " + e.getMessage());
        }
    }

    /**
     * Detect disease from byte array (alternative method)
     */
    public Map<String, Object> detectDiseaseFromBytes(byte[] imageBytes, String filename) {
        try {
            String url = pestDiseaseApiUrl + "/api/detect";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new ByteArrayResource(imageBytes) {
                @Override
                public String getFilename() {
                    return filename != null ? filename : "image.jpg";
                }
            });

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, requestEntity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            }
            return createErrorResponse("Detection failed");

        } catch (RestClientException e) {
            logger.error("Error calling Pest Detection API: {}", e.getMessage());
            return createErrorResponse("API connection error: " + e.getMessage());
        }
    }

    private Map<String, Object> createErrorResponse(String errorMessage) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("error", errorMessage);
        return response;
    }
}

