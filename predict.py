import joblib
import pandas as pd
import json
from datetime import datetime

# ── Load all models once at startup ───────────────────────────────────────────
fault_model   = joblib.load('models/saved_model.pkl')
le_fault      = joblib.load('models/label_encoder.pkl')
iso           = joblib.load('models/anomaly_detector.pkl')
maint_model   = joblib.load('models/maintenance_model.pkl')
kaggle_feats  = joblib.load('dataset/kaggle_features.pkl')
kaggle_encs   = joblib.load('dataset/kaggle_encoders.pkl')

SENSOR_FEATURES = ['rpm', 'temperature', 'vibration', 'voltage',
                   'tire_pressure', 'oil_level', 'mileage',
                   'temp_rpm_ratio', 'power_estimate']

# ── Health score ───────────────────────────────────────────────────────────────
def compute_health_score(row: dict) -> int:
    score = 100

    temp = row.get('temperature', 90)
    if temp > 120:    score -= 30
    elif temp > 110:  score -= 20
    elif temp > 100:  score -= 10

    vib = row.get('vibration', 0.3)
    if vib > 1.0:    score -= 25
    elif vib > 0.7:  score -= 15
    elif vib > 0.5:  score -= 8

    volt = row.get('voltage', 12.5)
    if volt < 11.0:   score -= 25
    elif volt < 11.5: score -= 15
    elif volt < 12.0: score -= 8

    psi = row.get('tire_pressure', 32)
    if psi < 22:    score -= 20
    elif psi < 26:  score -= 12
    elif psi < 28:  score -= 5

    oil = row.get('oil_level', 0.7)
    if oil < 0.1:   score -= 20
    elif oil < 0.2: score -= 12
    elif oil < 0.3: score -= 6

    rpm = row.get('rpm', 3000)
    if rpm > 5500:   score -= 10
    elif rpm > 4500: score -= 5

    return max(0, min(100, score))


# ── Maintenance urgency ────────────────────────────────────────────────────────
def compute_urgency(health_score: int, fault: str) -> str:
    """
    Determines maintenance urgency from vehicle condition.
    """

    if fault == "Normal" and health_score >= 85:
        return "None"

    if fault in (
        "Engine Overheating",
        "Battery Degradation"
    ):
        return "Immediate"

    if health_score < 50:
        return "Immediate"

    if health_score < 70:
        return "Soon"

    return "Routine"

FAULT_PENALTY = {
    "Engine Overheating": 35,
    "Battery Degradation": 30,
    "Low Oil Level": 20,
    "Tire Pressure Low": 15,
    "Suspension Issue": 25,
}

# ── Build kaggle feature row from sensor input ─────────────────────────────────
def build_kaggle_row(sensor_input: dict) -> dict:
    """
    Maps sensor input values to the Kaggle dataset feature space.
    Since live sensor data doesn't have all Kaggle columns,
    we derive/approximate them from what we have.
    """
    oil   = sensor_input.get('oil_level', 0.7)
    vib   = sensor_input.get('vibration', 0.3)
    volt  = sensor_input.get('voltage', 12.5)
    psi   = sensor_input.get('tire_pressure', 32)
    mile  = sensor_input.get('mileage', 50000)

    # Encode categoricals using saved encoders
    def enc(col, val):
        if col in kaggle_encs:
            try:
                return int(kaggle_encs[col].transform([val])[0])
            except:
                return 0
        return 0

    # Derive condition labels from sensor values
    tire_cond  = 'Worn Out' if psi < 26 else ('Good' if psi < 30 else 'New')
    brake_cond = 'Worn Out' if vib > 0.8 else ('Good' if vib > 0.4 else 'New')
    batt_stat  = 'Weak' if volt < 11.5 else ('Good' if volt < 12.2 else 'New')

    row = {
        'Vehicle_Model':      enc('Vehicle_Model', 'Car'),
        'Mileage':            mile,
        'Maintenance_History': enc('Maintenance_History',
                                  'Poor' if oil < 0.3 else ('Average' if oil < 0.6 else 'Good')),
        'Reported_Issues':    int(vib > 0.6) + int(volt < 11.5) + int(psi < 26) + int(oil < 0.2),
        'Vehicle_Age':        max(1, int(mile / 15000)),
        'Fuel_Type':          enc('Fuel_Type', 'Petrol'),
        'Transmission_Type':  enc('Transmission_Type', 'Manual'),
        'Engine_Size':        1500,
        'Odometer_Reading':   mile,
        'Owner_Type':         enc('Owner_Type', 'First'),
        'Insurance_Premium':  12000,
        'Service_History':    max(0, int(mile / 10000) - 1),
        'Accident_History':   0,
        'Fuel_Efficiency':    15.0,
        'Tire_Condition':     enc('Tire_Condition', tire_cond),
        'Brake_Condition':    enc('Brake_Condition', brake_cond),
        'Battery_Status':     enc('Battery_Status', batt_stat),
        'mileage_per_year':   mile / max(1, int(mile / 15000)),
        'issue_severity':     int(vib > 0.6) + int(volt < 11.5) + int(psi < 26) + int(oil < 0.2),
        'efficiency_per_cc':  15.0 / 1501,
    }
    return row


# ── Core predict function ─────────────────────────────────────────────────────
def predict(sensor_input: dict) -> dict:
    """
    Main prediction function — called by your teammate's dashboard.

    Required input keys:
        rpm, temperature, vibration, voltage,
        tire_pressure, oil_level, mileage

    Returns:
        {
            "health_score":        int   (0–100),
            "risk":                str   ("Low" | "Medium" | "High"),
            "fault":               str   (fault category or "Normal"),
            "is_anomaly":          bool,
            "needs_maintenance":   bool,
            "maintenance_urgency": str   ("None" | "Routine" | "Soon" | "Immediate"),
            "timestamp":           str   (ISO format)
        }
    """
    # ── Sensor feature row ─────────────────────────────────────────────────────
    rpm         = float(sensor_input['rpm'])
    temperature = float(sensor_input['temperature'])
    voltage     = float(sensor_input.get('voltage', 12.5))

    sensor_row = {
        'rpm':            rpm,
        'temperature':    temperature,
        'vibration':      float(sensor_input.get('vibration', 0.3)),
        'voltage':        voltage,
        'tire_pressure':  float(sensor_input.get('tire_pressure', 32)),
        'oil_level':      float(sensor_input.get('oil_level', 0.7)),
        'mileage':        float(sensor_input.get('mileage', 50000)),
        'temp_rpm_ratio': round(temperature / rpm, 6) if rpm else 0,
        'power_estimate': round((voltage * rpm) / 1000, 3),
    }

    X_sensor = pd.DataFrame([sensor_row])[SENSOR_FEATURES]

    # ── Fault classification ───────────────────────────────────────────────────
    pred_enc   = fault_model.predict(X_sensor)[0]
    fault_pred = le_fault.inverse_transform([pred_enc])[0]

    # ── Anomaly detection ──────────────────────────────────────────────────────
    is_anomaly = bool(iso.predict(X_sensor)[0] == -1)

    # ── Health score ───────────────────────────────────────────
    health = compute_health_score(sensor_row)

    if fault_pred in FAULT_PENALTY:
        health -= FAULT_PENALTY[fault_pred]

    if is_anomaly:
        health -= 10

    health = max(0, min(100, health))
    # ── Risk level ─────────────────────────────────────────────────────────────
    if health >= 80:
        risk = "Low"
    elif health >= 60:
        risk = "Medium"
    else:
        risk = "High"

    if fault_pred in (
        "Engine Overheating",
        "Battery Degradation"
    ):
        risk = "High"

    # ── Maintenance prediction (Kaggle model) ──────────────────────────────────
    kaggle_row  = build_kaggle_row(sensor_row)
    X_kaggle    = pd.DataFrame([kaggle_row])[kaggle_feats]
    needs_maint = bool(maint_model.predict(X_kaggle)[0])

    CRITICAL_FAULTS = {
        "Engine Overheating",
        "Battery Degradation"
    }

    if fault_pred in CRITICAL_FAULTS:
        needs_maint = True

    if health < 60:
        needs_maint = True

    # ── Maintenance urgency ────────────────────────────────────────────────────
    urgency = compute_urgency(
        health,
        fault_pred
    )

    if urgency != "None":
        needs_maint = True

    # ── Final JSON contract ────────────────────────────────────────────────────
    return {
        "health_score":        health,
        "risk":                risk,
        "fault":               fault_pred,
        "is_anomaly":          is_anomaly,
        "needs_maintenance":   needs_maint,
        "maintenance_urgency": urgency,
        "timestamp":           datetime.now().isoformat()
    }


# ── Live stream demo ───────────────────────────────────────────────────────────
def run_live_demo(scenario: str = 'normal', count: int = 3):
    from sensor_simulator import generate_reading
    import time

    print(f"\n🚗 Live stream | scenario: '{scenario}'")
    print("=" * 55)
    for _ in range(count):
        reading = generate_reading(scenario)
        result  = predict(reading)
        print(f"\n📡 RPM:{reading['rpm']:.0f}  Temp:{reading['temperature']:.1f}°C  "
              f"Vib:{reading['vibration']:.2f}  Volt:{reading['voltage']:.2f}V  "
              f"PSI:{reading['tire_pressure']:.1f}  Oil:{reading['oil_level']:.2f}")
        print(f"🔍 {json.dumps(result, indent=3)}")
        print("-" * 55)
        time.sleep(0.4)


# ── Self-test ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys

    print("🧪 Single prediction tests\n")

    test_cases = [
        {"label": "Healthy vehicle",
         "rpm": 3000, "temperature": 88,  "vibration": 0.25,
         "voltage": 12.6, "tire_pressure": 32, "oil_level": 0.8,  "mileage": 45000},

        {"label": "Engine overheating",
         "rpm": 4200, "temperature": 119, "vibration": 0.75,
         "voltage": 12.4, "tire_pressure": 31, "oil_level": 0.5,  "mileage": 87000},

        {"label": "Battery degradation",
         "rpm": 800,  "temperature": 85,  "vibration": 0.2,
         "voltage": 10.9, "tire_pressure": 32, "oil_level": 0.6,  "mileage": 120000},

        {"label": "Low oil level",
         "rpm": 2800, "temperature": 95,  "vibration": 0.4,
         "voltage": 12.5, "tire_pressure": 31, "oil_level": 0.08, "mileage": 73000},

        {"label": "Tire pressure low",
         "rpm": 2500, "temperature": 88,  "vibration": 0.3,
         "voltage": 12.5, "tire_pressure": 22, "oil_level": 0.7,  "mileage": 55000},

        {"label": "Suspension issue",
         "rpm": 3100, "temperature": 91,  "vibration": 1.1,
         "voltage": 12.4, "tire_pressure": 30, "oil_level": 0.5,  "mileage": 98000},
    ]

    for tc in test_cases:
        label = tc.pop("label")
        result = predict(tc)
        print(f"[{label}]")
        print(json.dumps(result, indent=2))
        print()

    scenario = sys.argv[1] if len(sys.argv) > 1 else "engine_overheating"
    run_live_demo(scenario=scenario, count=2)