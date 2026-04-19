import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { tutors, subjects, cities } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import { Search, MapPin, Wifi, Home, SlidersHorizontal, CheckCircle, MessageSquare, X } from "lucide-react";

export default function TutorBookingPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("online");
  const [filters, setFilters] = useState({ subject: "All", city: "All", maxFee: 10000, rating: 0, preference: "all" });
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);

  const updateF = (k, v) => setFilters((p) => ({ ...p, [k]: v }));

  const filtered = tutors.filter((t) => {
    if (tab === "online" && !t.mode.includes("online")) return false;
    if (tab === "offline" && !t.mode.includes("offline")) return false;
    if (filters.subject !== "All" && t.subject !== filters.subject) return false;
    if (filters.city !== "All" && t.location.city !== filters.city) return false;
    if (t.monthlyFee > filters.maxFee) return false;
    if (t.rating < filters.rating) return false;
    return true;
  });

  return (
    <DashboardLayout role="student">
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Book a Tutor</h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Find qualified tutors for online or offline sessions. Monthly plans available.</p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit mb-6"
        style={{ background: "#F5F7FA", border: "1px solid #E5E7EB" }}
      >
        {[
          { key: "online", icon: Wifi, label: "Online Tutors" },
          { key: "offline", icon: MapPin, label: "Offline / Home Tuition" },
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: tab === key ? "#0056D2" : "transparent",
              color: tab === key ? "#FFFFFF" : "#4B5563",
              boxShadow: tab === key ? "0 2px 8px rgba(0,86,210,0.2)" : "none",
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Filter sidebar */}
        <div className="w-56 shrink-0 hidden lg:block">
          <div className="glass-card p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal size={16} style={{ color: "#0056D2" }} />
              <span className="font-bold text-sm" style={{ color: "#1F2937" }}>Filters</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>
                  Subject
                </label>
                <select value={filters.subject} onChange={(e) => updateF("subject", e.target.value)} className="input-field text-sm">
                  <option value="All">All Subjects</option>
                  {subjects.slice(0, 7).map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {tab === "offline" && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>City</label>
                  <select value={filters.city} onChange={(e) => updateF("city", e.target.value)} className="input-field text-sm">
                    <option value="All">All Cities</option>
                    {cities.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>
                  Max Fee: ₹{filters.maxFee.toLocaleString()}/mo
                </label>
                <input
                  type="range" min="500" max="10000" step="500"
                  value={filters.maxFee}
                  onChange={(e) => updateF("maxFee", +e.target.value)}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#9CA3AF" }}>
                  <span>₹500</span><span>₹10,000</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Min Rating</label>
                <div className="flex gap-1 flex-wrap">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => updateF("rating", r)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: filters.rating === r ? "#0056D2" : "#F5F7FA",
                        color: filters.rating === r ? "#FFFFFF" : "#4B5563",
                        border: `1px solid ${filters.rating === r ? "#0056D2" : "#E5E7EB"}`,
                      }}
                    >
                      {r === 0 ? "Any" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFilters({ subject: "All", city: "All", maxFee: 10000, rating: 0, preference: "all" })}
                className="w-full py-2 rounded-lg text-xs font-medium transition-all"
                style={{ color: "#0056D2", border: "1px solid #BFDBFE", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tutor cards */}
        <div className="flex-1">
          <p className="text-sm mb-4 font-medium" style={{ color: "#6B7280" }}>{filtered.length} tutors available</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                tab={tab}
                onBook={() => { setSelectedTutor(tutor); setBookingStep(1); }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTutor && bookingStep > 0 && (
        <BookingModal
          tutor={selectedTutor}
          step={bookingStep}
          setStep={setBookingStep}
          onClose={() => { setSelectedTutor(null); setBookingStep(0); }}
          onConfirm={() => navigate("/student/chat")}
        />
      )}
    </DashboardLayout>
  );
}

function TutorCard({ tutor, tab, onBook }) {
  return (
    <div className="glass-card p-5 card-hover">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative shrink-0">
          <img src={tutor.avatar} alt={tutor.name} className="w-14 h-14 rounded-2xl" style={{ border: "2px solid #E5E7EB" }} />
          {tutor.available && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold" style={{ color: "#1F2937" }}>{tutor.name}</h3>
            {tutor.verified && <CheckCircle size={14} style={{ color: "#22C55E" }} className="shrink-0" />}
          </div>
          <p className="text-sm font-semibold" style={{ color: "#0056D2" }}>{tutor.subject}</p>
          <p className="text-xs" style={{ color: "#6B7280" }}>{tutor.experience} experience</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-black" style={{ color: "#0056D2" }}>₹{tutor.monthlyFee.toLocaleString()}</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>per month</p>
        </div>
      </div>

      <StarRating rating={tutor.rating} />

      <div className="flex flex-wrap gap-2 mt-3">
        {tutor.mode.map((m) => (
          <span key={m} className={`badge ${m === "online" ? "badge-blue" : "badge-orange"}`}>
            {m === "online" ? "🌐 Online" : "📍 Offline"}
          </span>
        ))}
        {tutor.teachingPreference.includes("at_student") && <span className="badge badge-green">🏠 Home Visit</span>}
        {tutor.teachingPreference.includes("at_tutor") && <span className="badge badge-purple">🏫 Tutor's Place</span>}
      </div>

      {tab === "offline" && (
        <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: "#9CA3AF" }}>
          <MapPin size={11} style={{ color: "#0056D2" }} />
          {tutor.location.area}, {tutor.location.city}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button className="btn-ghost flex-1 py-2 rounded-xl text-sm flex items-center justify-center gap-1.5">
          <MessageSquare size={14} /> Message
        </button>
        <button onClick={onBook} className="btn-primary flex-1 py-2 rounded-xl text-sm">
          Book Tutor
        </button>
      </div>
    </div>
  );
}

function BookingModal({ tutor, step, setStep, onClose, onConfirm }) {
  const [mode, setMode] = useState("online");
  const [preference, setPreference] = useState("at_tutor");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
    >
      <div className="w-full max-w-md glass-card p-6" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold" style={{ color: "#1F2937" }}>
            {step === 1 ? "Select Session Mode" : "Confirm Booking"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors" onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <X size={16} style={{ color: "#6B7280" }} />
          </button>
        </div>

        {/* Tutor info */}
        <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ background: "#F5F7FA", border: "1px solid #E5E7EB" }}>
          <img src={tutor.avatar} alt={tutor.name} className="w-12 h-12 rounded-xl" />
          <div>
            <p className="font-bold" style={{ color: "#1F2937" }}>{tutor.name}</p>
            <p className="text-sm" style={{ color: "#4B5563" }}>{tutor.subject} · {tutor.experience}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-black" style={{ color: "#0056D2" }}>₹{tutor.monthlyFee.toLocaleString()}</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>/month</p>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>Choose Mode</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "online", icon: Wifi, label: "Online", desc: "Video call sessions" },
                  { val: "offline", icon: Home, label: "Offline", desc: "In-person sessions" },
                ].map(({ val, icon: Icon, label, desc }) => (
                  <button
                    key={val}
                    onClick={() => setMode(val)}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{
                      background: mode === val ? "#EFF6FF" : "#F9FAFB",
                      border: `1.5px solid ${mode === val ? "#0056D2" : "#E5E7EB"}`,
                    }}
                  >
                    <Icon size={20} className="mb-2" style={{ color: mode === val ? "#0056D2" : "#9CA3AF" }} />
                    <p className="text-sm font-semibold" style={{ color: mode === val ? "#0056D2" : "#1F2937" }}>{label}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{desc}</p>
                  </button>
                ))}
              </div>
            </div>
            {mode === "offline" && (
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>Teaching Preference</p>
                <div className="space-y-2">
                  {[
                    { val: "at_tutor", label: "I'll go to tutor's place" },
                    { val: "at_student", label: "Tutor comes to my home" },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setPreference(val)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all"
                      style={{ background: preference === val ? "#EFF6FF" : "#F9FAFB", border: `1.5px solid ${preference === val ? "#0056D2" : "#E5E7EB"}`, color: "#1F2937" }}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${preference === val ? "" : ""}`}
                        style={{ borderColor: preference === val ? "#0056D2" : "#CBD5E1" }}>
                        {preference === val && <div className="w-2 h-2 rounded-full" style={{ background: "#0056D2" }} />}
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => setStep(2)} className="btn-primary w-full py-3 rounded-xl mt-4">Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="space-y-3 mb-6 p-4 rounded-xl" style={{ background: "#F5F7FA" }}>
              {[
                { label: "Session Mode", value: mode === "online" ? "🌐 Online" : "📍 Offline" },
                { label: "Plan", value: "Monthly Subscription" },
                { label: "Monthly Fee", value: `₹${tutor.monthlyFee.toLocaleString()}` },
                { label: "Sessions/Week", value: "4-5 sessions" },
                { label: "Starts", value: "This Monday" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span style={{ color: "#4B5563" }}>{label}</span>
                  <span className="font-semibold" style={{ color: "#1F2937" }}>{value}</span>
                </div>
              ))}
              <div className="h-px bg-gray-200 my-1" />
              <div className="flex justify-between">
                <span className="font-bold" style={{ color: "#1F2937" }}>Total Due Now</span>
                <span className="text-xl font-black" style={{ color: "#0056D2" }}>₹{tutor.monthlyFee.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3 rounded-xl text-sm">← Back</button>
              <button onClick={onConfirm} className="btn-primary flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                <CheckCircle size={15} /> Confirm & Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
