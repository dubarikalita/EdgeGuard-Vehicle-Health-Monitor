# 🚗 EdgeGuard - Real-Time Vehicle Health Monitoring & Predictive Maintenance

## Overview

EdgeGuard is an AI-powered vehicle health monitoring and predictive maintenance platform that combines Machine Learning with a modern web dashboard to monitor vehicle health in real time.

The backend processes live vehicle sensor data to classify faults, detect anomalies, calculate a vehicle health score, assess risk levels, and predict maintenance requirements. These insights are exposed through APIs and visualized on an interactive React dashboard, enabling users to monitor vehicle conditions proactively.

The system is designed for edge deployment and real-time monitoring, making it suitable for personal vehicles, electric vehicles (EVs), and fleet management applications.

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

## Dashboard & Visualization

The frontend provides an interactive dashboard for monitoring vehicle health and system predictions in real time.

Features include:

* Vehicle Health Score Gauge
* Live Sensor Monitoring Cards
* Fault & Risk Status Panel
* Maintenance Recommendation Alerts
* AI Insights Panel
* Historical Trend Charts
* Responsive Dashboard UI
* Fault Simulation for Testing

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
REST API
↓
React Frontend Dashboard
↓
Interactive Vehicle Monitoring

---

# Project Structure

```text
EdgeGuard/
│
├── backend/
│   ├── dataset/
│   │   ├── vehicle_maintenance.csv
│   │   ├── raw_data.csv
│   │   ├── train.csv
│   │   ├── test.csv
│   │   ├── kaggle_train.csv
│   │   ├── kaggle_test.csv
│   │   ├── kaggle_features.pkl
│   │   ├── kaggle_encoders.pkl
│   │   ├── generate_dataset.py
│   │   └── prepare_kaggle.py
│   │
│   ├── models/
│   │   ├── saved_model.pkl
│   │   ├── maintenance_model.pkl
│   │   ├── anomaly_detector.pkl
│   │   └── label_encoder.pkl
│   │
│   ├── sensor_simulator.py
│   ├── train_model.py
│   ├── optimize_model.py
│   ├── predict.py
│   └── requirements.txt
│  
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   └── images/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── SensorCard.jsx
│   │   │   ├── HealthGauge.jsx
│   │   │   ├── AlertPanel.jsx
│   │   │   ├── AIInsightCard.jsx
│   │   │   └── LiveChart.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── routes.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
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

# Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Recharts
- Lucide React

### Backend

- Python
- Scikit-learn
- XGBoost
- Pandas
- NumPy

### Machine Learning Models

- Random Forest Classifier
- Isolation Forest
- XGBoost

### Development Tools

- Git & GitHub
- VS Code

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd EdgeGuard
```

## Backend Setup

### Create Virtual Environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Backend Dependencies

```bash
pip install -r requirements.txt
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
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

## Run Frontend Dashboard

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend dashboard will be available locally and can be connected to the backend prediction service for real-time vehicle health monitoring.

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

### Backend

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

### Frontend

* Responsive landing page
* Interactive vehicle dashboard
* Health score gauge
* Live sensor cards
* Fault & maintenance alert panel
* Historical trend charts
* Modern dark UI
* Backend integration
* Fault simulation module

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

