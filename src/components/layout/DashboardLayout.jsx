import { useState } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

export default function DashboardLayout({ children, role = "student" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
      <Navbar role={role} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-60 pt-16 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
