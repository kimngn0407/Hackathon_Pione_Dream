package com.example.demo.DTO;

import lombok.Data;
import java.util.List;

@Data
public class AIPredictionResponse {
    private Boolean success;
    private List<List<Double>> prediction;
    private List<Double> inputFeatures;
    private String timestamp;
    private String error;
}

