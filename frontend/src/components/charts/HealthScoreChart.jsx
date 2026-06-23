import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function HealthScoreChart({ data }) {

  const currentHealth = data[data.length - 1]?.health ?? 0;
  const previousHealth = data[data.length - 2]?.health ?? currentHealth;

  const healthChange =
    previousHealth === 0
      ? 0
      : (((currentHealth - previousHealth) / previousHealth) * 100).toFixed(1);

  const healthValues = data.map((d) => d.health);

  const avgHealth = (
    healthValues.reduce((sum, score) => sum + score, 0) / healthValues.length
  ).toFixed(1);

  const minHealth = Math.min(...healthValues);

  
  return (
    <div
      className="
  bg-[#161616]
  border border-[#464545]
  rounded-2xl
  p-6

  transition-all
  duration-300

  hover:border-zinc-500
  "
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Vehicle Health Trend</h2>

          <span
            className={`
      px-2 py-1
      rounded-full
      text-xs
      font-medium

      ${
        healthChange >= 0
          ? "bg-lime-500/10 text-lime-300"
          : "bg-red-500/10 text-red-400"
      }
    `}
          >
            {healthChange >= 0 ? "↑" : "↓"} {Math.abs(healthChange)}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="text-right">
            <p className="text-xs text-zinc-500">Current</p>

            <p className="text-lime-400 font-semibold">
              {data[data.length - 1]?.health}%
            </p>
          </div> */}

          <div
            className="
      px-3 py-1
      rounded-full
      bg-lime-400/10
      text-lime-400
      text-xs
      font-medium
      "
          >
            ● LIVE
          </div>
        </div>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -40,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />

            <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 12 }} />

            <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid #3f3f46",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
            />

            <Line
              type="natural"
              dataKey="health"
              stroke="#a3e635"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                fill: "#A3E635",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-3 pt-2 border-t border-zinc-800">
        <div>
          <p className="text-xs text-zinc-500">Average</p>

          <p className="text-white font-medium">{avgHealth}%</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-zinc-500">Current</p>

          <p className="text-lime-300 font-medium">{currentHealth}%</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Lowest</p>

          <p className="text-red-400 font-medium">{minHealth}%</p>
        </div>
      </div>
    </div>
  );
}
