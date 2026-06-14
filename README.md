# 🚗 EdgeGuard - Real-Time Vehicle Health Monitoring & Predictive Maintenance

## Overview

EdgeGuard is an AI-powered vehicle health monitoring system that analyzes live vehicle sensor data to detect faults, identify abnormal operating conditions, estimate vehicle health, assess risk levels, and predict maintenance requirements before major failures occur.

The system is designed for edge deployment and real-time monitoring, making it suitable for personal vehicles, EVs, and fleet management applications.

---

# Problem Statement

Vehicles often exhibit warning signs before breakdowns occur. Traditional maintenance approaches are reactive and depend on periodic inspections, resulting in:

* Unexpected failures
* Expensive repairs
* Increased downtime
* Reduced vehicle lifespan
* Safety risks

EdgeGuard addresses this problem by continuously monitoring vehicle health and providing predictive maintenance insights using Machine Learning.

---

# Features

## Real-Time Sensor Monitoring

Supports live vehicle telemetry including:

* RPM
* Engine Temperature
* Vibration
* Battery Voltage
* Tire Pressure
* Oil Level
* Mileage

---

## Fault Classification

Predicts vehicle fault categories:

* Normal
* Engine Overheating
* Battery Degradation
* Low Oil Level
* Tire Pressure Low
* Suspension Issue

Model Used:

* Random Forest Classifier

---

## Anomaly Detection

Detects unusual vehicle operating conditions using:

* Isolation Forest

Output:

* Anomaly Detected
* No Anomaly Detected

---

## Predictive Maintenance

Predicts whether maintenance is required before failure occurs.

Model Used:

* XGBoost

Output:

* Maintenance Required
* Maintenance Not Required

---

## Vehicle Health Score

Generates a vehicle health score from:

0 → 100

Where:

* 100 = Excellent Condition
* 0 = Critical Condition

Factors considered:

* Temperature
* Vibration
* Voltage
* Tire Pressure
* Oil Level
* RPM

---

## Risk Assessment

Provides risk categorization:

* Low
* Medium
* High

---

## Maintenance Urgency

Determines maintenance priority:

* None
* Routine
* Soon
* Immediate

---

# System Architecture

Live Sensor Data
↓
Feature Engineering
↓
Fault Classification Model
↓
Anomaly Detection Model
↓
Health Score Engine
↓
Risk Assessment
↓
Maintenance Prediction Model
↓
Maintenance Urgency Engine
↓
JSON Output

---

# Project Structure

```text
vehicle-health-monitor/
│
├── dataset/
│   ├── vehicle_maintenance.csv
│   ├── raw_data.csv
│   ├── train.csv
│   ├── test.csv
│   ├── kaggle_train.csv
│   ├── kaggle_test.csv
│   ├── kaggle_features.pkl
│   ├── kaggle_encoders.pkl
│   ├── generate_dataset.py
│   └── prepare_kaggle.py
│
├── models/
│   ├── saved_model.pkl
│   ├── maintenance_model.pkl
│   ├── anomaly_detector.pkl
│   └── label_encoder.pkl
│
├── sensor_simulator.py
├── train_model.py
├── optimize_model.py
├── predict.py
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

# Models Used

## Fault Classification

Purpose:

Predict fault category from sensor readings.

Algorithm:

Random Forest Classifier

Files:

```text
models/saved_model.pkl
models/label_encoder.pkl
```

---

## Anomaly Detection

Purpose:

Identify unusual sensor patterns.

Algorithm:

Isolation Forest

File:

```text
models/anomaly_detector.pkl
```

---

## Maintenance Prediction

Purpose:

Predict maintenance requirements.

Algorithm:

XGBoost

File:

```text
models/maintenance_model.pkl
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd vehicle-health-monitor
```

## Create Virtual Environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

Linux/Mac:

```bash
python3 -m venv venv
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Project

## Run Prediction Tests

```bash
python predict.py
```

This performs:

* Single-case testing
* Fault prediction testing
* Health score testing
* Live stream demonstration

---

## Run Live Sensor Simulation

Example:

```bash
python predict.py engine_overheating
```

Available scenarios:

```text
normal
engine_overheating
battery_degradation
low_oil
tire_pressure_low
suspension_issue
```

---

# Prediction API

Main function:

```python
predict(sensor_input)
```

Example Input:

```python
sensor_input = {
    "rpm": 3000,
    "temperature": 90,
    "vibration": 0.3,
    "voltage": 12.6,
    "tire_pressure": 32,
    "oil_level": 0.8,
    "mileage": 50000
}
```

Example Output:

```json
{
  "health_score": 95,
  "risk": "Low",
  "fault": "Normal",
  "is_anomaly": false,
  "needs_maintenance": false,
  "maintenance_urgency": "None",
  "timestamp": "2026-06-14T21:42:34"
}
```

---

# Current Status

## Completed

* Dataset preparation
* Feature engineering
* Fault classification model
* Anomaly detection model
* Maintenance prediction model
* Health score engine
* Risk assessment engine
* Maintenance urgency engine
* Live sensor simulator
* Prediction service
* Model optimization
* Local inference testing
* Real-time stream testing

---

# Integration Notes for Teammates

## Ready-to-Use Function

Use:

```python
from predict import predict
```

Example:

```python
result = predict(sensor_data)
```

The returned JSON already contains:

* Health Score
* Risk Level
* Fault Prediction
* Anomaly Status
* Maintenance Requirement
* Maintenance Urgency

No additional ML processing is required.

---

## Recommended Dashboard Components

### Vehicle Overview

Display:

* Health Score
* Risk Level
* Current Fault
* Maintenance Status

### Live Sensor Panel

Display:

* RPM
* Temperature
* Voltage
* Tire Pressure
* Oil Level
* Vibration

### Alert System

Show alerts for:

* High Risk
* Immediate Maintenance
* Anomaly Detection
* Critical Faults

### Analytics

Visualize:

* Health Score Trend
* Temperature Trend
* RPM Trend
* Fault Frequency
* Maintenance History

---

# Future Improvements

Possible future enhancements:

* FastAPI backend service
* WebSocket live streaming
* Fleet management support
* Mobile application
* Explainable AI (XAI)
* Deep Learning models
* Real vehicle sensor integration (OBD-II/CAN Bus)

