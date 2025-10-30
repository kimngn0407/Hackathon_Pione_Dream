package com.example.demo.DTO;

import lombok.Data;

@Data
public class AIHealthResponse {
    private String status;
    private String message;
    private Boolean modelLoaded;
    private String timestamp;
}

