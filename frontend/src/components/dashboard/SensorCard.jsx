import {
  Activity,
  Thermometer,
  Battery,
  Gauge,
  Droplets,
  Waves,
} from "lucide-react";

export default function SensorCard({ title, value, unit, status }) {
  const statusColor = {
    Healthy: "text-lime-300",
    Warning: "text-amber-400",
    Critical: "text-red-400",
  };

  const icons = {
    RPM: <Activity size={16} />,
    Temperature: <Thermometer size={16} />,
    Voltage: <Battery size={16} />,
    "Tyre Pressure": <Gauge size={16} />,
    "Oil Level": <Droplets size={16} />,
    Vibration: <Waves size={16} />,
  };

  return (
    <div
      className={`
      bg-[#161616]
      border
      rounded-2xl
      p-4

      transition-all
      duration-300

      hover:-translate-y-1

      ${
        status === "Critical"
          ? "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)]"
          : "border-[#464545] hover:border-zinc-400 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
      }
      `}
    >
      {/* Header */}

      <div className="flex items-center gap-2 text-zinc-400 text-sm">
        {icons[title]}

        <span>{title}</span>
      </div>

      {/* Value */}

      <h3 className="text-2xl font-bold mt-4">
        {value}
        <span className="text-sm text-zinc-500 ml-1">{unit}</span>
      </h3>

      {/* Status */}

      <div className="flex items-center justify-between mt-4">
        <p className={`text-sm font-medium ${statusColor[status]}`}>
          ● {status}
        </p>

        <p className="text-xs text-zinc-500">Live</p>
      </div>
    </div>
  );
}
