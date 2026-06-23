export default function MetricCard({ title, value }) {
  return (
    <div
      className="
relative

bg-[#161616]
border border-[#464545]

rounded-2xl
h-15
w-full
p-2

overflow-hidden

transition-all
duration-200

hover:-translate-y-1
hover:border-lime-500/40
hover:shadow-[0_0_18px_rgba(223,255,0,0.08)]
"
    >
      {/* subtle shine */}

      <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <div className="mt-2">
        <h2
          className={`
  text-sm
  font-bold

  ${
    title === "HEALTH SCORE"
      ? "text-lime-300"
      : title === "RISK LEVEL" && value === "HIGH"
        ? "text-red-400"
        : title === "FAULT STATUS" && value !== "Normal"
          ? "text-red-400"
          : title === "MAINTENANCE" && value === "Urgent"
            ? "text-amber-400"
            : "text-white"
  }
  `}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}
