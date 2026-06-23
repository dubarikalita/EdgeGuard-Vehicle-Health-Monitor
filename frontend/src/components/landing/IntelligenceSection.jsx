import {
  Activity,
  Brain,
  Bell,
  ShieldAlert,
  Wrench,
  Gauge,
  LineChart,
  Radar,
} from "lucide-react";

export default function IntelligenceSection() {
  const items = [
    {
      icon: Activity,
      title: "Real-Time Monitoring",
    },
    {
      icon: Brain,
      title: "Fault Detection",
    },
    {
      icon: Gauge,
      title: "Health Scoring",
    },
    {
      icon: ShieldAlert,
      title: "Risk Assessment",
    },
    {
      icon: Wrench,
      title: "Predictive Maintenance",
    },
    {
      icon: Radar,
      title: "Anomaly Detection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
    },
    {
      icon: LineChart,
      title: "Analytics",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold">
            The smarter way to
            <br />
            monitor vehicle health
          </h2>

          <p className="text-zinc-400 text-lg mt-6 max-w-3xl mx-auto">
            Everything you need to monitor performance, detect faults, predict
            maintenance needs and improve vehicle reliability.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            className="
      relative

      bg-linear-to-br
      from-[#1b2110]
      via-[#151515]
      to-[#111111]

      backdrop-blur-lg
      border border-zinc-800

      rounded-4xl
      p-10 md:p-16
    "
          >
            <div className="grid md:grid-cols-4 gap-10">
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                  group
                  text-center
                  cursor-pointer
                "
                  >
                    <div
                      className="
                    w-20 h-20
                    mx-auto
                    rounded-2xl

                    bg-[#181818]
                    border border-zinc-800

                    flex items-center justify-center

                    group-hover:border-[#DFFF00]/50
                    group-hover:-translate-y-2
                    group-hover:shadow-[0_8px_30px_rgba(223,255,0,0.12)]

                    transition-all
                    duration-300
                  "
                    >
                      <Icon size={32} className="text-[#DFFF00]" />
                    </div>

                    <p className="mt-5 text-lg font-medium">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import {
//   Activity,
//   Brain,
//   ShieldAlert,
//   Wrench,
//   Gauge,
//   LineChart,
// } from "lucide-react";

// export default function Features() {
//   const features = [
//     {
//       icon: <Activity className="text-[#DFFF00]" size={28} />,
//       title: "Real-Time Monitoring",
//       description:
//         "Track RPM, temperature, voltage, vibration, tyre pressure and oil levels continuously.",
//     },
//     {
//       icon: <Brain className="text-[#DFFF00]" size={28} />,
//       title: "AI Fault Detection",
//       description:
//         "Identify engine overheating, battery degradation, suspension issues and abnormal behavior.",
//     },
//     {
//       icon: <ShieldAlert className="text-[#DFFF00]" size={28} />,
//       title: "Anomaly Detection",
//       description:
//         "Isolation Forest detects unusual operating conditions before failures occur.",
//     },
//     {
//       icon: <Wrench className="text-[#DFFF00]" size={28} />,
//       title: "Predictive Maintenance",
//       description:
//         "Predict maintenance requirements before costly breakdowns happen.",
//     },
//     {
//       icon: <Gauge className="text-[#DFFF00]" size={28} />,
//       title: "Vehicle Health Score",
//       description:
//         "Generate a health score from 0-100 based on overall vehicle condition.",
//     },
//     {
//       icon: <LineChart className="text-[#DFFF00]" size={28} />,
//       title: "Risk Assessment",
//       description:
//         "Classify vehicles into Low, Medium and High risk categories automatically.",
//     },
//   ];

//   return (
//     <section className="py-32">
//       <div className="max-w-7xl mx-auto px-8">
//         <div className="text-center mb-20">
//           <p className="text-[#DFFF00] font-medium mb-4">FEATURES</p>

//           <h2 className="text-4xl md:text-5xl font-bold">
//             Built for Intelligent
//             <br />
//             Vehicle Monitoring
//           </h2>

//           <p className="text-zinc-400 max-w-2xl mx-auto mt-6">
//             EdgeGuard combines real-time telemetry, machine learning and
//             predictive analytics into a single monitoring platform.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="
//                 bg-[#141414]
//                 border border-zinc-800
//                 rounded-2xl
//                 p-8
//                 hover:border-[#DFFF00]/50
//                 transition-all
//                 duration-300
//               "
//             >
//               <div className="mb-6">{feature.icon}</div>

//               <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>

//               <p className="text-zinc-400">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
