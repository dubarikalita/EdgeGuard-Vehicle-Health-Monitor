import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-8">
        <div
          className="
            relative
            overflow-hidden
            rounded-4xl
            border border-zinc-800
            bg-[#141414]
            p-12 md:p-20
            text-center
          "
        >
          {/* Glow */}

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#DFFF00]/10 rounded-full blur-[180px]" />
          </div>

          <div className="relative z-10">
            <p className="text-[#DFFF00] font-medium mb-4">
              READY TO GET STARTED?
            </p>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Prevent Failures
              <br />
              Before They Happen
            </h2>

            <p className="text-zinc-400 max-w-2xl mx-auto mt-8 text-lg">
              Monitor vehicle health in real time, predict maintenance
              requirements, and make smarter decisions with EdgeGuard.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <button
                onClick={() => navigate("/dashboard")}
                className="
                  bg-[#DFFF00]
                  text-black
                  px-8 py-4
                  rounded-xl
                  font-semibold
                  hover:scale-105
                  transition-all
                "
              >
                Launch Dashboard
              </button>

              <button
                className="
                  border border-zinc-700
                  px-8 py-4
                  rounded-xl
                  hover:border-zinc-500
                  transition-all
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
