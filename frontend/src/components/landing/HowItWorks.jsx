export default function HowItWorks() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading */}

        <div className="text-center mb-20">
          <p className="text-[#DFFF00] font-medium mb-4">HOW IT WORKS</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            From Sensor Data
            <br />
            to Intelligent Decisions
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto mt-6">
            EdgeGuard continuously monitors vehicle telemetry, analyzes
            operating conditions using machine learning, and delivers actionable
            maintenance insights in real time.
          </p>
        </div>

        {/* Flow */}

        <div className="grid md:grid-cols-5 gap-6">
          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Vehicle Sensors</h3>
            <p className="text-zinc-400 text-sm">
              RPM, temperature, vibration, voltage and tyre pressure.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-[#DFFF00] text-3xl">
            →
          </div>

          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-semibold mb-3">AI Analysis</h3>
            <p className="text-zinc-400 text-sm">
              Random Forest, Isolation Forest and XGBoost models.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-[#DFFF00] text-3xl">
            →
          </div>

          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Smart Insights</h3>
            <p className="text-zinc-400 text-sm">
              Fault detection, risk assessment and maintenance prediction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
