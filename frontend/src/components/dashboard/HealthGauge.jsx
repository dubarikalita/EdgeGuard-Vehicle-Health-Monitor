import GaugeComponent from "react-gauge-component";

export default function HealthGauge({ score }) {
  return (
    <div className="bg-[#161616] border border-[#464545] rounded-2xl p-3">
      <h2 className="text-xl font-semibold mt-3 mb-4">Vehicle Health</h2>

      <div className="h-60">
        <GaugeComponent
          value={score}
          type="radial"
          arc={{
            colorArray: ["#ef4444", "#f59e0b", "#22c55e"],
            subArcs: [{ limit: 60 }, { limit: 80 }, { limit: 100 }],
            padding: 0.02,
            width: 0.25,
          }}
          pointer={{
            elastic: true,
            length: 0.65,
          }}
          labels={{
            valueLabel: {
              formatTextValue: () => `${score}%`,
              style: {
                fontSize: "20px",
                fill: "#ffffff",
              },
            },
          }}
        />
      </div>

      <div className="flex justify-center mt-2">
        <div
          className={`
      px-4 py-2
      rounded-full
      text-sm
      font-semibold

      ${
        score > 80
          ? "bg-lime-500/15 text-lime-300"
          : score > 60
            ? "bg-amber-500/15 text-amber-400"
            : "bg-red-500/15 text-red-400"
      }
    `}
        >
          ● {score > 80 ? "HEALTHY" : score > 60 ? "WARNING" : "CRITICAL"}
        </div>
      </div>

      <p className="text-center text-zinc-400 text-sm mt-4 max-w-xs mx-auto">
        {score > 80
          ? "Vehicle operating within optimal parameters."
          : score > 60
            ? "Minor degradation detected. Monitor closely."
            : "Critical condition detected. Immediate action required."}
      </p>

      {/* <p
        className={`text-center text-xl font-bold mt-2 ${
          score > 80
            ? "text-lime-300"
            : score > 60
              ? "text-amber-400"
              : "text-red-400"
        }`}
      >
        {score > 80 ? "Healthy" : score > 60 ? "Warning" : "Critical"}
      </p> */}
    </div>
  );
}
