import random
import time
import json
from datetime import datetime

# --- Scenario definitions ---
SCENARIOS = {
    "normal": {
        "rpm":           (2500, 3500),
        "temperature":   (80, 100),
        "vibration":     (0.1, 0.4),
        "voltage":       (12.2, 13.0),
        "tire_pressure": (29, 35),
        "oil_level":     (0.5, 1.0),
    },
    "engine_overheating": {
        "rpm":           (3000, 5000),
        "temperature":   (112, 130),
        "vibration":     (0.6, 1.0),
        "voltage":       (12.0, 13.0),
        "tire_pressure": (29, 35),
        "oil_level":     (0.3, 0.7),
    },
    "battery_degradation": {
        "rpm":           (500, 950),
        "temperature":   (75, 95),
        "vibration":     (0.1, 0.3),
        "voltage":       (10.0, 11.4),
        "tire_pressure": (29, 35),
        "oil_level":     (0.4, 0.8),
    },
    "tire_pressure_low": {
        "rpm":           (2000, 3500),
        "temperature":   (80, 100),
        "vibration":     (0.2, 0.5),
        "voltage":       (12.2, 13.0),
        "tire_pressure": (20, 24),
        "oil_level":     (0.4, 0.9),
    },
    "suspension_issue": {
        "rpm":           (2000, 4000),
        "temperature":   (80, 105),
        "vibration":     (0.9, 1.5),
        "voltage":       (12.0, 13.0),
        "tire_pressure": (27, 35),
        "oil_level":     (0.3, 0.8),
    },
    "low_oil_level": {
        "rpm":           (2000, 3500),
        "temperature":   (88, 108),
        "vibration":     (0.3, 0.6),
        "voltage":       (12.0, 13.0),
        "tire_pressure": (29, 35),
        "oil_level":     (0.0, 0.19),
    },
}


def generate_reading(scenario: str = "normal", mileage: int = None) -> dict:
    """Generate one sensor reading for a given scenario."""
    if scenario not in SCENARIOS:
        raise ValueError(f"Unknown scenario '{scenario}'. Choose from: {list(SCENARIOS.keys())}")

    ranges = SCENARIOS[scenario]

    def rand(key):
        lo, hi = ranges[key]
        return round(random.uniform(lo, hi), 3)

    if mileage is None:
        mileage = random.randint(0, 200000)

    rpm         = rand("rpm")
    temperature = rand("temperature")

    reading = {
        "timestamp":      datetime.now().isoformat(),
        "scenario":       scenario,
        "rpm":            rpm,
        "temperature":    temperature,
        "vibration":      rand("vibration"),
        "voltage":        rand("voltage"),
        "tire_pressure":  rand("tire_pressure"),
        "oil_level":      rand("oil_level"),
        "mileage":        mileage,
        # Engineered features (must match train_model.py)
        "temp_rpm_ratio": round(temperature / rpm, 6),
        "power_estimate": round((rand("voltage") * rpm) / 1000, 3),
    }
    return reading


def stream(scenario: str = "normal", interval: float = 1.0, count: int = None):
    """
    Stream sensor readings to the console (and optionally loop forever).
    
    Args:
        scenario : which scenario to simulate
        interval : seconds between readings
        count    : how many readings to emit (None = run forever)
    """
    print(f"🚗 Starting simulator | Scenario: '{scenario}' | Interval: {interval}s")
    print("-" * 60)

    emitted = 0
    mileage = random.randint(5000, 150000)

    try:
        while True:
            mileage += random.randint(0, 2)   # odometer ticks slightly each reading
            reading = generate_reading(scenario, mileage)
            print(json.dumps(reading, indent=2))

            emitted += 1
            if count is not None and emitted >= count:
                break

            time.sleep(interval)

    except KeyboardInterrupt:
        print("\n⛔ Simulator stopped.")


# --- Quick self-test when run directly ---
if __name__ == "__main__":
    import sys

    # Usage: python sensor_simulator.py [scenario] [count]
    # e.g.   python sensor_simulator.py normal 3
    #        python sensor_simulator.py engine_overheating 2

    chosen_scenario = sys.argv[1] if len(sys.argv) > 1 else "normal"
    chosen_count    = int(sys.argv[2]) if len(sys.argv) > 2 else 3

    stream(scenario=chosen_scenario, interval=0.5, count=chosen_count)