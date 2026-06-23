import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Footer from "../components/landing/Footer";
import HowItWorks from "../components/landing/HowItWorks";
import Intelligence from "../components/landing/IntelligenceSection.jsx";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import ImpactMetrics from "../components/landing/ImpactMetrics";
import CTA from "../components/landing/CTA";


export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-[#DFFF00]/10 rounded-full blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-125 h-125 bg-lime-400/5 rounded-full blur-[180px]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Intelligence />
        <DashboardShowcase />
        <ImpactMetrics />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
