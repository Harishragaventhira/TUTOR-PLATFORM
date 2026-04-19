import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Bell, Search, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { notifications, studentProfile } from "../../data/dummyData";

export default function Navbar({ role = "student", onToggleSidebar }) {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          <div className="w-5 h-0.5 bg-gray-500 mb-1 rounded" />
          <div className="w-5 h-0.5 bg-gray-500 mb-1 rounded" />
          <div className="w-5 h-0.5 bg-gray-500 rounded" />
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "#0056D2" }}
          >
            TB
          </div>
          <span className="font-bold text-lg hidden sm:block" style={{ color: "#0056D2" }}>
            TutorBridge
          </span>
        </button>
      </div>

      {/* Search */}
      <div
        className="flex-1 max-w-md mx-6 hidden md:flex items-center gap-2 px-4 py-2 rounded-lg"
        style={{ background: "#F5F7FA", border: "1.5px solid #E5E7EB" }}
      >
        <Search size={15} className="shrink-0" style={{ color: "#9CA3AF" }} />
        <input
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: "#1F2937" }}
          placeholder="Search courses, tutors..."
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} style={{ color: "#4B5563" }} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 notif-badge">{unread}</span>
            )}
          </button>

          {showNotif && (
            <div
              className="absolute right-0 top-12 w-80 rounded-xl p-4 z-50"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              }}
            >
              <h4
                className="font-semibold text-sm mb-3"
                style={{ color: "#1F2937" }}
              >
                Notifications
              </h4>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-lg mb-1.5 cursor-pointer transition-colors"
                  style={{
                    background: n.unread ? "#EFF6FF" : "transparent",
                    border: n.unread ? "1px solid #BFDBFE" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? "#EFF6FF" : "transparent")}
                >
                  <p className="text-xs" style={{ color: n.unread ? "#1F2937" : "#4B5563" }}>
                    {n.text}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                    {n.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img src={studentProfile.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium hidden sm:block" style={{ color: "#1F2937" }}>
              {role === "tutor" ? "Priya" : "Aditya"}
            </span>
            <ChevronDown size={14} style={{ color: "#9CA3AF" }} />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 top-12 w-48 rounded-xl p-1.5 z-50"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              }}
            >
              {[
                { icon: User, label: "Profile", action: () => {} },
                { icon: Settings, label: "Settings", action: () => {} },
                { icon: LogOut, label: "Sign Out", action: () => navigate("/") },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors"
                  style={{ color: "#4B5563" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Icon size={15} style={{ color: "#9CA3AF" }} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
