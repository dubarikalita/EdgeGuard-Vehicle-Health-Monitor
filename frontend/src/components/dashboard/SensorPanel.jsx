import { useState } from "react";

export default function SensorPanel({ sensors }) {
  const [hoveredSensor, setHoveredSensor] = useState(null);
  return (
    <div className="bg-[#161616] border border-zinc-800 rounded-3xl p-4">
      <h2 className="text-lg font-semibold mb-4">Sensors</h2>
      <div className="space-y-3">
        {sensors.map((sensor) => (
          <div
            key={sensor.title}
            onMouseEnter={() => setHoveredSensor(sensor.title)}
            onMouseLeave={() => setHoveredSensor(null)}
            className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-xl
      p-3
      transition-all
      duration-300
      hover:border-zinc-600
      "
          >
            <p className="font-medium">{sensor.title}</p>

            {hoveredSensor === sensor.title && (
              <div className="mt-3 text-sm text-zinc-400 animate-in fade-in duration-300">
                <p>
                  Value: {sensor.value} {sensor.unit}
                </p>

                <p
                  className={`mt-1 ${
                    sensor.status === "Critical"
                      ? "text-red-400"
                      : "text-[#CFFF04]"
                  }`}
                >
                  {sensor.status}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
