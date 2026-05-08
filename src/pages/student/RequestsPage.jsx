import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { studentRequests, tutorPosts } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import { Plus, MapPin, MessageSquare, CheckCircle, X, Users, DollarSign, BookOpen } from "lucide-react";

export default function RequestsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("sessions");
  const [showPostForm, setShowPostForm] = useState(false);
  const [form, setForm] = useState({ subject: "", location: "", budget: "", mode: "online", preference: "home_tuition", description: "" });
  const updateForm = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <DashboardLayout role="learner">
      <div className="flex items-start justify-between mb-7 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Requests Board</h1>
          <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Track your tutoring and material requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {["sessions", "materials"].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${tab === t ? "bg-white shadow-sm text-blue-600" : "text-gray-500"}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => setShowPostForm(true)} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
            <Plus size={17} /> Post My Requirement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 px-1"><Users size={18} /> Direct Requests</h3>
          {studentRequests.map(req => (
            <StudentRequestCard key={req.id} req={req} onAccept={() => navigate("/learner/chat")} />
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 px-1"><BookOpen size={18} /> Public Posts</h3>
          {tutorPosts.map(post => (
            <TutorPostCard key={post.id} post={post} onAccept={() => navigate("/learner/chat")} />
          ))}
        </div>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg glass-card p-6 max-h-[90vh] overflow-y-auto" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold" style={{ color: "#1F2937" }}>Post Your Requirement</h3>
              <button onClick={() => setShowPostForm(false)} className="p-1.5 rounded-lg" onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <X size={15} style={{ color: "#6B7280" }} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: "subject", label: "Subject *", placeholder: "e.g. Mathematics, Physics" },
                { key: "location", label: "Your Location", placeholder: "City, Area / Pincode" },
                { key: "budget", label: "Monthly Budget (₹)", placeholder: "e.g. 3000", type: "number" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>{label}</label>
                  <input className="input-field" type={type || "text"} placeholder={placeholder} value={form[key]} onChange={(e) => updateForm(key, e.target.value)} />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Mode</label>
                <div className="flex gap-2">
                  {["online", "offline", "both"].map((m) => (
                    <button key={m} onClick={() => updateForm("mode", m)}
                      className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                      style={{ background: form.mode === m ? "#0056D2" : "#F5F7FA", color: form.mode === m ? "#FFFFFF" : "#4B5563", border: `1px solid ${form.mode === m ? "#0056D2" : "#E5E7EB"}` }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Description</label>
                <textarea className="input-field" rows={4} placeholder="Describe your learning needs, level, timing preferences..." value={form.description} onChange={(e) => updateForm("description", e.target.value)} />
              </div>
              <button onClick={() => setShowPostForm(false)} className="btn-primary w-full py-3 rounded-xl">Post Requirement</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function StudentRequestCard({ req, onAccept }) {
  return (
    <div className="glass-card p-5 card-hover">
      <div className="flex items-start gap-4">
        <img src={req.avatar} alt={req.studentName} className="w-12 h-12 rounded-xl shrink-0 border-2" style={{ borderColor: "#E5E7EB" }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
            <div>
              <h3 className="font-bold" style={{ color: "#1F2937" }}>{req.studentName}</h3>
              <p className="text-sm font-semibold" style={{ color: "#0056D2" }}>{req.subject}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge ${req.status === "open" ? "badge-green" : "badge-purple"}`}>{req.status === "open" ? "Open" : "Accepted"}</span>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>{req.postedAt}</span>
            </div>
          </div>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: "#4B5563" }}>{req.description}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "#4B5563" }}>
              <MapPin size={11} style={{ color: "#0056D2" }} />{req.location.area}, {req.location.city}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "#4B5563" }}>
              <DollarSign size={11} style={{ color: "#22C55E" }} />₹{req.budget.toLocaleString()}/month
            </span>
            <span className={`badge ${req.mode === "online" ? "badge-blue" : req.mode === "offline" ? "badge-orange" : "badge-green"}`}>
              {req.mode}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "#9CA3AF" }}>
              <Users size={11} />{req.responses} responses
            </span>
          </div>
          <div className="flex gap-3">
            <button className="btn-ghost px-4 py-2 rounded-xl text-sm">View Profile</button>
            <button onClick={onAccept} className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-2">
              <MessageSquare size={14} /> Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorPostCard({ post, onAccept }) {
  return (
    <div className="glass-card p-5 card-hover">
      <div className="flex items-center gap-3 mb-4">
        <img src={post.avatar} alt={post.tutorName} className="w-12 h-12 rounded-xl border-2" style={{ borderColor: "#E5E7EB" }} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate" style={{ color: "#1F2937" }}>{post.tutorName}</h3>
          <p className="text-sm font-semibold" style={{ color: "#0056D2" }}>{post.subject}</p>
        </div>
        <StarRating rating={post.rating} size={12} />
      </div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#4B5563" }}>{post.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`badge ${post.mode === "online" ? "badge-blue" : post.mode === "offline" ? "badge-orange" : "badge-green"}`}>
          {post.mode === "online" ? "🌐 Online" : post.mode === "offline" ? "📍 Offline" : "🔄 Both"}
        </span>
        <span className="badge badge-purple">📍 {post.location.area}</span>
        <span className="badge badge-green">✓ Available</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-black" style={{ color: "#0056D2" }}>₹{post.monthlyFee.toLocaleString()}</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>per month</p>
        </div>
        <button onClick={onAccept} className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle size={14} /> Accept
        </button>
      </div>
    </div>
  );
}
