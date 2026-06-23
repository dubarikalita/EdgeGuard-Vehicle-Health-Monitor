export default function AlertPanel({ risk, fault, maintenance }) {
  const alerts =
    risk === "HIGH"
      ? [
          {
            level: "critical",
            message: "🔴 Engine Overheating Detected",
          },
          {
            level: "warning",
            message: "⚠ Immediate Maintenance Required",
          },
        ]
      : [
          {
            level: "info",
            message: "🟢 All systems operating normally",
          },
        ];

  return (
    <div className="bg-[#161616] border border-[#464545] rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Alerts</h2>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl font-medium transition-all duration-300 ${
              alert.level === "critical"
                ? "animate-pulse bg-red-900/30 border border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                : alert.level === "warning"
                  ? "bg-amber-900/30 border border-amber-500 text-amber-300"
                  : "bg-green-900/20 border border-green-500 text-green-300"
            }`}
          >
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
}
