// export default function AIInsightCard({ risk, fault, maintenance }) {
//   return (
//     <div className="bg-[#161616] border border-[#464545] rounded-2xl p-3 h-full">
//       <h2 className="text-xl font-semibold mb-5">AI Insights</h2>

//       <div className="space-y-4">
//         <div>
//           <p className="text-slate-400">Risk Level</p>

//           <h3 className="text-emerald-400 text-xl font-bold">{risk}</h3>
//         </div>

//         <div>
//           <p className="text-slate-400">Detected Fault</p>

//           <h3 className="text-lime-300 text-xl font-bold">{fault}</h3>
//         </div>

//         <div>
//           <p className="text-slate-400">Recommendation</p>

//           <p className="mt-2">Maintenance Status: {maintenance}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function AIInsightCard({ risk, fault, maintenance }) {
  return (
    <div className="bg-[#161616] border border-[#464545] rounded-2xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">System Overview</h2>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-zinc-400 text-sm">Risk Level</p>

          <div
            className={`
      px-3 py-1 rounded-full text-sm font-semibold

      ${
        risk === "LOW"
          ? "bg-lime-500/15 text-lime-300"
          : "bg-red-500/15 text-red-400"
      }
      `}
          >
            ● {risk}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-zinc-400 text-sm">Fault Status</p>

          <div
            className={`
      px-3 py-1 rounded-full text-sm font-semibold

      ${
        fault === "Normal"
          ? "bg-lime-500/15 text-lime-300"
          : "bg-red-500/15 text-red-400"
      }
      `}
          >
            {fault === "Normal" ? "✓ Normal" : "⚠ Critical"}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-zinc-400 text-sm">Maintenance</p>

          <div
            className={`
      px-3 py-1 rounded-full text-sm font-semibold

      ${
        maintenance === "Immediate"
          ? "bg-red-500/15 text-red-400"
          : "bg-lime-500/15 text-lime-300"
      }
      `}
          >
            {maintenance === "Immediate" ? "⚠ Immediate" : "✓ Not Required"}
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-5">
          <p className="text-zinc-500 text-sm mb-2">Last Alert</p>

          <p className="text-zinc-300">
            {risk === "HIGH"
              ? "Engine temperature exceeds safe threshold."
              : "No active alerts."}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div
          className="
    bg-black/20
    border border-zinc-800
    rounded-xl
    p-4
    "
        >
          <p className="text-sm text-zinc-500 mb-2">AI Insight</p>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {risk === "HIGH"
              ? "Potential engine overheating detected. Immediate inspection recommended."
              : "Vehicle operating within normal conditions. No critical anomalies detected."}
          </p>
        </div>
      </div>
    </div>
  );
}