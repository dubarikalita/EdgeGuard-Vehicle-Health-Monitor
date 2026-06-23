import Sidebar from "../components/layout/Sidebar";
import NavBar from "../components/layout/NavBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      <Sidebar />

      <div className="flex-1">
        <NavBar />

        <main className="px-5 py-6">{children}</main>
      </div>
    </div>
  );
}