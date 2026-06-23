export default function ImpactMetrics() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid lg:grid-cols-4 gap-8 items-center">
          {/* LEFT CONTENT */}

          <div className="lg:col-span-1">
            <h2 className="text-2xl md:text-5xl font-bold leading-tight">
              Prevent
              <br />
              Breakdowns.
              <br />
              <span className="bg-linear-to-r from-[#DFFF00] to-lime-300 bg-clip-text text-transparent">
                Reduce Risk.
              </span>
            </h2>

            <p className="text-zinc-400 mt-6 text-lg">
              Transform vehicle telemetry into actionable intelligence with
              real-time monitoring, fault detection and predictive maintenance.
            </p>
          </div>

          {/* CARD 1 */}

          <div
            className="
              bg-linear-to-br
              from-[#222b12]
              to-[#141414]

              border border-[#DFFF00]/20
              rounded-4xl

              px-6 
              py-6

              hover:-translate-y-2
              hover:border-[#DFFF00]/40

              transition-all
              duration-300
            "
          >
            <h3 className="text-7xl font-bold text-[#DFFF00]">100</h3>

            <p className="mt-4 text-2xl font-semibold">Health Score</p>

            <p className="text-zinc-400 mt-3">
              Intelligent vehicle condition assessment generated from critical
              sensor data.
            </p>
          </div>

          {/* CARD 2 */}

          <div
            className="
              bg-linear-to-br
              from-[#222b12]
              to-[#141414]

              border border-[#DFFF00]/20
              rounded-4xl

              px-6 
              py-6

              hover:-translate-y-2
              hover:border-[#DFFF00]/40

              transition-all
              duration-300
            "
          >
            <h3 className="text-7xl font-bold text-[#DFFF00]">6+</h3>

            <p className="mt-4 text-2xl font-semibold">Fault Categories</p>

            <p className="text-zinc-400 mt-3">
              Detect overheating, battery degradation, tyre pressure issues and
              more.
            </p>
          </div>

          {/* CARD 3 */}

          <div
            className="
              bg-linear-to-br
              from-[#222b12]
              to-[#141414]

              border border-[#DFFF00]/20
              rounded-4xl

              px-6
              py-6

              hover:-translate-y-2
              hover:border-[#DFFF00]/40

              transition-all
              duration-300
            "
          >
            <h3 className="text-7xl font-bold text-[#DFFF00]">24/7</h3>

            <p className="mt-4 text-2xl font-semibold">Monitoring</p>

            <p className="text-zinc-400 mt-3">
              Continuous analysis of vehicle telemetry for proactive maintenance
              decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
