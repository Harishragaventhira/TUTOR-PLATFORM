import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { studentRequests } from "../../data/dummyData";
import { MapPin, DollarSign, MessageSquare, CheckCircle, Users } from "lucide-react";

export default function TutorRequestsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [accepted, setAccepted] = useState([]);

  const filtered = studentRequests.filter((r) => {
    if (filter === "all") return true;
    if (filter === "open") return r.status === "open";
    return r.status === "accepted";
  });

  const handleAccept = (id) => {
    setAccepted((prev) => [...prev, id]);
    setTimeout(() => navigate("/tutor/chat"), 500);
  };

  return (
    <DashboardLayout role="tutor">
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Student Requests</h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Browse and accept inbound student tuition requests in your area</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit mb-6" style={{ background: "#F5F7FA", border: "1px solid #E5E7EB" }}>
        {[
          { key: "all", label: `All (${studentRequests.length})` },
          { key: "open", label: "Open" },
          { key: "accepted", label: "Accepted" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: filter === key ? "#0056D2" : "transparent", color: filter === key ? "#FFFFFF" : "#4B5563" }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filtered.map((req) => {
          const isAccepted = accepted.includes(req.id) || req.status === "accepted";
          return (
            <div key={req.id} className="glass-card p-6 card-hover">
              <div className="flex items-start gap-5">
                <img src={req.avatar} alt={req.studentName} className="w-14 h-14 rounded-2xl shrink-0 border-2" style={{ borderColor: "#E5E7EB" }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: "#1F2937" }}>{req.studentName}</h3>
                      <p className="font-semibold" style={{ color: "#0056D2" }}>{req.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge ${isAccepted ? "badge-blue" : "badge-green"}`}>{isAccepted ? "✓ Accepted" : "Open"}</span>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{req.postedAt}</span>
                    </div>
                  </div>

                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "#4B5563" }}>{req.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {[
                      { icon: MapPin, label: "Location", value: `${req.location.area}, ${req.location.city}`, color: "#0056D2" },
                      { icon: DollarSign, label: "Budget", value: `₹${req.budget.toLocaleString()}/month`, color: "#22C55E" },
                      { icon: Users, label: "Mode", value: req.mode, color: "#7C3AED" },
                      { icon: CheckCircle, label: "Preference", value: req.preference.replace("_", " "), color: "#F59E0B" },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="p-3 rounded-xl" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={11} style={{ color }} />
                          <span className="text-xs" style={{ color: "#9CA3AF" }}>{label}</span>
                        </div>
                        <p className="text-sm font-semibold capitalize" style={{ color: "#1F2937" }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="btn-ghost px-5 py-2.5 rounded-xl text-sm">View Profile</button>
                    {!isAccepted ? (
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="btn-primary px-6 py-2.5 rounded-xl text-sm flex items-center gap-2"
                      >
                        <CheckCircle size={15} /> Accept & Chat
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/tutor/chat")}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                        style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#DCFCE7")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#F0FDF4")}
                      >
                        <MessageSquare size={15} /> Open Chat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
