package com.example.demo.DTO;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

public class CompleteProfileDTO {
    private String token;
    private PersonalInfoDTO personalInfo;
    private StatisticsDTO statistics;
    private List<ActivityDTO> recentActivities;

    public CompleteProfileDTO() {}

    public CompleteProfileDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public PersonalInfoDTO getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(PersonalInfoDTO personalInfo) {
        this.personalInfo = personalInfo;
    }

    public StatisticsDTO getStatistics() {
        return statistics;
    }

    public void setStatistics(StatisticsDTO statistics) {
        this.statistics = statistics;
    }

    public List<ActivityDTO> getRecentActivities() {
        return recentActivities;
    }

    public void setRecentActivities(List<ActivityDTO> recentActivities) {
        this.recentActivities = recentActivities;
    }

    @Data
    public static class StatisticsDTO {
        private Integer managedFarms;
        private Integer totalAreas;
        private Integer currentCrops;
        private Integer processedAlerts;
        private LocalDateTime lastLogin;
    }

    @Data
    public static class ActivityDTO {
        private Long id;
        private String action;
        private String description;
        private String icon;
        private LocalDateTime timestamp;
        private String type;
    }
}
