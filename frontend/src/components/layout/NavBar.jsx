export default function NavBar() {
  return (
    <header
      className="
      mx-5
      mt-5

      h-18

      rounded-3xl

      bg-[#161616]
      border border-[#464545]

      shadow-[0_0_25px_rgba(223,255,0,0.03)]

      px-8

      flex
      items-center
      justify-between
      "
    >
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-white">Vehicle Overview</h1>

        <p className="text-xs text-zinc-500">
          Real-time monitoring and predictive insights
        </p>
      </div>

      {/* Center */}
      <div
        className="
        hidden md:flex

        items-center
        gap-2

        px-4
        py-2

        rounded-full

        bg-lime-500/10
        border border-lime-500/20

        text-lime-300
        text-sm
        "
      >
        <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>

        <span>Live Monitoring Active</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-zinc-500">Last Sync</p>

          <p className="text-sm text-white">Just now</p>
        </div>

        <div
          className="
          w-10
          h-10

          rounded-full

          bg-[#DFFF00]
          text-black

          flex
          items-center
          justify-center

          font-bold
          "
        >
          M
        </div>
      </div>
    </header>
  );
}
