import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { StarRating } from "../../components/shared/StarRating";
import { Search, Play, Users, Clock, BookOpen, AlertCircle } from "lucide-react";

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All");
  const [tab, setTab] = useState("all");
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    fetchAllCourses();
    const user = JSON.parse(localStorage.getItem('user'));
    // In a real app, we'd fetch enrolled courses from backend
    // For now, we'll use a local mock or empty list
    setEnrolledIds([]);
  }, []);

  const fetchAllCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const data = await res.json();
        setAllCourses(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = allCourses.filter((c) => {
    if (tab === "enrolled" && !enrolledIds.includes(c.id)) return false;
    
    const matchS = c.title.toLowerCase().includes(search.toLowerCase()) || 
                   (c.tutor?.username || '').toLowerCase().includes(search.toLowerCase());
    const matchSub = subject === "All" || c.category === subject;
    const matchLvl = level === "All" || c.level === level;
    return matchS && matchSub && matchLvl;
  });

  if (loading) {
    return (
      <DashboardLayout role="learner">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="learner">
      <div className="mb-7 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>Courses</h1>
          <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Explore and manage your learning</p>
        </div>
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
          <button 
            onClick={() => setTab("all")} 
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${tab === "all" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Explore Courses
          </button>
          <button 
            onClick={() => setTab("enrolled")} 
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${tab === "enrolled" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            My Courses
          </button>
        </div>
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isEnrolled={enrolledIds.includes(course.id)}
              onClick={() => navigate(`/learner/course/${course.id}`)} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-card">
           <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
           <p className="text-gray-500">No courses found matching your criteria.</p>
        </div>
      )}
    </DashboardLayout>
  );
}

function CourseCard({ course, onClick, isEnrolled }) {
  const emojiMap = {
    Mathematics: "📐", Physics: "⚡", Chemistry: "🧪",
    Biology: "🧬", English: "📖", "Computer Science": "💻",
  };

  return (
    <div className="glass-card overflow-hidden card-hover cursor-pointer flex flex-col h-full" onClick={onClick}>
      {/* Thumbnail */}
      <div
        className="h-40 flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg, #EEF6FF, #E6F0FF)" }}
      >
        {course.thumbnail_url ? (
          <img src={course.thumbnail_url} className="w-full h-full object-cover" alt="" />
        ) : (
          <span className="text-6xl">{emojiMap[course.category] || "📚"}</span>
        )}
        
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
        <div className="flex justify-between items-start mb-2">
           <span className="badge badge-blue">{course.category}</span>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{course.level}</span>
        </div>
        <h3 className="font-bold text-sm mb-2 line-clamp-2" style={{ color: "#1F2937" }}>{course.title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 uppercase">
            {course.tutor?.username?.charAt(0) || 'T'}
          </div>
          <span className="text-xs" style={{ color: "#4B5563" }}>{course.tutor?.username || 'Expert Tutor'}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <StarRating rating={4.5} size={12} />
          <span className="text-xs" style={{ color: "#9CA3AF" }}>(0)</span>
        </div>
        <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "#9CA3AF" }}>
          <span className="flex items-center gap-1"><BookOpen size={11} /> {course.videos_count || 0} lessons</span>
          <span className="flex items-center gap-1"><Users size={11} /> {course.students_count || 0}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          {isEnrolled ? (
            <button className="btn-primary w-full px-4 py-2 rounded-lg text-xs font-bold bg-green-600 border-none">
              Continue Learning
            </button>
          ) : (
            <>
              <div>
                <span className="text-xl font-black" style={{ color: "#0056D2" }}>₹{(+course.price).toLocaleString()}</span>
              </div>
              <button className="btn-primary px-4 py-1.5 rounded-lg text-xs font-bold">
                Enroll Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
