import serial
import json
import requests
import time

# Serial port configuration - CHANGE PORT if needed
PORT = "COM4"  # Windows: COM3, COM4, COM5... - Check Device Manager
BAUD = 9600

# Flask API configuration
FLASK_URL = "http://localhost:8000/api/sensors"
API_KEY = "MY_API_KEY"

def main():
    try:
        # Initialize serial connection
        ser = serial.Serial(PORT, BAUD, timeout=1)
        print(f"Connected to {PORT} at {BAUD} baud")
        
        while True:
            try:
                # Read line from Arduino
                line = ser.readline().decode(errors="ignore").strip()
                
                if not line:
                    continue
                    
                print(f"Received: {line}")
                
                # Parse JSON from Arduino
                payload = json.loads(line)
                
                # Send to Flask API
                headers = {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                }
                
                response = requests.post(
                    FLASK_URL, 
                    json=payload, 
                    headers=headers, 
                    timeout=10
                )
                
                print(f"Response: {response.status_code} - {response.text}")
                
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
            except requests.exceptions.RequestException as e:
                print(f"Request error: {e}")
            except Exception as e:
                print(f"Unexpected error: {e}")
                
            time.sleep(1)  # Small delay between reads
            
    except serial.SerialException as e:
        print(f"Serial connection error: {e}")
        print("Make sure Arduino is connected and port is correct")

if __name__ == "__main__":
    main()

