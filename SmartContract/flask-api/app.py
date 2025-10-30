import os, json, time
from flask import Flask, request, jsonify
from sqlalchemy import create_engine, text
from eth_utils import keccak, to_bytes
import requests
from dotenv import load_dotenv

load_dotenv()
DB_URL = os.getenv("DB_URL")
API_KEY = os.getenv("API_KEY", "MY_API_KEY")
ORACLE_URL = os.getenv("ORACLE_URL", "http://localhost:5001/oracle/push")

TEMP_SENSOR_ID  = int(os.getenv("TEMP_SENSOR_ID", 7))
HUMID_SENSOR_ID = int(os.getenv("HUMID_SENSOR_ID", 8))
SOIL_SENSOR_ID  = int(os.getenv("SOIL_SENSOR_ID", 9))
LIGHT_SENSOR_ID = int(os.getenv("LIGHT_SENSOR_ID", 10))

ENGINE = create_engine(DB_URL, future=True)
app = Flask(__name__)

def canonical(obj: dict) -> str:
    # ưu tiên 'light', fallback 'light_pct'
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
    
    # FIX: Nếu time < 1000000000 (trước năm 2001), dùng thời gian hiện tại
    if epoch < 1000000000:
        epoch = int(time.time())
    
    t = b.get("temperature")
    h = b.get("humidity")
    s = b.get("soil_pct")
    l = b.get("light", b.get("light_pct"))

    with ENGINE.begin() as cn:
        if t is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": TEMP_SENSOR_ID, "val": float(t), "ts": epoch})
        if h is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": HUMID_SENSOR_ID, "val": float(h), "ts": epoch})
        if s is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": SOIL_SENSOR_ID, "val": float(s), "ts": epoch})
        if l is not None:
            cn.execute(text("""INSERT INTO public.sensor_data (sensor_id,value,"time")
                               VALUES (:sid,:val,to_timestamp(:ts))"""),
                       {"sid": LIGHT_SENSOR_ID, "val": float(l), "ts": epoch})

    # tính hash & đẩy oracle
    c = canonical(b)
    hsh = keccak_hex(c)
    try:
        r = requests.post(ORACLE_URL, json={"time": epoch, "hash": hsh}, timeout=20)
        j = r.json()
    except Exception as e:
        j = {"ok": False, "error": str(e)}
    return jsonify(ok=True, oracle=j, canonical=c, hash=hsh)

@app.get("/api/sensors/latest")
def latest():
    q = """
    WITH ranked AS (
      SELECT sensor_id, value, "time",
             ROW_NUMBER() OVER (PARTITION BY sensor_id ORDER BY "time" DESC) rn
      FROM public.sensor_data
    )
    SELECT s.id, s.sensor_name, s.type, r.value, r."time"
    FROM ranked r
    JOIN public.sensor s ON s.id = r.sensor_id
    WHERE r.rn = 1 AND s.id IN (:t,:h,:s,:l)
    ORDER BY s.id;
    """
    with ENGINE.connect() as cn:
        rows = cn.execute(text(q),
                {"t": TEMP_SENSOR_ID, "h": HUMID_SENSOR_ID, "s": SOIL_SENSOR_ID, "l": LIGHT_SENSOR_ID}).mappings().all()
    return jsonify([dict(r) for r in rows])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

