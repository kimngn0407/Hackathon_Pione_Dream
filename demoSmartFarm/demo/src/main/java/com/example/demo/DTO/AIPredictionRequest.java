package com.example.demo.DTO;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AIPredictionRequest {
    private Double temperature;
    private Double humidity;
    private Double soilMoisture;
    private Double ph;
    private Double rainfall;
    private Integer nitrogen;
    private Integer phosphorus;
    private Integer potassium;
}

