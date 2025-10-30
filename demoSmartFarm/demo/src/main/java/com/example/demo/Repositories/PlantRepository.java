package com.example.demo.Repositories;

import com.example.demo.Entities.PlantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends JpaRepository<PlantEntity, Long> {
    boolean existsByPlantName(String plantName);
}

