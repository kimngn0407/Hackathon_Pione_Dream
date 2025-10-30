-- Optional schema for additional mapping tables if needed in the future
-- This file is for reference only, the main tables are assumed to already exist

-- Example: If you need to add more sensor types or mappings
-- CREATE TABLE IF NOT EXISTS public.sensor_type_mapping (
--     id SERIAL PRIMARY KEY,
--     device_sensor_name VARCHAR(50),
--     db_sensor_id INTEGER REFERENCES public.sensor(id),
--     unit VARCHAR(20),
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- INSERT INTO public.sensor_type_mapping (device_sensor_name, db_sensor_id, unit) VALUES
-- ('temperature', 7, '°C'),
-- ('humidity', 8, '%'),
-- ('soil_pct', 9, '%'),
-- ('light', 10, '%');

