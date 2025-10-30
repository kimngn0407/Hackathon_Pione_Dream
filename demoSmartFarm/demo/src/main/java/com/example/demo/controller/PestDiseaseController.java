package com.example.demo.controller;

import com.example.demo.service.PestDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller cho Pest and Disease Detection
 */
@RestController
@RequestMapping("/api/pest-disease")
@CrossOrigin(
    origins = {"http://localhost:3000", "http://127.0.0.1:3000"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "false"
)
public class PestDiseaseController {
    
    @Autowired
    private PestDiseaseService pestDiseaseService;
    
    /**
     * Handle CORS preflight requests
     */
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }
    
    /**
     * Health check endpoint
     * 
     * GET /api/pest-disease/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        try {
            Map<String, Object> health = pestDiseaseService.checkHealth();
            return ResponseEntity.ok(health);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());
            return ResponseEntity.status(503).body(error);
        }
    }
    
    /**
     * Lấy danh sách các loại bệnh
     * 
     * GET /api/pest-disease/classes
     */
    @GetMapping("/classes")
    public ResponseEntity<Map<String, Object>> getClasses() {
        try {
            Map<String, Object> classes = pestDiseaseService.getDiseaseClasses();
            return ResponseEntity.ok(classes);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
    
    /**
     * Phát hiện sâu bệnh từ ảnh
     * 
     * POST /api/pest-disease/detect
     * 
     * @param imageFile File ảnh (multipart/form-data)
     * @return Kết quả phát hiện bệnh
     */
    @PostMapping("/detect")
    public ResponseEntity<Map<String, Object>> detectDisease(
            @RequestParam("image") MultipartFile imageFile
    ) {
        try {
            // Validate input
            if (imageFile == null || imageFile.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("error", "File ảnh không được rỗng");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Call service
            Map<String, Object> result = pestDiseaseService.detectDisease(imageFile);
            
            return ResponseEntity.ok(result);
            
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Lỗi server: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}
