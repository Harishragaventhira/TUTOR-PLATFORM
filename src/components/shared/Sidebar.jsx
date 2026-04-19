import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, MessageSquare, ClipboardList,
  TrendingUp, Upload, Settings, ChevronRight, X, ArrowLeftRight,
} from "lucide-react";

const studentNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
  { icon: BookOpen, label: "My Courses", path: "/student/courses" },
  { icon: Users, label: "Book a Tutor", path: "/student/tutors" },
  { icon: ClipboardList, label: "Requests", path: "/student/requests" },
  { icon: MessageSquare, label: "Messages", path: "/student/chat" },
];

const tutorNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/tutor" },
  { icon: Upload, label: "Upload Course", path: "/tutor/upload" },
  { icon: BookOpen, label: "My Courses", path: "/tutor/courses" },
  { icon: TrendingUp, label: "Earnings", path: "/tutor/earnings" },
  { icon: ClipboardList, label: "Student Requests", path: "/tutor/requests" },
  { icon: MessageSquare, label: "Messages", path: "/tutor/chat" },
  { icon: Settings, label: "Availability", path: "/tutor/availability" },
];

export default function Sidebar({ role = "student", open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = role === "tutor" ? tutorNav : studentNav;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar fixed left-0 top-16 bottom-0 w-60 z-40 flex flex-col py-4 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-4 mb-3 lg:hidden">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
            {role === "tutor" ? "Tutor Menu" : "Student Menu"}
          </span>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X size={16} style={{ color: "#6B7280" }} />
          </button>
        </div>

        {/* Role badge */}
        <div
          className="mx-3 mb-5 px-4 py-3 rounded-xl"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
            Logged in as
          </p>
          <p className="text-sm font-bold" style={{ color: "#0056D2" }}>
            {role === "tutor" ? "Tutor" : "Student"}
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active =
              location.pathname === path ||
              (path !== "/student" && path !== "/tutor" && location.pathname.startsWith(path));
            return (
              <button
                key={path}
                onClick={() => { navigate(path); onClose?.(); }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active ? "sidebar-active" : ""
                }`}
                style={{
                  color: active ? "#0056D2" : "#4B5563",
                  background: active ? "#E6F0FF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "#F5F7FA";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon
                  size={18}
                  style={{ color: active ? "#0056D2" : "#9CA3AF" }}
                />
                <span>{label}</span>
                {active && (
                  <ChevronRight size={14} className="ml-auto" style={{ color: "#0056D2" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Switch role */}
        <div
          className="mx-3 mt-3 p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-3"
          style={{ border: "1px dashed #CBD5E1", background: "transparent" }}
          onClick={() => navigate(role === "tutor" ? "/student" : "/tutor")}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ArrowLeftRight size={15} style={{ color: "#0056D2" }} />
          <div>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Switch to</p>
            <p className="text-sm font-semibold" style={{ color: "#0056D2" }}>
              {role === "tutor" ? "Student View" : "Tutor View"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
