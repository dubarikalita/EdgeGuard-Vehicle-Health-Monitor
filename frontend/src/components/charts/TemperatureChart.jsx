import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TemperatureChart({ data }) {

  const currentTemp = data[data.length - 1]?.temperature ?? 0;
  const previousTemp = data[data.length - 2]?.temperature ?? currentTemp;

  const tempChange =
    previousTemp === 0
      ? 0
      : (((currentTemp - previousTemp) / previousTemp) * 100).toFixed(1);


  const temperatures = data.map((d) => d.temperature);

  const avgTemp = (
    temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
  ).toFixed(1);

  const peakTemp = Math.max(...temperatures);

  

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
          <h2 className="text-xl font-semibold">Temperature Trend</h2>

          <span
            className={`
    px-2 py-1
    rounded-full
    text-xs
    font-medium

    ${
      tempChange > 0
        ? "bg-red-500/10 text-red-400"
        : "bg-lime-500/10 text-lime-300"
    }
  `}
          >
            {tempChange > 0 ? "↑" : "↓"} {Math.abs(tempChange)}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="text-right">
            <p className="text-xs text-zinc-500">Current</p>

            <p className="text-[#DFFF00] font-semibold">
              {data[data.length - 1]?.temperature}°C
            </p>
          </div> */}

          <div
            className="
      px-3 py-1
      rounded-full
      bg-lime-500/15
      text-lime-300
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
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DFFF00" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#DFFF00" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              interval="preserveStartEnd"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <YAxis domain={[0, 130]} tick={{ fill: "#94a3b8", fontSize: 12 }} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid #3f3f46",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
            />

            <Area
              type="natural"
              dataKey="temperature"
              fill="url(#tempGradient)"
              fillOpacity={1}
              stroke="none"
              tooltipType="none"
            />
            <Line
              type="natural"
              dataKey="temperature"
              stroke="#DFFF00"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                fill: "#DFFF00",
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

          <p className="text-white font-medium">{avgTemp}°C</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-zinc-500">Current</p>

          <p className="text-[#DFFF00] font-medium">{currentTemp}°C</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Peak</p>

          <p className="text-red-400 font-medium">{peakTemp}°C</p>
        </div>
      </div>
    </div>
  );
}
