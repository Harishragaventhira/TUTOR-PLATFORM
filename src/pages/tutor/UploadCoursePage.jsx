import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { tutorProfile } from "../../data/dummyData";
import { Upload, Image, Play, Plus, CheckCircle, BookOpen } from "lucide-react";

export default function UploadCoursePage() {
  const [form, setForm] = useState({ title: "", subject: "", description: "", price: "", level: "Beginner" });
  const [chapters, setChapters] = useState([
    { id: 1, title: "Chapter 1", lessons: [{ id: 1, title: "", file: null }] },
  ]);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const updateForm = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const addChapter = () => setChapters((prev) => [...prev, {
    id: Date.now(), title: `Chapter ${prev.length + 1}`, lessons: [{ id: Date.now() + 1, title: "", file: null }],
  }]);

  const addLesson = (chId) => setChapters((prev) => prev.map((ch) =>
    ch.id === chId ? { ...ch, lessons: [...ch.lessons, { id: Date.now(), title: "", file: null }] } : ch
  ));

  const updateChapter = (chId, val) => setChapters((prev) => prev.map((ch) =>
    ch.id === chId ? { ...ch, title: val } : ch
  ));

  if (success) return (
    <DashboardLayout role="tutor">
      <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="text-center glass-card p-12 max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#F0FDF4" }}>
            <CheckCircle size={40} style={{ color: "#22C55E" }} />
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: "#1F2937" }}>Course Uploaded!</h2>
          <p className="mb-6" style={{ color: "#4B5563" }}>
            Your course "{form.title}" has been submitted for review. It'll go live within 24 hours.
          </p>
          <button
            onClick={() => { setSuccess(false); setStep(1); setForm({ title: "", subject: "", description: "", price: "", level: "Beginner" }); }}
            className="btn-primary px-8 py-3 rounded-xl"
          >
            Upload Another Course
          </button>
        </div>
      </div>
    </DashboardLayout>
  );

  const steps = [
    { n: 1, label: "Course Info" },
    { n: 2, label: "Curriculum" },
    { n: 3, label: "Pricing" },
  ];

  return (
    <DashboardLayout role="tutor">
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Upload a Course</h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Share your knowledge and earn from thousands of students</p>
      </div>

      {/* Step tracker */}
      <div className="flex items-center gap-3 mb-8">
        {steps.map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-3">
            <button
              onClick={() => step > n && setStep(n)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all`}
              style={{
                background: step === n ? "#0056D2" : step > n ? "#F0FDF4" : "#F5F7FA",
                color: step === n ? "#FFFFFF" : step > n ? "#16A34A" : "#4B5563",
                border: step > n ? "1px solid #BBF7D0" : "1px solid transparent",
              }}
            >
              {step > n ? <CheckCircle size={14} /> : <span>{n}</span>}
              {label}
            </button>
            {i < 2 && <div className="w-8 h-px" style={{ background: "#E5E7EB" }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="max-w-2xl space-y-5">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
              <BookOpen size={18} style={{ color: "#0056D2" }} /> Course Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Course Title *</label>
                <input className="input-field" placeholder="e.g. Complete Mathematics for JEE 2025"
                  value={form.title} onChange={(e) => updateForm("title", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Subject *</label>
                  <select className="input-field" value={form.subject} onChange={(e) => updateForm("subject", e.target.value)}>
                    <option value="">Select Subject</option>
                    {["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Level</label>
                  <select className="input-field" value={form.level} onChange={(e) => updateForm("level", e.target.value)}>
                    {["Beginner", "Intermediate", "Advanced"].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Description *</label>
                <textarea className="input-field" rows={4}
                  placeholder="Describe what students will learn, prerequisites, target audience..."
                  value={form.description} onChange={(e) => updateForm("description", e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Course Thumbnail</label>
                <div
                  className="h-32 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all"
                  style={{ border: "2px dashed #CBD5E1", background: "#F9FAFB" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0056D2")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
                >
                  <Image size={24} className="mb-2" style={{ color: "#CBD5E1" }} />
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>Click to upload thumbnail</p>
                  <p className="text-xs" style={{ color: "#CBD5E1" }}>16:9 ratio, min 720p</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="btn-primary px-8 py-3 rounded-xl">Continue to Curriculum →</button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-2xl space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
              <Play size={18} style={{ color: "#0056D2" }} /> Course Curriculum
            </h3>
            {chapters.map((ch, ci) => (
              <div key={ch.id} className="mb-5 p-4 rounded-xl" style={{ border: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                <input className="input-field mb-4 font-semibold" value={ch.title}
                  onChange={(e) => updateChapter(ch.id, e.target.value)} placeholder="Chapter Title" />
                {ch.lessons.map((lesson, li) => (
                  <div key={lesson.id} className="flex items-center gap-3 mb-2">
                    <span className="text-xs w-5" style={{ color: "#9CA3AF" }}>{li + 1}.</span>
                    <input className="input-field flex-1 text-sm" placeholder="Lesson title"
                      value={lesson.title}
                      onChange={(e) => setChapters((prev) => prev.map((c) =>
                        c.id === ch.id ? { ...c, lessons: c.lessons.map((l) => l.id === lesson.id ? { ...l, title: e.target.value } : l) } : c
                      ))} />
                    <button
                      className="px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                      style={{ color: "#0056D2", border: "1px solid #BFDBFE", background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Upload size={12} className="inline mr-1" /> Upload
                    </button>
                  </div>
                ))}
                <button onClick={() => addLesson(ch.id)}
                  className="flex items-center gap-2 text-xs mt-2 transition-colors"
                  style={{ color: "#0056D2" }}>
                  <Plus size={12} /> Add Lesson
                </button>
              </div>
            ))}
            <button
              onClick={addChapter}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium w-full justify-center transition-all"
              style={{ border: "1.5px dashed #CBD5E1", color: "#0056D2" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Plus size={16} /> Add Chapter
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-ghost px-6 py-3 rounded-xl text-sm">← Back</button>
            <button onClick={() => setStep(3)} className="btn-primary px-8 py-3 rounded-xl text-sm">Continue to Pricing →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-2xl">
          <div className="glass-card p-6 mb-5">
            <h3 className="font-bold mb-5" style={{ color: "#1F2937" }}>💰 Set Your Price</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Course Price (₹) *</label>
                <input className="input-field text-xl font-bold" type="number" placeholder="e.g. 1999"
                  value={form.price} onChange={(e) => updateForm("price", e.target.value)} />
                <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>
                  💡 Courses priced ₹1,499–₹2,499 sell 3x more. You keep 85% of every sale.
                </p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: "#16A34A" }}>Estimated Earnings</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Per Sale", val: `₹${Math.round((+form.price || 1999) * 0.85)}` },
                    { label: "If 100 students", val: `₹${Math.round((+form.price || 1999) * 0.85 * 100).toLocaleString()}` },
                    { label: "If 1000 students", val: `₹${Math.round((+form.price || 1999) * 0.85 * 1000).toLocaleString()}` },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-lg font-black" style={{ color: "#0056D2" }}>{val}</p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-ghost px-6 py-3 rounded-xl text-sm">← Back</button>
            <button onClick={() => setSuccess(true)} className="btn-primary flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
              <Upload size={17} /> Publish Course
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
