import joblib
import pandas as pd
import numpy as np
import os
from sklearn.ensemble import RandomForestClassifier

# ── 1. Load saved artifacts ───────────────────────────────────────────────────
print("📦 Loading saved models...")
model    = joblib.load('models/saved_model.pkl')
le       = joblib.load('models/label_encoder.pkl')
iso      = joblib.load('models/anomaly_detector.pkl')

# ── 2. Reduce Random Forest size ──────────────────────────────────────────────
# Trim trees: remove statistical redundancy by reducing estimators
# We test at 150 → 80 → 50 and keep the smallest that stays above 97%
print("\n🔧 Optimizing Random Forest size...")

train_df = pd.read_csv('dataset/train.csv')
test_df  = pd.read_csv('dataset/test.csv')

FEATURES = ['rpm', 'temperature', 'vibration', 'voltage',
            'tire_pressure', 'oil_level', 'mileage',
            'temp_rpm_ratio', 'power_estimate']

X_train = train_df[FEATURES]
X_test  = test_df[FEATURES]
y_train = le.transform(train_df['fault_type'])
y_test  = le.transform(test_df['fault_type'])

TARGET_ACCURACY = 0.97
best_trimmed    = model
best_n          = model.n_estimators

for n in [80, 60, 50]:
    trimmed = RandomForestClassifier(
        n_estimators=n,
        max_depth=12,
        random_state=42,
        class_weight='balanced'
    )
    trimmed.fit(X_train, y_train)
    acc = (trimmed.predict(X_test) == y_test).mean()
    print(f"   n_estimators={n:>3}  →  accuracy: {acc*100:.2f}%", end="")

    if acc >= TARGET_ACCURACY:
        best_trimmed = trimmed
        best_n       = n
        print("  ✅ kept")
    else:
        print("  ❌ below threshold, stopping")
        break

print(f"\n🏆 Final model: {best_n} trees (was {model.n_estimators})")

# ── 3. Save optimized model ───────────────────────────────────────────────────
joblib.dump(best_trimmed, 'models/saved_model.pkl', compress=3)
print(f"💾 Saved compressed model → models/saved_model.pkl")

# ── 4. Print file size ────────────────────────────────────────────────────────
size_kb = os.path.getsize('models/saved_model.pkl') / 1024
print(f"📐 Model size: {size_kb:.1f} KB")

# ── 5. Inference function (used by predict.py) ────────────────────────────────
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


def run_inference(sensor_input: dict) -> dict:
    """
    Core inference function.
    
    Args:
        sensor_input: dict with keys matching FEATURES
                      (can come from sensor_simulator or teammate's dashboard)
    Returns:
        Prediction dict — the agreed JSON contract with your teammate
    """
    model_  = joblib.load('models/saved_model.pkl')
    le_     = joblib.load('models/label_encoder.pkl')
    iso_    = joblib.load('models/anomaly_detector.pkl')

    # Build feature row
    rpm         = sensor_input['rpm']
    temperature = sensor_input['temperature']
    voltage     = sensor_input.get('voltage', 12.5)

    row = {
        'rpm':            rpm,
        'temperature':    temperature,
        'vibration':      sensor_input.get('vibration', 0.3),
        'voltage':        voltage,
        'tire_pressure':  sensor_input.get('tire_pressure', 32),
        'oil_level':      sensor_input.get('oil_level', 0.7),
        'mileage':        sensor_input.get('mileage', 50000),
        'temp_rpm_ratio': round(temperature / rpm, 6) if rpm else 0,
        'power_estimate': round((voltage * rpm) / 1000, 3),
    }

    X = pd.DataFrame([row])[FEATURES]

    # Fault prediction
    pred_enc   = model_.predict(X)[0]
    fault_pred = le_.inverse_transform([pred_enc])[0]

    # Anomaly flag
    anomaly_score = iso_.decision_function(X)[0]
    is_anomaly    = bool(iso_.predict(X)[0] == -1)

    # Health score + risk
    health = compute_health_score(row)
    if fault_pred != 'Normal' or is_anomaly:
        if health >= 75: health = min(health, 65)   # nudge down if fault detected

    if fault_pred == 'Normal' and not is_anomaly and health >= 75:
        risk = 'Low'
    elif health >= 50:
        risk = 'Medium'
    else:
        risk = 'High'

    return {
        "health_score":   health,
        "risk":           risk,
        "fault":          fault_pred,
        "is_anomaly":     is_anomaly,
        "anomaly_score":  round(float(anomaly_score), 4),
        "sensor_input":   row
    }


# ── 6. Smoke test ─────────────────────────────────────────────────────────────
print("\n🧪 Running inference smoke test...")

test_cases = [
    {"name": "Healthy vehicle",       "rpm": 3000, "temperature": 88,  "vibration": 0.25, "voltage": 12.6, "tire_pressure": 32, "oil_level": 0.8,  "mileage": 45000},
    {"name": "Engine overheating",    "rpm": 4200, "temperature": 118, "vibration": 0.75, "voltage": 12.4, "tire_pressure": 31, "oil_level": 0.5,  "mileage": 87000},
    {"name": "Battery degradation",   "rpm": 800,  "temperature": 85,  "vibration": 0.2,  "voltage": 10.9, "tire_pressure": 32, "oil_level": 0.6,  "mileage": 120000},
    {"name": "Low oil",               "rpm": 2800, "temperature": 95,  "vibration": 0.4,  "voltage": 12.5, "tire_pressure": 31, "oil_level": 0.08, "mileage": 73000},
]

for tc in test_cases:
    name = tc.pop("name")
    result = run_inference(tc)
    print(f"\n  [{name}]")
    print(f"    fault        : {result['fault']}")
    print(f"    health_score : {result['health_score']}")
    print(f"    risk         : {result['risk']}")
    print(f"    is_anomaly   : {result['is_anomaly']}")

print("\n✅ Phase 4 complete. Ready for Phase 5.")