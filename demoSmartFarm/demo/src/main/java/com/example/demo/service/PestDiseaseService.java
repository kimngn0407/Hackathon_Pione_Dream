package com.example.demo.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Service để tương tác với Python Pest and Disease Detection API
 */
@Service
public class PestDiseaseService {
    
    private final RestTemplate restTemplate;
    private final String API_BASE_URL = "http://localhost:5001/api";
    
    public PestDiseaseService() {
        this.restTemplate = new RestTemplate();
    }
    
    /**
     * Kiểm tra health của Python service
     */
    public Map<String, Object> checkHealth() {
        try {
            String url = "http://localhost:5001/health";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Python service không khả dụng: " + e.getMessage());
        }
    }
    
    /**
     * Lấy danh sách các loại bệnh
     */
    public Map<String, Object> getDiseaseClasses() {
        try {
            String url = API_BASE_URL + "/classes";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lấy danh sách bệnh: " + e.getMessage());
        }
    }
    
    /**
     * Phát hiện sâu bệnh từ ảnh
     * 
     * @param imageFile File ảnh upload
     * @return Kết quả phát hiện bệnh
     */
    public Map<String, Object> detectDisease(MultipartFile imageFile) {
        try {
            if (imageFile == null || imageFile.isEmpty()) {
                throw new IllegalArgumentException("File ảnh không được rỗng");
            }
            
            // Validate file type
            String contentType = imageFile.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("File phải là ảnh (jpg, png, etc.)");
            }
            
            String url = API_BASE_URL + "/detect";
            
            // Prepare multipart request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            
            // Create multipart body
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            
            // Convert MultipartFile to ByteArrayResource
            ByteArrayResource fileResource = new ByteArrayResource(imageFile.getBytes()) {
                @Override
                public String getFilename() {
                    return imageFile.getOriginalFilename();
                }
            };
            
            body.add("image", fileResource);
            
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            
            // Call Python API
            ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Map.class
            );
            
            return response.getBody();
            
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi đọc file ảnh: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi phát hiện bệnh: " + e.getMessage());
        }
    }
}
