import os, json, time
from flask import Flask, request, jsonify
from eth_utils import keccak, to_bytes
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY", "MY_API_KEY")
ORACLE_URL = os.getenv("ORACLE_URL", "http://localhost:5001/oracle/push")

app = Flask(__name__)

def canonical(obj: dict) -> str:
    payload = {
        "sensorId": int(obj.get("sensorId", 0)),
        "time": int(obj.get("time", int(time.time()))),
        "temperature": obj.get("temperature", None),
        "humidity": obj.get("humidity", None),
        "soil_pct": obj.get("soil_pct", None),
        "light": obj.get("light", obj.get("light_pct", None))
    }
    return json.dumps(payload, separators=(",", ":"), ensure_ascii=False)

def keccak_hex(s: str) -> str:
    return "0x" + keccak(to_bytes(text=s)).hex()

@app.post("/api/sensors")
def ingest():
    if request.headers.get("x-api-key") != API_KEY:
        return jsonify(error="unauthorized"), 401

    b = request.get_json(force=True)
    epoch = int(b.get("time", time.time()))
    
    print(f"📊 Received sensor data: {b}")
    
    # Tính hash & đẩy oracle
    c = canonical(b)
    hsh = keccak_hex(c)
    
    print(f"🔐 Canonical JSON: {c}")
    print(f"🔐 Hash: {hsh}")
    
    try:
        r = requests.post(ORACLE_URL, json={"time": epoch, "hash": hsh}, timeout=20)
        j = r.json()
        print(f"⛓️ Oracle response: {j}")
    except Exception as e:
        j = {"ok": False, "error": str(e)}
        print(f"❌ Oracle error: {e}")
    
    return jsonify(ok=True, oracle=j, canonical=c, hash=hsh)

@app.get("/api/test")
def test():
    return jsonify(message="Flask API is running!", timestamp=int(time.time()))

if __name__ == "__main__":
    print("🚀 Starting Flask API (without database)...")
    print(f"🔑 API Key: {API_KEY}")
    print(f"🔗 Oracle URL: {ORACLE_URL}")
    app.run(host="0.0.0.0", port=8000, debug=True)


