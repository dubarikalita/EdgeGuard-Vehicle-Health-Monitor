import pandas as pd
import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
from xgboost import XGBClassifier

# ══════════════════════════════════════════════════════════════════════════════
# PART A — Fault classifier (our synthetic sensor dataset)
# Predicts: fault type + health score + risk
# ══════════════════════════════════════════════════════════════════════════════

print("=" * 60)
print("PART A — Fault Classification Model (Sensor Data)")
print("=" * 60)

train_df = pd.read_csv('dataset/train.csv')
test_df  = pd.read_csv('dataset/test.csv')

SENSOR_FEATURES = ['rpm', 'temperature', 'vibration', 'voltage',
                   'tire_pressure', 'oil_level', 'mileage',
                   'temp_rpm_ratio', 'power_estimate']

X_train_s = train_df[SENSOR_FEATURES]
X_test_s  = test_df[SENSOR_FEATURES]

le_fault = LabelEncoder()
y_train_s = le_fault.fit_transform(train_df['fault_type'])
y_test_s  = le_fault.transform(test_df['fault_type'])

print(f"\n✅ Sensor data loaded")
print(f"   Train: {len(X_train_s)} | Test: {len(X_test_s)}")
print(f"   Fault classes: {list(le_fault.classes_)}")

# Train Random Forest
print("\n🌲 Training Fault Classifier (Random Forest)...")
rf_fault = RandomForestClassifier(
    n_estimators=100, max_depth=12,
    random_state=42, class_weight='balanced'
)
rf_fault.fit(X_train_s, y_train_s)
rf_acc = accuracy_score(y_test_s, rf_fault.predict(X_test_s))
print(f"   Accuracy: {rf_acc * 100:.2f}%")

# Train XGBoost
print("\n⚡ Training Fault Classifier (XGBoost)...")
xgb_fault = XGBClassifier(
    n_estimators=100, max_depth=6, learning_rate=0.1,
    eval_metric='mlogloss', random_state=42
)
xgb_fault.fit(X_train_s, y_train_s)
xgb_acc = accuracy_score(y_test_s, xgb_fault.predict(X_test_s))
print(f"   Accuracy: {xgb_acc * 100:.2f}%")

# Pick best
fault_model = rf_fault if rf_acc >= xgb_acc else xgb_fault
fault_name  = "Random Forest" if rf_acc >= xgb_acc else "XGBoost"
best_acc    = max(rf_acc, xgb_acc)
print(f"\n🏆 Best fault model: {fault_name} ({best_acc*100:.2f}%)")

print("\n📊 Classification Report:")
print(classification_report(
    y_test_s, fault_model.predict(X_test_s),
    target_names=le_fault.classes_
))

# Anomaly detector on sensor data
print("🔍 Training anomaly detector...")
iso_forest = IsolationForest(
    n_estimators=100, contamination=0.15, random_state=42
)
iso_forest.fit(X_train_s)
print("   Done.")

# ══════════════════════════════════════════════════════════════════════════════
# PART B — Maintenance classifier (real Kaggle vehicle dataset)
# Predicts: needs_maintenance (yes/no) + urgency
# ══════════════════════════════════════════════════════════════════════════════

print("\n" + "=" * 60)
print("PART B — Maintenance Prediction Model (Kaggle Dataset)")
print("=" * 60)

kaggle_train = pd.read_csv('dataset/kaggle_train.csv')
kaggle_test  = pd.read_csv('dataset/kaggle_test.csv')
KAGGLE_FEATURES = joblib.load('dataset/kaggle_features.pkl')

X_train_k = kaggle_train[KAGGLE_FEATURES]
X_test_k  = kaggle_test[KAGGLE_FEATURES]
y_train_k = kaggle_train['Need_Maintenance']
y_test_k  = kaggle_test['Need_Maintenance']

print(f"\n✅ Kaggle data loaded")
print(f"   Train: {len(X_train_k)} | Test: {len(X_test_k)}")

# Train Random Forest
print("\n🌲 Training Maintenance Classifier (Random Forest)...")
rf_maint = RandomForestClassifier(
    n_estimators=100, max_depth=12,
    random_state=42, class_weight='balanced'
)
rf_maint.fit(X_train_k, y_train_k)
rf_m_acc = accuracy_score(y_test_k, rf_maint.predict(X_test_k))
print(f"   Accuracy: {rf_m_acc * 100:.2f}%")

# Train XGBoost
print("\n⚡ Training Maintenance Classifier (XGBoost)...")
xgb_maint = XGBClassifier(
    n_estimators=100, max_depth=6, learning_rate=0.1,
    eval_metric='mlogloss', random_state=42
)
xgb_maint.fit(X_train_k, y_train_k)
xgb_m_acc = accuracy_score(y_test_k, xgb_maint.predict(X_test_k))
print(f"   Accuracy: {xgb_m_acc * 100:.2f}%")

# Pick best
maint_model  = rf_maint if rf_m_acc >= xgb_m_acc else xgb_maint
maint_name   = "Random Forest" if rf_m_acc >= xgb_m_acc else "XGBoost"
best_m_acc   = max(rf_m_acc, xgb_m_acc)
print(f"\n🏆 Best maintenance model: {maint_name} ({best_m_acc*100:.2f}%)")

print("\n📊 Classification Report:")
print(classification_report(y_test_k, maint_model.predict(X_test_k),
      target_names=['No Maintenance', 'Needs Maintenance']))

# ══════════════════════════════════════════════════════════════════════════════
# PART C — Save everything
# ══════════════════════════════════════════════════════════════════════════════

print("\n" + "=" * 60)
print("PART C — Saving All Models")
print("=" * 60)

os.makedirs('models', exist_ok=True)

joblib.dump(fault_model,  'models/saved_model.pkl',       compress=3)
joblib.dump(le_fault,     'models/label_encoder.pkl',     compress=3)
joblib.dump(iso_forest,   'models/anomaly_detector.pkl',  compress=3)
joblib.dump(maint_model,  'models/maintenance_model.pkl', compress=3)

print("\n💾 Saved:")
print("   models/saved_model.pkl        ← fault classifier")
print("   models/label_encoder.pkl      ← fault label encoder")
print("   models/anomaly_detector.pkl   ← anomaly detector")
print("   models/maintenance_model.pkl  ← maintenance predictor")

# ══════════════════════════════════════════════════════════════════════════════
# PART D — Smoke test both models together
# ══════════════════════════════════════════════════════════════════════════════

print("\n" + "=" * 60)
print("PART D — Combined Smoke Test")
print("=" * 60)

sample_sensor = X_test_s.iloc[0].to_dict()
pred_enc      = fault_model.predict(pd.DataFrame([sample_sensor]))[0]
fault_pred    = le_fault.inverse_transform([pred_enc])[0]

sample_kaggle = X_test_k.iloc[0].to_dict()
needs_maint   = bool(maint_model.predict(pd.DataFrame([sample_kaggle]))[0])

print(f"\n   Fault model  → {fault_pred}")
print(f"   Maint model  → {'Needs Maintenance' if needs_maint else 'No Maintenance'}")
print("\n✅ train_model.py complete. Ready for predict.py update.")