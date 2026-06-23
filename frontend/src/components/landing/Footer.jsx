import { Shield } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="
    mt-32

    bg-linear-to-b
    from-[#0A0A0A]
    to-[#050505]

    border-t
    border-zinc-800
  "
    >
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-[#DFFF00]" size={22} />

              <h2 className="text-2xl font-bold">
                Edge
                <span className="text-[#DFFF00]">Guard</span>
              </h2>
            </div>

            <p className="text-zinc-400 max-w-sm leading-relaxed">
              AI-powered vehicle health monitoring and predictive maintenance
              platform designed to detect faults early and improve vehicle
              reliability.
            </p>

            {/* Social Icons */}

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="
                  p-3
                  rounded-xl
                  bg-[#181818]
                  border border-zinc-800

                  hover:border-[#DFFF00]/50
                  hover:text-[#DFFF00]
                  hover:-translate-y-1
                  hover:shadow-[0_6px_20px_rgba(223,255,0,0.12)]

                  transition-all
                  duration-300
                "
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="
                  p-3
                  rounded-xl
                  bg-[#181818]
                  border border-zinc-800

                  hover:border-[#DFFF00]/50
                  hover:text-[#DFFF00]
                  hover:-translate-y-1
                  hover:shadow-[0_6px_20px_rgba(223,255,0,0.12)]

                  transition-all
                  duration-300
                "
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="
                  p-3
                  rounded-xl
                  bg-[#181818]
                  border border-zinc-800

                  hover:border-[#DFFF00]/50
                  hover:text-[#DFFF00]
                  hover:-translate-y-1
                  hover:shadow-[0_6px_20px_rgba(223,255,0,0.12)]

                  transition-all
                  duration-300
                "
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                className="
                  p-3
                  rounded-xl
                  bg-[#181818]
                  border border-zinc-800

                  hover:border-[#DFFF00]/50
                  hover:text-[#DFFF00]
                  hover:-translate-y-1
                  hover:shadow-[0_6px_20px_rgba(223,255,0,0.12)]

                  transition-all
                  duration-300
                "
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}

          <div>
            <h3 className="font-semibold text-white mb-5">Navigation</h3>

            <div className="flex flex-col gap-3">
              <a
                href="#features"
                className="text-zinc-400 hover:text-[#DFFF00] transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-zinc-400 hover:text-[#DFFF00] transition"
              >
                How It Works
              </a>

              <a
                href="#dashboard"
                className="text-zinc-400 hover:text-[#DFFF00] transition"
              >
                Dashboard
              </a>

              <a
                href="#technology"
                className="text-zinc-400 hover:text-[#DFFF00] transition"
              >
                AI Engine
              </a>
            </div>
          </div>

          {/* Capabilities */}

          <div>
            <h3 className="font-semibold text-white mb-5">Capabilities</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <p>Real-Time Monitoring</p>

              <p>Predictive Maintenance</p>

              <p>Fault Detection</p>

              <p>Risk Assessment</p>

              <p>Anomaly Detection</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2026 EdgeGuard. All rights reserved.</p>

          <p className="text-zinc-400">Monitor. Predict. Prevent.</p>
        </div>
      </div>
    </footer>
  );
}
