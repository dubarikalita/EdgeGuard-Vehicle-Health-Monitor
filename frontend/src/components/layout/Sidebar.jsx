import {
  LayoutDashboard,
  Activity,
  Wrench,
  BarChart3,
  AlertTriangle,
  Shield,
} from "lucide-react";

export default function Sidebar() {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Activity, label: "Diagnostics" },
    { icon: Wrench, label: "Maintenance" },
    { icon: BarChart3, label: "Analytics" },
    { icon: AlertTriangle, label: "Simulation" },
  ];

  return (
    <aside
      className="
  w-55
  m-5
  rounded-4xl
  bg-[#161616]
  border border-[#464545]

  flex
  flex-col

  shadow-lime-100
  "
    >
      {/* <aside className="w-55 bg-[#232323] "> */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="text-[#DFFF00]" size={24} />
          <h1 className="text-white text-xl font-bold tracking-tight">
            Edge<span className="text-[#DFFF00]">Guard</span>
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">Vehicle Health Monitor</p>
      </div>

      <nav className="px-4">
        {items.map((item) => (
          <button
            key={item.label}
            className="
w-full
flex
items-center
gap-3

px-4
py-3

rounded-xl

text-zinc-300

hover:bg-zinc-800
hover:text-lime-300
hover:translate-x-1

transition-all
duration-200

mb-2
"
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4">
        <div
          className="
    bg-black/20
    border border-zinc-800
    rounded-2xl
    p-4

    hover:border-lime-500/30
    transition-all
    duration-300
    "
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>

            <span className="text-sm font-medium text-lime-300">
              System Online
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-zinc-500">AI Status</p>

              <p className="text-sm text-white">Monitoring Active</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Models Running</p>

              <p className="text-sm text-white">3 / 3 Online</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800">
            <p className="text-xs text-zinc-500">EdgeGuard v1.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}