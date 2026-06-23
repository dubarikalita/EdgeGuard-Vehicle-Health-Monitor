export default function DashboardShowcase() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            {/* <p className="text-[#DFFF00] font-medium mb-4">UNIFIED DASHBOARD</p> */}

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Monitor Everything
              <br />
              <span className="bg-linear-to-r from-[#DFFF00] to-lime-300 bg-clip-text text-transparent">
                From One Place
              </span>
            </h2>

            <p className="text-zinc-400 mt-6 text-lg">
              Access real-time vehicle health metrics, risk levels, maintenance
              insights and anomaly alerts through a centralized dashboard.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="font-semibold text-xl">Real-Time Telemetry</h3>
                <p className="text-zinc-400">
                  Monitor RPM, temperature, vibration, voltage and tyre
                  pressure.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl">Health Scoring</h3>
                <p className="text-zinc-400">
                  Track overall vehicle condition with intelligent health
                  indicators.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl">Smart Alerts</h3>
                <p className="text-zinc-400">
                  Receive instant notifications when critical issues are
                  detected.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              bg-[#141414]
              border border-zinc-700
              rounded-3xl
              overflow-hidden
              shadow-4xl
            "
          >
            {/* Replace later with actual screenshot */}

            <div
              className="
  bg-[#121212]
  border border-zinc-700
  rounded-[40px]
  overflow-hidden

  shadow-[0_0_50px_rgba(223,255,0,0.05)]
  "
            >
              <img
                src="/dashboard-preview.png"
                alt="EdgeGuard Dashboard"
                className="w-full lg:to-55% h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
