import { Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative max-w-6xl mx-auto px-8 pt-12 pb-24">
      {/* Hero Content */}

      <div className="max-w-5xl mx-auto text-center mt-16">
        {/* Badge */}

        {/* <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 rounded-full px-4 py-2 text-sm text-zinc-300 mb-8">
          AI-Powered Vehicle Intelligence
        </div> */}

        {/* Heading */}

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Drive Smarter.
          <br />
          Detect Earlier.
          <br />
          <span className="text-[#DFFF00]">Prevent Failures.</span>
        </h1>

        {/* Description */}

        <p className="text-zinc-400 text-lg mt-8 max-w-3xl mx-auto">
          Monitor vehicle health in real time, detect faults, predict
          maintenance requirements, and reduce unexpected breakdowns using
          AI-powered edge analytics.
        </p>

        {/* CTA Buttons */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="
px-6 py-3
rounded-xl
font-medium
bg-[#181818]
border border-[#DFFF00]/40
text-white

hover:-translate-y-1
hover:border-[#DFFF00]
hover:bg-[#1f1f1f]
hover:shadow-[0_8px_30px_rgba(223,255,0,0.15)]

transition-all
duration-300
"
          >
            Launch Dashboard
          </button>

          <button
            className="
px-6 py-3
rounded-xl
font-medium

bg-[#181818]
border border-zinc-700
text-zinc-200

hover:-translate-y-1
hover:border-zinc-500
hover:bg-[#222222]
hover:text-white
hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]

active:translate-y-0

transition-all
duration-300
"
          >
            View Demo
          </button>
        </div>
      </div>

      {/* Dashboard Preview */}

      

      <div
        className="
  relative

  bg-[#121212]
  border border-zinc-800
  mt-12

  rounded-3xl
  overflow-hidden

  shadow-[0_0_60px_rgba(223,255,0,0.08)]

  hover:scale-[1.01]
  transition-all
  duration-500
  "
      >
        <img
          src="/dashboard-preview.png"
          alt="EdgeGuard Dashboard"
          className="w-full object-contain"
        />

        {/* Health Monitoring Badge */}
        <div
          className="
    absolute
    top-6
    left-6

    bg-black/80
    backdrop-blur-xl

    border border-lime-500/20
    rounded-2xl

    px-4 py-3
    "
        >
          <p className="text-xs text-zinc-500">Vehicle Health</p>

          <p className="text-lime-300 font-bold text-xl">Real-Time</p>
        </div>

        {/* AI Badge */}
        <div
          className="
    absolute
    top-6
    right-6

    bg-black/80
    backdrop-blur-xl

    border border-lime-500/20
    rounded-2xl

    px-4 py-3
    "
        >
          <p className="text-xs text-zinc-500">AI Analysis</p>

          <p className="text-lime-300 font-semibold">Active</p>
        </div>

        {/* Bottom Badge */}
        <div
          className="
    absolute
    bottom-6
    right-6

    bg-black/80
    backdrop-blur-xl

    border border-lime-500/20
    rounded-2xl

    px-4 py-3
    "
        >
          <p className="text-xs text-zinc-500">Predictive Maintenance</p>

          <p className="text-white font-semibold">Enabled</p>
        </div>
      </div>
    </section>
  );
}
