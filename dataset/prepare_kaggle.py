import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from imblearn.over_sampling import SMOTE

# ── Load ──────────────────────────────────────────────────────────────────────
df = pd.read_csv('dataset/vehicle_maintenance.csv')

print(f"✅ Loaded: {df.shape[0]} rows, {df.shape[1]} columns")
print(f"\nColumns: {list(df.columns)}")
print(f"\nMissing values:\n{df.isnull().sum()[df.isnull().sum() > 0]}")
print(f"\nTarget distribution:\n{df['Need_Maintenance'].value_counts()}")

# ── Clean ─────────────────────────────────────────────────────────────────────
# Drop columns that leak info or aren't useful for inference
drop_cols = ['Last_Service_Date', 'Warranty_Expiry_Date']
df.drop(columns=[c for c in drop_cols if c in df.columns], inplace=True)

# Fill missing values
for col in df.select_dtypes(include='number').columns:
    df[col].fillna(df[col].median(), inplace=True)
for col in df.select_dtypes(include='object').columns:
    df[col].fillna(df[col].mode()[0], inplace=True)

# ── Encode categoricals ───────────────────────────────────────────────────────
label_cols = ['Vehicle_Model', 'Maintenance_History', 'Fuel_Type',
              'Transmission_Type', 'Owner_Type', 'Tire_Condition',
              'Brake_Condition', 'Battery_Status']

encoders = {}
for col in label_cols:
    if col in df.columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

# ── Feature engineering ───────────────────────────────────────────────────────
if 'Mileage' in df.columns and 'Vehicle_Age' in df.columns:
    df['mileage_per_year'] = df['Mileage'] / (df['Vehicle_Age'] + 1)

if 'Reported_Issues' in df.columns and 'Accident_History' in df.columns:
    df['issue_severity'] = df['Reported_Issues'] + df['Accident_History'] * 2

if 'Fuel_Efficiency' in df.columns and 'Engine_Size' in df.columns:
    df['efficiency_per_cc'] = df['Fuel_Efficiency'] / (df['Engine_Size'] + 1)

print(f"\n✅ After engineering: {df.shape[1]} features")

# ── Balance with SMOTE ────────────────────────────────────────────────────────
FEATURES = [c for c in df.columns if c != 'Need_Maintenance']
X = df[FEATURES]
y = df['Need_Maintenance']

print(f"\nBefore SMOTE: {y.value_counts().to_dict()}")
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X, y)
print(f"After  SMOTE: {pd.Series(y_res).value_counts().to_dict()}")

# ── Train/test split ──────────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X_res, y_res, test_size=0.2, random_state=42
)

# Save
train_df = X_train.copy(); train_df['Need_Maintenance'] = y_train.values
test_df  = X_test.copy();  test_df['Need_Maintenance']  = y_test.values

train_df.to_csv('dataset/kaggle_train.csv', index=False)
test_df.to_csv('dataset/kaggle_test.csv',   index=False)

import joblib
joblib.dump(encoders, 'dataset/kaggle_encoders.pkl')
joblib.dump(FEATURES, 'dataset/kaggle_features.pkl')

print(f"\n✅ Saved kaggle_train.csv ({len(train_df)} rows)")
print(f"✅ Saved kaggle_test.csv  ({len(test_df)} rows)")
print("\n✅ Phase 1 (Kaggle dataset) ready.")