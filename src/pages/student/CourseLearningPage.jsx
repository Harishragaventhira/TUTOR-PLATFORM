import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarRating } from "../../components/shared/StarRating";
import {
  Play, CheckCircle, ChevronDown, ChevronUp, Send, Bot, X,
  Sparkles, FileText, HelpCircle, List, ArrowLeft, Loader2
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    role: "ai",
    text: "Hi! I'm your AI learning assistant 🤖 Ask me anything about this lesson — doubts, explanations, quizzes, or summaries!",
  },
];

export default function CourseLearningPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
        if (data.videos && data.videos.length > 0) {
          setActiveLesson(data.videos[0]);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalLessons = course?.videos?.length || 0;
  const progress = 0; // In a real app, track lesson completion in DB

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAiLoading(true);

    setTimeout(() => {
      const reply = `I'm analyzing the content of "${activeLesson?.title}". \n\nThis lesson covers the core concepts of ${course?.category}. \n\nWould you like me to explain a specific part of the video or generate a quick practice quiz for you?`;
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: reply }]);
      setAiLoading(false);
    }, 1200);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F7FA" }}>
      <div className="text-center glass-card p-10">
        <p className="mb-4" style={{ color: "#4B5563" }}>Course not found</p>
        <button onClick={() => navigate("/learner/courses")} className="btn-primary px-6 py-2 rounded-lg">
          Back to Courses
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFFFF" }}>
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-50"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg transition-colors text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-sm font-bold line-clamp-1" style={{ color: "#1F2937" }}>{course.title}</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>{activeLesson?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <StarRating rating={4.5} size={12} />
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${aiOpen ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}
          >
            <Bot size={14} /> AI Assistant
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Course Content */}
        <div
          className="w-80 shrink-0 overflow-y-auto hidden lg:block"
          style={{ background: "#FFFFFF", borderRight: "1px solid #E5E7EB" }}
        >
          <div className="p-4">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <List size={16} /> Course Curriculum
            </h3>
            <div className="space-y-1">
              {course.videos?.map((lesson, idx) => {
                const active = activeLesson?.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${active ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                       {active ? <Play size={12} fill="white" /> : <span className="text-[10px]">{idx + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs truncate ${active ? 'font-bold text-blue-700' : 'text-gray-600'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-[10px] mt-0.5 text-gray-400">{lesson.duration || 'Video'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: Video */}
        <div className={`flex-1 overflow-y-auto p-6 transition-all ${aiOpen ? "lg:mr-80" : ""}`} style={{ background: "#F8FAFC" }}>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group mb-6">
              {activeLesson ? (
                <video 
                  key={activeLesson.video_url}
                  controls 
                  className="w-full h-full object-contain"
                  poster={course.thumbnail_url}
                >
                  <source src={activeLesson.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                   <p>No video selected</p>
                </div>
              )}
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black mb-2" style={{ color: "#1F2937" }}>{activeLesson?.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{course.category}</span>
                    <span>•</span>
                    <span>Instructor: {course.tutor?.username}</span>
                  </div>
                </div>
                <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-blue-200">
                  <CheckCircle size={16} /> Mark Lesson as Complete
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                 <h4 className="font-bold text-sm mb-2">About this lesson</h4>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   {course.description || "In this lesson, we will explore the core concepts and practical applications of this topic."}
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Panel */}
        {aiOpen && (
          <div
            className="fixed right-0 top-0 bottom-0 w-80 flex flex-col z-40 bg-white border-l border-gray-200 pt-14 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Course AI Tutor</p>
                  <p className="text-[10px] text-blue-100">Analyzing lesson content...</p>
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-white/60 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`max-w-[85%] p-3 text-[11px] leading-relaxed rounded-2xl ${
                      msg.role === "ai" ? "bg-white text-gray-800 shadow-sm border border-gray-100" : "bg-blue-600 text-white shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex gap-2">
                   <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <Loader2 size={16} className="animate-spin text-blue-600" />
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  className="input-field flex-1 text-xs h-10"
                  placeholder="Ask a doubt..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="btn-primary p-2.5 rounded-xl"
                  disabled={aiLoading}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
