-- SQL queries for testing and monitoring SmartFarm IoT system

-- 1. Check latest sensor data for all 4 sensors
SELECT s.id, s.sensor_name, s.type, sd.value, sd."time"
FROM public.sensor_data sd
JOIN public.sensor s ON s.id = sd.sensor_id
WHERE s.id IN (7,8,9,10)
ORDER BY sd."time" DESC
LIMIT 20;

-- 2. Get latest reading for each sensor type
WITH ranked AS (
  SELECT sensor_id, value, "time",
         ROW_NUMBER() OVER (PARTITION BY sensor_id ORDER BY "time" DESC) rn
  FROM public.sensor_data
)
SELECT s.id, s.sensor_name, s.type, r.value, r."time"
FROM ranked r
JOIN public.sensor s ON s.id = r.sensor_id
WHERE r.rn = 1 AND s.id IN (7,8,9,10)
ORDER BY s.id;

-- 3. Check sensor data count by sensor type
SELECT s.sensor_name, s.type, COUNT(*) as data_count
FROM public.sensor_data sd
JOIN public.sensor s ON s.id = sd.sensor_id
WHERE s.id IN (7,8,9,10)
GROUP BY s.id, s.sensor_name, s.type
ORDER BY s.id;

-- 4. Check data from last hour
SELECT s.sensor_name, s.type, sd.value, sd."time"
FROM public.sensor_data sd
JOIN public.sensor s ON s.id = sd.sensor_id
WHERE s.id IN (7,8,9,10)
  AND sd."time" >= NOW() - INTERVAL '1 hour'
ORDER BY sd."time" DESC;

-- 5. Check for any missing sensor data (sensors with no recent data)
SELECT s.id, s.sensor_name, s.type, MAX(sd."time") as last_reading
FROM public.sensor s
LEFT JOIN public.sensor_data sd ON s.id = sd.sensor_id
WHERE s.id IN (7,8,9,10)
GROUP BY s.id, s.sensor_name, s.type
HAVING MAX(sd."time") < NOW() - INTERVAL '1 hour' OR MAX(sd."time") IS NULL;

-- 6. Average values by sensor for last 24 hours
SELECT s.sensor_name, s.type, 
       AVG(sd.value) as avg_value,
       MIN(sd.value) as min_value,
       MAX(sd.value) as max_value,
       COUNT(*) as reading_count
FROM public.sensor_data sd
JOIN public.sensor s ON s.id = sd.sensor_id
WHERE s.id IN (7,8,9,10)
  AND sd."time" >= NOW() - INTERVAL '24 hours'
GROUP BY s.id, s.sensor_name, s.type
ORDER BY s.id;


