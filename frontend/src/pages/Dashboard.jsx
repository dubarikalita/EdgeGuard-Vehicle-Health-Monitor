import DashboardLayout from "../layouts/DashboardLayout";
import MetricCard from "../components/dashboard/MetricCard";
import SensorCard from "../components/dashboard/SensorCard";
// import { sensorData } from "../data/mockData";
import HealthGauge from "../components/dashboard/HealthGauge";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import AlertPanel from "../components/dashboard/AlertPanel";
import { useState, useEffect } from "react";
import TemperatureChart from "../components/charts/TemperatureChart";
import HealthScoreChart from "../components/charts/HealthScoreChart";
import SensorPanel from "../components/dashboard/SensorPanel";


export default function Dashboard() {
  const [healthScore, setHealthScore] = useState(92);
  const [risk, setRisk] = useState("LOW");
  const [fault, setFault] = useState("Normal");
  const [maintenance, setMaintenance] = useState("Not Required");
  const [faultActive, setFaultActive] = useState(false);
  const [temperatureHistory, setTemperatureHistory] = useState([
    {
      time: "T1",
      temperature: 87,
    },
  ]);
  const [healthHistory, setHealthHistory] = useState([
    {
      time: "T1",
      health: 92,
    },
  ]);

  const [sensorData, setSensorData] = useState([
    {
      title: "RPM",
      value: 3200,
      unit: "",
      status: "Healthy",
    },
    {
      title: "Temperature",
      value: 87,
      unit: "°C",
      status: "Healthy",
    },
    {
      title: "Voltage",
      value: 12.6,
      unit: "V",
      status: "Healthy",
    },
    {
      title: "Tyre Pressure",
      value: 32,
      unit: "PSI",
      status: "Healthy",
    },
    {
      title: "Oil Level",
      value: 82,
      unit: "%",
      status: "Healthy",
    },
    {
      title: "Vibration",
      value: 0.32,
      unit: "",
      status: "Healthy",
    },
  ]);

  //   const [selectedSensor, setSelectedSensor] = useState(sensorData[0]);
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  
  const sendNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/logo.png",
      });
    }
  };

  const triggerEngineFault = () => {
    setHealthScore(45);

    setHealthHistory((prev) => {
      const lastPoint =
        prev.length > 0
          ? Number(prev[prev.length - 1].time.replace("T", ""))
          : 0;

      return [
        ...prev.slice(-9),
        {
          time: `T${lastPoint + 1}`,
          health: 63,
        },
      ];
    });

    setTemperatureHistory((prev) => {
      const lastPoint =
        prev.length > 0
          ? Number(prev[prev.length - 1].time.replace("T", ""))
          : 0;

      return [
        ...prev.slice(-9),
        {
          time: `T${lastPoint + 1}`,
          temperature: 112,
        },
      ];
    });

    setRisk("HIGH");

    setFault("Engine Overheating");

    setMaintenance("Immediate");

    sendNotification(
      "🚨 EdgeGuard Alert",
      "Engine Overheating Detected. Immediate maintenance required.",
    );

    setFaultActive(true);

    setSensorData((prev) =>
      prev.map((sensor) => {
        if (sensor.title === "Temperature") {
          return {
            ...sensor,
            value: 112,
            status: "Critical",
          };
        }

        return sensor;
      }),
    );
  };

  const resetSimulation = () => {
    setHealthScore(92);

    setHealthHistory([
      {
        time: "T1",
        health: 92,
      },
    ]);

    setFaultActive(false);

    setRisk("LOW");

    setFault("Normal");

    setMaintenance("Not Required");

    setSensorData([
      {
        title: "RPM",
        value: 3200,
        unit: "",
        status: "Healthy",
      },
      {
        title: "Temperature",
        value: 87,
        unit: "°C",
        status: "Healthy",
      },
      {
        title: "Voltage",
        value: 12.6,
        unit: "V",
        status: "Healthy",
      },
      {
        title: "Tyre Pressure",
        value: 32,
        unit: "PSI",
        status: "Healthy",
      },
      {
        title: "Oil Level",
        value: 82,
        unit: "%",
        status: "Healthy",
      },
      {
        title: "Vibration",
        value: 0.32,
        unit: "",
        status: "Healthy",
      },
    ]);
  };

  useEffect(() => {
    
    const interval = setInterval(() => {
      if (faultActive) return;

      setSensorData((prev) => {
        const updatedSensors = prev.map((sensor) => {
          if (sensor.title === "RPM") {
            return {
              ...sensor,
              value: sensor.value + Math.floor(Math.random() * 21 - 10),
            };
          }

          if (sensor.title === "Temperature") {
            return {
              ...sensor,
              value: sensor.value + Math.floor(Math.random() * 3 - 1),
            };
          }

          if (sensor.title === "Voltage") {
            return {
              ...sensor,
              value: Number(
                (sensor.value + (Math.random() * 0.2 - 0.1)).toFixed(1),
              ),
            };
          }

          if (sensor.title === "Vibration") {
            return {
              ...sensor,
              value: Number(
                (sensor.value + (Math.random() * 0.04 - 0.02)).toFixed(2),
              ),
            };
          }

          return sensor;
        });

        const tempSensor = updatedSensors.find(
          (sensor) => sensor.title === "Temperature",
        );

        if (tempSensor) {
          setTemperatureHistory((prevHistory) => {
            const lastPoint =
              prevHistory.length > 0
                ? Number(
                    prevHistory[prevHistory.length - 1].time.replace("T", ""),
                  )
                : 0;

            return [
              ...prevHistory.slice(-9),
              {
                time: `T${lastPoint + 1}`,
                temperature: tempSensor.value,
              },
            ];
          });
        }

        setHealthScore((prevScore) => {
          const change = Math.floor(Math.random() * 3) - 1;

          const newScore = Math.max(85, Math.min(95, prevScore + change));

          setHealthHistory((prevHistory) => {
            const lastPoint =
              prevHistory.length > 0
                ? Number(
                    prevHistory[prevHistory.length - 1].time.replace("T", ""),
                  )
                : 0;

            return [
              ...prevHistory.slice(-9),
              {
                time: `T${lastPoint + 1}`,
                health: newScore,
              },
            ];
          });

          return newScore;
        });

        return updatedSensors;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [faultActive]);

//      CARDS STYLING AND LAYOUT

  return (
    <DashboardLayout>
      <div className="flex justify-between items-start mb-6">
        <div className="grid grid-cols-4 gap-4 mt-5">
          <MetricCard
            title="Health Score"
            value={`${healthScore}%`}
            bg="bg-lime-300"
            text="text-black"
          />
          <MetricCard
            title="Risk Level"
            value={risk}
            bg="bg-lime-300"
            text="text-black"
          />
          <MetricCard
            title="Fault Status"
            value={fault === "Normal" ? "Normal" : "Critical"}
            bg="bg-lime-300"
            text="text-black"
          />
          <MetricCard
            title="Maintenance"
            value={maintenance === "Immediate" ? "Urgent" : "Normal"}
            bg="bg-lime-300"
            text="text-black"
          />
        </div>

        {/* TRIGGER FAULT & RESET BUTTONS */}

        <div className="flex gap-3 mt-4.5 justify-end">
          <button
            onClick={triggerEngineFault}
            className="
      px-4 py-2
      rounded-full

      bg-white/5
      backdrop-blur-md

      border border-red-500/20

      text-red-400
      text-sm
      font-medium

      hover:bg-red-500/10
      hover:border-red-400/50
      

      transition-all
      duration-300
      "
          >
            ⚠ Trigger Fault
          </button>

          <button
            onClick={resetSimulation}
            className="
      px-4 py-2
      rounded-full

      bg-white/5
      backdrop-blur-md

      border border-zinc-700

      text-zinc-300
      text-sm
      font-medium

      hover:bg-white/20
      hover:border-zinc-400

      transition-all
      duration-300
      "
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* SENSOR CARDS */}

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-3 text-zinc-200">
          Live Vehicle Sensors
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sensorData.map((sensor) => (
            <SensorCard key={sensor.title} {...sensor} />
          ))}
        </div>
      </div>

      {/* HEALTH GAUGE ,ALERT PANEL & AI INSIGHTS */}

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mt-8">
        {/* LEFT COLUMN */}

        <div className="lg:col-span-6 flex flex-col gap-4">
          <HealthGauge score={healthScore} />

          <AlertPanel risk={risk} fault={fault} maintenance={maintenance} />
        </div>

        {/* RIGHT COLUMN */}

        <div className="lg:col-span-4">
          <AIInsightCard risk={risk} fault={fault} maintenance={maintenance} />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <HealthGauge score={healthScore} />

        <AIInsightCard risk={risk} fault={fault} maintenance={maintenance} />
      </div>
      
    
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AlertPanel risk={risk} fault={fault} maintenance={maintenance} />

        <div className="bg-[#161616] border border-[#464545] rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Maintenance Status</h2>

          <div className="mt-4">
            <p className="text-slate-400">Urgency</p>

            <h3
              className={`text-2xl font-bold mt-2 ${
                maintenance === "Immediate" ? "text-red-400" : "text-lime-300"
              }`}
            >
              {maintenance}
            </h3>

            <p className="mt-3">
              {maintenance === "Immediate"
                ? "Immediate inspection required."
                : "No maintenance required at this time."}
            </p>
          </div>
        </div>
      </div> */}

      {/* TEMPERATURE & HEALTH SCORE CHARTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <TemperatureChart data={temperatureHistory} />

        <HealthScoreChart data={healthHistory} />
      </div>
    </DashboardLayout>
  );
}
