import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

np.random.seed(42)

def make_normal(n=4000):
    return pd.DataFrame({
        'rpm':           np.random.normal(3000, 400, n).clip(1500, 4500),
        'temperature':   np.random.normal(88, 8, n).clip(70, 105),
        'vibration':     np.random.normal(0.25, 0.08, n).clip(0.05, 0.5),
        'voltage':       np.random.normal(12.5, 0.3, n).clip(12.0, 13.5),
        'tire_pressure': np.random.normal(32, 2, n).clip(28, 38),
        'oil_level':     np.random.uniform(0.4, 1.0, n),
        'mileage':       np.random.randint(5000, 150000, n),
        'fault':         0,
        'fault_type':    'Normal'
    })

def make_fault(fault_type, n=400):
    base = {
        'mileage': np.random.randint(5000, 180000, n),
        'fault':   1,
        'fault_type': fault_type
    }

    if fault_type == 'Engine Overheating':
        base.update({
            'rpm':           np.random.normal(4000, 300, n).clip(3200, 5500),
            'temperature':   np.random.uniform(112, 130, n),
            'vibration':     np.random.uniform(0.62, 1.0, n),
            'voltage':       np.random.normal(12.3, 0.3, n).clip(11.5, 13.0),
            'tire_pressure': np.random.normal(31, 2, n).clip(27, 36),
            'oil_level':     np.random.uniform(0.3, 0.7, n),
        })
    elif fault_type == 'Battery Degradation':
        base.update({
            'rpm':           np.random.uniform(500, 940, n),
            'temperature':   np.random.normal(85, 8, n).clip(70, 100),
            'vibration':     np.random.normal(0.2, 0.05, n).clip(0.05, 0.35),
            'voltage':       np.random.uniform(10.0, 11.4, n),
            'tire_pressure': np.random.normal(31, 2, n).clip(27, 36),
            'oil_level':     np.random.uniform(0.4, 0.8, n),
        })
    elif fault_type == 'Tire Pressure Low':
        base.update({
            'rpm':           np.random.normal(2800, 400, n).clip(1500, 4000),
            'temperature':   np.random.normal(88, 8, n).clip(70, 105),
            'vibration':     np.random.normal(0.3, 0.08, n).clip(0.1, 0.55),
            'voltage':       np.random.normal(12.5, 0.3, n).clip(11.8, 13.2),
            'tire_pressure': np.random.uniform(20, 24.9, n),
            'oil_level':     np.random.uniform(0.4, 0.9, n),
        })
    elif fault_type == 'Suspension Issue':
        base.update({
            'rpm':           np.random.normal(3000, 400, n).clip(1500, 4500),
            'temperature':   np.random.normal(90, 10, n).clip(70, 110),
            'vibration':     np.random.uniform(0.91, 1.5, n),
            'voltage':       np.random.normal(12.4, 0.3, n).clip(11.8, 13.2),
            'tire_pressure': np.random.normal(30, 3, n).clip(25, 37),
            'oil_level':     np.random.uniform(0.3, 0.8, n),
        })
    elif fault_type == 'Low Oil Level':
        base.update({
            'rpm':           np.random.normal(2800, 400, n).clip(1500, 4200),
            'temperature':   np.random.normal(96, 8, n).clip(80, 115),
            'vibration':     np.random.normal(0.38, 0.08, n).clip(0.2, 0.6),
            'voltage':       np.random.normal(12.4, 0.3, n).clip(11.8, 13.2),
            'tire_pressure': np.random.normal(31, 2, n).clip(27, 36),
            'oil_level':     np.random.uniform(0.0, 0.19, n),
        })

    return pd.DataFrame(base)

# Build dataset with guaranteed class sizes
frames = [
    make_normal(n=4000),
    make_fault('Engine Overheating',  n=400),
    make_fault('Battery Degradation', n=400),
    make_fault('Tire Pressure Low',   n=400),
    make_fault('Suspension Issue',    n=400),
    make_fault('Low Oil Level',       n=400),
]

df = pd.concat(frames, ignore_index=True).sample(frac=1, random_state=42)

# Feature engineering
df['temp_rpm_ratio'] = df['temperature'] / df['rpm']
df['power_estimate'] = df['voltage'] * df['rpm'] / 1000

# Stratified split
train, test = train_test_split(
    df, test_size=0.2, random_state=42, stratify=df['fault_type']
)

df.to_csv('dataset/raw_data.csv',  index=False)
train.to_csv('dataset/train.csv',  index=False)
test.to_csv('dataset/test.csv',    index=False)

print(f"✅ Dataset created: {len(df)} rows")
print(f"\nFull distribution:\n{df['fault_type'].value_counts()}")
print(f"\nTrain classes: {sorted(train['fault_type'].unique())}")
print(f"Test  classes: {sorted(test['fault_type'].unique())}")