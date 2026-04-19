import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { tutorProfile } from "../../data/dummyData";
import { Wifi, Home, MapPin, DollarSign, Clock, CheckCircle, Save } from "lucide-react";

export default function AvailabilityPage() {
  const [settings, setSettings] = useState({
    online: true, offline: true,
    monthlyFee: tutorProfile.monthlyFee,
    atStudentPlace: true, atTutorPlace: true,
    city: "Mumbai", area: "Andheri West", pincode: "400058", maxDistance: 10,
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    timeSlots: ["Evening (5-8 PM)"],
    maxStudents: 15, currentStudents: tutorProfile.activeStudents,
  });
  const [saved, setSaved] = useState(false);

  const update = (k, v) => setSettings((p) => ({ ...p, [k]: v }));
  const toggleDay = (day) => setSettings((p) => ({
    ...p,
    availableDays: p.availableDays.includes(day)
      ? p.availableDays.filter((d) => d !== day)
      : [...p.availableDays, day],
  }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlotOptions = ["Morning (6-9 AM)", "Forenoon (9-12 PM)", "Afternoon (12-3 PM)", "Evening (5-8 PM)", "Night (8-10 PM)"];

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className="w-11 h-6 rounded-full relative transition-all"
      style={{ background: checked ? "#0056D2" : "#E5E7EB" }}
    >
      <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
        style={{ left: checked ? "22px" : "2px" }} />
    </button>
  );

  return (
    <DashboardLayout role="tutor">
      <div className="flex items-start justify-between mb-7 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Availability Settings</h1>
          <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Control how and when students can book you</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "" : "btn-primary"}`}
          style={saved ? { background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" } : {}}
        >
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teaching Mode */}
        <div className="glass-card p-6">
          <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#EFF6FF" }}>
              <Wifi size={14} style={{ color: "#0056D2" }} />
            </div>
            Teaching Mode
          </h3>
          <div className="space-y-3">
            {[
              { key: "online", icon: Wifi, label: "Online Sessions", desc: "Video call via Zoom, Meet, etc." },
              { key: "offline", icon: Home, label: "Offline / In-Person", desc: "Meet students or home visits" },
            ].map(({ key, icon: Icon, label, desc }) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 rounded-xl transition-all"
                style={{
                  background: settings[key] ? "#EFF6FF" : "#F9FAFB",
                  border: `1.5px solid ${settings[key] ? "#BFDBFE" : "#E5E7EB"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} style={{ color: settings[key] ? "#0056D2" : "#9CA3AF" }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: settings[key] ? "#1F2937" : "#4B5563" }}>{label}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{desc}</p>
                  </div>
                </div>
                <Toggle checked={settings[key]} onChange={(v) => update(key, v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Fee */}
        <div className="glass-card p-6">
          <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F0FDF4" }}>
              <DollarSign size={14} style={{ color: "#22C55E" }} />
            </div>
            Monthly Fee
          </h3>
          <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>
            Your Monthly Rate (₹)
          </label>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black" style={{ color: "#0056D2" }}>₹</span>
            <input
              type="number"
              value={settings.monthlyFee}
              onChange={(e) => update("monthlyFee", +e.target.value)}
              className="input-field text-2xl font-black w-32"
            />
            <span className="text-sm" style={{ color: "#6B7280" }}>/month</span>
          </div>
          <input type="range" min="1000" max="10000" step="500"
            value={settings.monthlyFee} onChange={(e) => update("monthlyFee", +e.target.value)}
            className="w-full accent-blue-600 mb-2" />
          <div className="flex justify-between text-xs mb-4" style={{ color: "#9CA3AF" }}>
            <span>₹1,000</span><span>₹10,000</span>
          </div>
          <div className="p-3 rounded-xl" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p className="text-xs" style={{ color: "#16A34A" }}>
              💡 Average for {tutorProfile.subject} tutors: <strong>₹3,000–₹4,000/month</strong>
            </p>
          </div>
        </div>

        {/* Location */}
        {settings.offline && (
          <div className="glass-card p-6">
            <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F5F3FF" }}>
                <MapPin size={14} style={{ color: "#7C3AED" }} />
              </div>
              Teaching Location
            </h3>
            <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>I can teach at</p>
            <div className="space-y-2 mb-5">
              {[
                { key: "atTutorPlace", label: "My place (students come to me)" },
                { key: "atStudentPlace", label: "Student's home (I travel)" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => update(key, !settings[key])}
                  className="flex items-center gap-3 w-full p-3 rounded-xl text-sm text-left transition-all"
                  style={{
                    background: settings[key] ? "#EFF6FF" : "#F9FAFB",
                    border: `1.5px solid ${settings[key] ? "#BFDBFE" : "#E5E7EB"}`,
                    color: "#1F2937",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0"
                    style={{ borderColor: settings[key] ? "#0056D2" : "#CBD5E1", background: settings[key] ? "#0056D2" : "transparent" }}
                  >
                    {settings[key] && <CheckCircle size={12} className="text-white" fill="white" />}
                  </div>
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs" style={{ color: "#6B7280" }}>City</label>
                <input className="input-field text-sm mt-1" value={settings.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div>
                <label className="text-xs" style={{ color: "#6B7280" }}>Area</label>
                <input className="input-field text-sm mt-1" value={settings.area} onChange={(e) => update("area", e.target.value)} />
              </div>
            </div>
            <label className="text-xs mb-1 block" style={{ color: "#6B7280" }}>Max Travel Distance: {settings.maxDistance} km</label>
            <input type="range" min="1" max="30" value={settings.maxDistance}
              onChange={(e) => update("maxDistance", +e.target.value)}
              className="w-full accent-blue-600" />
          </div>
        )}

        {/* Schedule */}
        <div className="glass-card p-6">
          <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F0F9FF" }}>
              <Clock size={14} style={{ color: "#0891B2" }} />
            </div>
            Schedule
          </h3>

          {/* Days */}
          <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>Available Days</p>
          <div className="flex gap-2 flex-wrap mb-5">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className="w-11 h-11 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: settings.availableDays.includes(day) ? "#0056D2" : "#F5F7FA",
                  color: settings.availableDays.includes(day) ? "#FFFFFF" : "#6B7280",
                  border: `1.5px solid ${settings.availableDays.includes(day) ? "#0056D2" : "#E5E7EB"}`,
                }}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <p className="text-sm font-semibold mb-3" style={{ color: "#1F2937" }}>Time Slots</p>
          <div className="space-y-2 mb-5">
            {timeSlotOptions.map((slot) => {
              const active = settings.timeSlots.includes(slot);
              return (
                <button
                  key={slot}
                  onClick={() => setSettings((p) => ({
                    ...p,
                    timeSlots: active ? p.timeSlots.filter((s) => s !== slot) : [...p.timeSlots, slot],
                  }))}
                  className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm text-left transition-all"
                  style={{
                    background: active ? "#EFF6FF" : "#F9FAFB",
                    border: `1.5px solid ${active ? "#BFDBFE" : "#E5E7EB"}`,
                    color: "#1F2937",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{ borderColor: active ? "#0056D2" : "#CBD5E1", background: active ? "#0056D2" : "transparent" }}
                  >
                    {active && <CheckCircle size={10} className="text-white" />}
                  </div>
                  {slot}
                </button>
              );
            })}
          </div>

          {/* Max students */}
          <label className="text-xs mb-1 block" style={{ color: "#6B7280" }}>Max Students: {settings.maxStudents}</label>
          <input type="range" min="5" max="50" value={settings.maxStudents}
            onChange={(e) => update("maxStudents", +e.target.value)}
            className="w-full accent-blue-600" />
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 rounded-full" style={{ background: "#F3F4F6" }}>
              <div className="h-2 rounded-full" style={{ width: `${(settings.currentStudents / settings.maxStudents) * 100}%`, background: "#22C55E" }} />
            </div>
            <p className="text-xs" style={{ color: "#6B7280" }}>{settings.currentStudents}/{settings.maxStudents} filled</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
