import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import {
  Play, CheckCircle, ChevronDown, ChevronUp, Send, Bot, X,
  Sparkles, FileText, HelpCircle, List, ArrowLeft,
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
  const course = courses.find((c) => c.id === parseInt(id));

  const [activeLesson, setActiveLesson] = useState(course?.chapters[0]?.lessons[0]);
  const [expandedChapter, setExpandedChapter] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F7FA" }}>
      <div className="text-center glass-card p-10">
        <p className="mb-4" style={{ color: "#4B5563" }}>Course not found</p>
        <button onClick={() => navigate("/student/courses")} className="btn-primary px-6 py-2 rounded-lg">
          Back to Courses
        </button>
      </div>
    </div>
  );

  const totalLessons = course.chapters.reduce((a, c) => a + c.lessons.length, 0);
  const completed = course.chapters.reduce((a, c) => a + c.lessons.filter((l) => l.completed).length, 0);
  const progress = Math.round((completed / totalLessons) * 100);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let reply = `Great question about "${activeLesson?.title}"! 🤔\n\nThis concept builds on foundational principles in ${course.subject}. The key insight here is understanding the relationship between theory and application.\n\n💡 Try working through 3-5 practice problems to solidify this concept. Want me to generate some?`;
      if (lower.includes("quiz") || lower.includes("test"))
        reply = `**Quick Quiz on "${activeLesson?.title}":**\n\n**Q1.** What is the primary concept?\nA) Option A  B) Option B  ✓C) Option C  D) Option D\n\n**Q2.** Which formula applies here?\nA) Formula A  ✓B) Formula B  C) Formula C`;
      else if (lower.includes("summar"))
        reply = `**Summary of "${activeLesson?.title}":**\n\n• Core principle explained with real examples\n• Key formula and when to apply it\n• Common mistakes to avoid\n\n💡 Tip: Revisit after solving 5 practice problems!`;
      else if (lower.includes("explain") || lower.includes("simple"))
        reply = `Let me simplify this! 🌟\n\n**${activeLesson?.title}** is like building blocks — each idea supports the next.\n\n→ Start with the basic definition\n→ See how it connects to what you've learned\n→ Apply it to a real example\n\nDoes this help? Ask me to go deeper!`;

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: reply }]);
      setLoading(false);
    }, 1200);
  };

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
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#4B5563" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-sm font-bold line-clamp-1" style={{ color: "#1F2937" }}>{course.title}</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>{activeLesson?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-32 h-2 rounded-full" style={{ background: "#E5E7EB" }}>
              <div className="h-2 rounded-full" style={{ width: `${progress}%`, background: "#0056D2" }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: "#0056D2" }}>{progress}%</span>
          </div>
          <StarRating rating={course.rating} size={12} />
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={aiOpen
              ? { background: "#0056D2", color: "#FFFFFF" }
              : { background: "#EFF6FF", color: "#0056D2", border: "1.5px solid #BFDBFE" }}
          >
            <Bot size={14} /> AI Assistant
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Course Content */}
        <div
          className="w-72 shrink-0 overflow-y-auto hidden lg:block"
          style={{ background: "#FFFFFF", borderRight: "1px solid #E5E7EB" }}
        >
          <div className="p-4">
            <h3 className="text-sm font-bold mb-4" style={{ color: "#1F2937" }}>Course Content</h3>
            {course.chapters.map((chapter) => (
              <div key={chapter.id} className="mb-3">
                <button
                  onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#1F2937" }}>{chapter.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{chapter.lessons.length} lessons · {chapter.duration}</p>
                  </div>
                  {expandedChapter === chapter.id
                    ? <ChevronUp size={14} style={{ color: "#9CA3AF" }} />
                    : <ChevronDown size={14} style={{ color: "#9CA3AF" }} />}
                </button>

                {expandedChapter === chapter.id && (
                  <div className="ml-2 mt-1 space-y-0.5">
                    {chapter.lessons.map((lesson) => {
                      const active = activeLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all"
                          style={{
                            background: active ? "#EFF6FF" : "transparent",
                            borderLeft: active ? "3px solid #0056D2" : "3px solid transparent",
                          }}
                          onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#F5F7FA"; }}
                          onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                        >
                          {lesson.completed
                            ? <CheckCircle size={14} style={{ color: "#22C55E" }} className="shrink-0" />
                            : <Play size={14} style={{ color: "#9CA3AF" }} className="shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate" style={{ color: active ? "#0056D2" : "#4B5563", fontWeight: active ? 600 : 400 }}>
                              {lesson.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{lesson.duration}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Video */}
        <div className={`flex-1 overflow-y-auto p-6 ${aiOpen ? "lg:mr-80" : ""}`} style={{ background: "#F5F7FA" }}>
          <div className="video-player mb-5">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110"
                style={{ background: "#0056D2", boxShadow: "0 8px 30px rgba(0,86,210,0.35)" }}
              >
                <Play size={36} className="text-white ml-1" fill="white" />
              </button>
              <p className="text-white font-semibold text-lg">{activeLesson?.title}</p>
              <p className="mt-1 text-sm" style={{ color: "#9CA3AF" }}>{activeLesson?.duration}</p>
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: "#1F2937" }}>{activeLesson?.title}</h2>
                <p className="text-sm" style={{ color: "#4B5563" }}>
                  From: {course.chapters.find((c) => c.lessons.some((l) => l.id === activeLesson?.id))?.title}
                </p>
              </div>
              <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm shrink-0">
                <CheckCircle size={14} /> Mark as Done
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Panel */}
        {aiOpen && (
          <div
            className="fixed right-0 top-0 bottom-0 w-80 flex flex-col z-40"
            style={{ background: "#FFFFFF", borderLeft: "1px solid #E5E7EB", paddingTop: "57px", boxShadow: "-4px 0 20px rgba(0,0,0,0.06)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ borderBottom: "1px solid #E5E7EB", background: "#0056D2" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AI Doubt Assistant</p>
                  <p className="text-xs" style={{ color: "#BFDBFE" }}>● Online & Ready</p>
                </div>
              </div>
              <button
                onClick={() => setAiOpen(false)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <X size={14} />
              </button>
            </div>

            {/* Quick actions */}
            <div className="px-4 py-3 flex gap-2 flex-wrap" style={{ borderBottom: "1px solid #F3F4F6", background: "#F9FAFB" }}>
              {[
                { icon: HelpCircle, label: "Explain", prompt: "Explain this concept simply" },
                { icon: List, label: "Quiz", prompt: "Generate a quiz for this lesson" },
                { icon: FileText, label: "Summary", prompt: "Summarize this lesson" },
                { icon: Sparkles, label: "Example", prompt: "Give me a real-world example" },
              ].map(({ icon: Icon, label, prompt }) => (
                <button
                  key={label}
                  onClick={() => setInput(prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: "#EFF6FF", color: "#0056D2", border: "1px solid #BFDBFE" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#DBEAFE")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                >
                  <Icon size={11} />{label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: "#FAFBFC" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1" style={{ background: "#0056D2" }}>
                      <Bot size={13} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "ai" ? "chat-bubble-ai" : "chat-bubble-user"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#0056D2" }}>
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="chat-bubble-ai p-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: "#0056D2", animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4" style={{ borderTop: "1px solid #E5E7EB", background: "#FFFFFF" }}>
              <div className="flex gap-2">
                <input
                  className="input-field flex-1 text-xs"
                  placeholder="Ask anything about this lesson..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="btn-primary p-2.5 rounded-xl shrink-0"
                  disabled={loading}
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
