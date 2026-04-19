import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { courses } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import { Search, Play, Users, Clock, BookOpen } from "lucide-react";

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All");

  const filtered = courses.filter((c) => {
    const matchS = c.title.toLowerCase().includes(search.toLowerCase()) || c.tutor.toLowerCase().includes(search.toLowerCase());
    const matchSub = subject === "All" || c.subject === subject;
    const matchLvl = level === "All" || c.level === level;
    return matchS && matchSub && matchLvl;
  });

  return (
    <DashboardLayout role="student">
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Browse Courses</h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Explore {courses.length} high-quality courses from expert tutors</p>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-lg" style={{ background: "#F5F7FA", border: "1.5px solid #E5E7EB" }}>
            <Search size={15} style={{ color: "#9CA3AF" }} className="shrink-0" />
            <input
              className="bg-transparent outline-none text-sm w-full"
              style={{ color: "#1F2937" }}
              placeholder="Search courses, tutors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input-field md:w-44 text-sm"
          >
            <option value="All">All Levels</option>
            {levels.slice(1).map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Subject Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
              style={{
                background: subject === s ? "#0056D2" : "#F5F7FA",
                color: subject === s ? "#FFFFFF" : "#4B5563",
                border: `1.5px solid ${subject === s ? "#0056D2" : "#E5E7EB"}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm mb-5 font-medium" style={{ color: "#6B7280" }}>{filtered.length} courses found</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} onClick={() => navigate(`/student/course/${course.id}`)} />
        ))}
      </div>
    </DashboardLayout>
  );
}

function CourseCard({ course, onClick }) {
  const emojiMap = {
    Mathematics: "📐", Physics: "⚡", Chemistry: "🧪",
    Biology: "🧬", English: "📖", "Computer Science": "💻",
  };
  const badgeStyle = {
    Bestseller: "badge-orange",
    New: "badge-green",
    "Top Rated": "badge-blue",
    Popular: "badge-purple",
  };

  return (
    <div className="glass-card overflow-hidden card-hover cursor-pointer flex flex-col" onClick={onClick}>
      {/* Thumbnail */}
      <div
        className="h-40 flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg, #EEF6FF, #E6F0FF)" }}
      >
        <span className="text-6xl">{emojiMap[course.subject] || "📚"}</span>
        <div className="absolute top-3 left-3">
          {course.badge && (
            <span className={`badge ${badgeStyle[course.badge] || "badge-blue"}`}>{course.badge}</span>
          )}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity"
          style={{ background: "rgba(0,86,210,0.08)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#0056D2" }}
          >
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <span className="badge badge-blue mb-2">{course.subject}</span>
        <h3 className="font-bold text-sm mb-2 line-clamp-2" style={{ color: "#1F2937" }}>{course.title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <img src={course.avatar} alt={course.tutor} className="w-6 h-6 rounded-full" />
          <span className="text-xs" style={{ color: "#4B5563" }}>{course.tutor}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <StarRating rating={course.rating} size={12} />
          <span className="text-xs" style={{ color: "#9CA3AF" }}>({course.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "#9CA3AF" }}>
          <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={11} /> {course.lectures} lessons</span>
          <span className="flex items-center gap-1"><Users size={11} /> {course.students.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-black" style={{ color: "#0056D2" }}>₹{course.price.toLocaleString()}</span>
            <span className="text-xs ml-2 line-through" style={{ color: "#9CA3AF" }}>₹{course.originalPrice.toLocaleString()}</span>
          </div>
          <button className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
