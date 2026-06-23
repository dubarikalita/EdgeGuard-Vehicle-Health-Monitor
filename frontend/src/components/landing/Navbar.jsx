import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="
sticky top-0 z-50
bg-[#0D0D0D]/95
backdrop-blur-md
border-b border-zinc-800
"
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Shield className="text-[#DFFF00]" size={24} />
          <h1 className="text-white text-xl font-bold tracking-tight">
            Edge<span className="text-[#DFFF00]">Guard</span>
          </h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="
      relative
      text-zinc-400

      hover:text-lime-300
      hover:-translate-y-1

      transition-all
      duration-200

      after:absolute
      after:left-0
      after:-bottom-1
      after:h-px
      after:w-0
      after:bg-lime-300

      hover:after:w-full
      after:transition-all
      after:duration-200
    "
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="
      relative
      text-zinc-400

      hover:text-lime-300
      hover:-translate-y-1

      transition-all
      duration-200

      after:absolute
      after:left-0
      after:-bottom-1
      after:h-px
      after:w-0
      after:bg-lime-300

      hover:after:w-full
      after:transition-all
      after:duration-200
    "
          >
            How It Works
          </a>

          <a
            href="#dashboard"
            className="
      relative
      text-zinc-400

      hover:text-lime-300
      hover:-translate-y-1

      transition-all
      duration-200

      after:absolute
      after:left-0
      after:-bottom-1
      after:h-px
      after:w-0
      after:bg-lime-300

      hover:after:w-full
      after:transition-all
      after:duration-200
    "
          >
            Dashboard
          </a>

          <a
            href="#technology"
            className="
      relative
      text-zinc-400

      hover:text-lime-300
      hover:-translate-y-1

      transition-all
      duration-200

      after:absolute
      after:left-0
      after:-bottom-1
      after:h-px
      after:w-0
      after:bg-lime-300

      hover:after:w-full
      after:transition-all
      after:duration-200
    "
          >
            AI
          </a>
        </div>

        {/* Buttons */}
        <div>
          <button
            className="
px-5 py-2
rounded-xl
font-medium

bg-[#181818]
border border-[#DFFF00]/25
text-white

hover:-translate-y-0.5
hover:border-[#DFFF00]/60
hover:bg-[#1f1f1f]
hover:shadow-[0_4px_20px_rgba(223,255,0,0.12)]

active:translate-y-0

transition-all
duration-300
"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
