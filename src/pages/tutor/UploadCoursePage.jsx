import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Upload, Image, Play, Plus, CheckCircle, BookOpen, AlertCircle, Trash2, FileVideo } from "lucide-react";

export default function UploadCoursePage() {
  const [sessionUser, setSessionUser] = useState(null);
  const [form, setForm] = useState({ 
    title: "", 
    subject: "", 
    description: "", 
    price: "", 
    level: "Beginner",
    thumbnail_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600" 
  });
  const [chapters, setChapters] = useState([
    { id: 1, title: "Course Introduction", lessons: [{ id: 1, title: "Welcome to the course", file: null, duration: "" }] },
  ]);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setSessionUser(user);
  }, []);

  const updateForm = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const addChapter = () => setChapters((prev) => [...prev, {
    id: Date.now(), title: `New Chapter`, lessons: [{ id: Date.now() + 1, title: "", file: null, duration: "" }],
  }]);

  const addLesson = (chId) => setChapters((prev) => prev.map((ch) =>
    ch.id === chId ? { ...ch, lessons: [...ch.lessons, { id: Date.now(), title: "", file: null, duration: "" }] } : ch
  ));

  const updateChapter = (chId, val) => setChapters((prev) => prev.map((ch) =>
    ch.id === chId ? { ...ch, title: val } : ch
  ));

  const updateLesson = (chId, lessonId, field, val) => setChapters((prev) => prev.map((ch) =>
    ch.id === chId ? { ...ch, lessons: ch.lessons.map(l => l.id === lessonId ? { ...l, [field]: val } : l) } : ch
  ));

  const removeLesson = (chId, lessonId) => setChapters((prev) => prev.map((ch) =>
    ch.id === chId ? { ...ch, lessons: ch.lessons.filter(l => l.id !== lessonId) } : ch
  ));

  const handleSubmit = async () => {
    if (!sessionUser) return;
    setLoading(true);
    setError("");
    setProgress(0);

    try {
      // 1. Create the Course Entry
      const courseRes = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutor_id: sessionUser.id,
          title: form.title,
          description: form.description,
          price: form.price,
          category: form.subject,
          level: form.level,
          thumbnail_url: form.thumbnail_url
        })
      });

      if (!courseRes.ok) {
        const text = await courseRes.text();
        console.error("Server Error Response:", text);
        throw new Error(`Server returned ${courseRes.status}: ${text.substring(0, 100)}...`);
      }
      
      const course = await courseRes.json();

      // 2. Upload Videos (Lessons)
      let totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
      let uploadedCount = 0;
      let orderIndex = 1;

      for (const chapter of chapters) {
        for (const lesson of chapter.lessons) {
          if (!lesson.title || !lesson.file) {
            uploadedCount++;
            continue;
          }
          
          const formData = new FormData();
          formData.append('video', lesson.file);
          formData.append('title', `${chapter.title}: ${lesson.title}`);
          formData.append('duration', lesson.duration || "5:00");
          formData.append('order_index', orderIndex++);
          formData.append('is_preview', orderIndex === 2);

          const videoRes = await fetch(`/api/courses/${course.id}/upload-video`, {
            method: 'POST',
            body: formData
          });

          if (!videoRes.ok) {
            const errorData = await videoRes.json();
            throw new Error(errorData.error || `Failed to upload video: ${lesson.title}`);
          }
          
          uploadedCount++;
          setProgress(Math.round((uploadedCount / totalLessons) * 100));
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <DashboardLayout role="tutor">
      <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="text-center glass-card p-12 max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#F0FDF4" }}>
            <CheckCircle size={40} style={{ color: "#22C55E" }} />
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: "#1F2937" }}>Course Uploaded!</h2>
          <p className="mb-6" style={{ color: "#4B5563" }}>
            Your videos have been processed and your course is now live.
          </p>
          <button
            onClick={() => { window.location.reload(); }}
            className="btn-primary px-8 py-3 rounded-xl"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    </DashboardLayout>
  );

  const steps = [
    { n: 1, label: "Course Info" },
    { n: 2, label: "Videos" },
    { n: 3, label: "Publish" },
  ];

  return (
    <DashboardLayout role="tutor">
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Create New Course</h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Upload your video lessons and set your price.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3 bg-red-50 border border-red-100 text-red-600">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

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
              <BookOpen size={18} style={{ color: "#0056D2" }} /> Course Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Course Title *</label>
                <input className="input-field" placeholder="e.g. Master React in 30 Days"
                  value={form.title} onChange={(e) => updateForm("title", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Category *</label>
                  <select className="input-field" value={form.subject} onChange={(e) => updateForm("subject", e.target.value)}>
                    <option value="">Select Category</option>
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
                  placeholder="What will students learn in this course?"
                  value={form.description} onChange={(e) => updateForm("description", e.target.value)} />
              </div>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="btn-primary px-8 py-3 rounded-xl">Continue to Video Upload →</button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-3xl space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-5 flex items-center gap-2" style={{ color: "#1F2937" }}>
              <Play size={18} style={{ color: "#0056D2" }} /> Upload Video Lessons
            </h3>
            {chapters.map((ch, ci) => (
              <div key={ch.id} className="mb-6 p-5 rounded-xl" style={{ border: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                <div className="flex justify-between items-center mb-4">
                  <input className="bg-transparent border-b border-gray-300 font-bold text-gray-800 focus:outline-none focus:border-blue-600 px-1 py-1" 
                    value={ch.title}
                    onChange={(e) => updateChapter(ch.id, e.target.value)} placeholder="Chapter Title" />
                </div>
                
                <div className="space-y-4">
                  {ch.lessons.map((lesson, li) => (
                    <div key={lesson.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-2">
                           <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">{li + 1}</span>
                           <input className="text-sm font-semibold text-gray-800 bg-transparent outline-none border-b border-transparent focus:border-blue-200" 
                             placeholder="Lesson Title..."
                             value={lesson.title}
                             onChange={(e) => updateLesson(ch.id, lesson.id, "title", e.target.value)} />
                         </div>
                         <button onClick={() => removeLesson(ch.id, lesson.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                         </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed transition-all ${lesson.file ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-200 bg-gray-50'}`}>
                            {lesson.file ? (
                              <>
                                <CheckCircle size={18} className="text-green-500" />
                                <span className="text-xs font-medium text-green-700 truncate max-w-[200px]">{lesson.file.name}</span>
                              </>
                            ) : (
                              <>
                                <FileVideo size={18} className="text-gray-400" />
                                <span className="text-xs font-medium text-gray-500">Select Video File (MP4, MKV)</span>
                              </>
                            )}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="video/*" 
                              onChange={(e) => updateLesson(ch.id, lesson.id, "file", e.target.files[0])} 
                            />
                          </div>
                        </label>
                        <input 
                          className="w-24 text-center text-xs p-3 rounded-lg border border-gray-200 bg-white" 
                          placeholder="Duration (m:s)"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(ch.id, lesson.id, "duration", e.target.value)} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => addLesson(ch.id)}
                  className="flex items-center gap-2 text-xs mt-4 transition-colors font-bold uppercase tracking-wider"
                  style={{ color: "#0056D2" }}>
                  <Plus size={14} /> Add Lesson
                </button>
              </div>
            ))}
            <button
              onClick={addChapter}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold w-full justify-center transition-all bg-white border-2 border-dashed border-blue-100 text-blue-600 hover:bg-blue-50"
            >
              <Plus size={18} /> Add Another Chapter
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
          <div className="glass-card p-8 mb-6">
            <h3 className="font-bold mb-6 text-xl" style={{ color: "#1F2937" }}>💰 Finalize Your Course</h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: "#6B7280" }}>Set Price (₹) *</label>
                <input className="input-field text-2xl font-black text-blue-600" type="number" placeholder="e.g. 1999"
                  value={form.price} onChange={(e) => updateForm("price", e.target.value)} />
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="font-bold text-blue-900">Upload Summary</h4>
                   <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-bold">{chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} Videos</span>
                </div>
                <ul className="space-y-2 text-sm text-blue-700">
                   <li>• Total Chapters: {chapters.length}</li>
                   <li>• Target Audience: {form.level} Level</li>
                   <li>• Your Revenue Share: 85%</li>
                </ul>
              </div>

              {loading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
                    <span>Uploading Videos...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(2)} className="btn-ghost px-8 py-4 rounded-xl text-sm" disabled={loading}>← Back</button>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="btn-primary flex-1 py-4 rounded-xl text-sm flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><Upload size={20} /> Publish & Upload Files</>
              )}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
