import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { courses, studentProfile, tutors } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import { BookOpen, Users, Flame, Trophy, ArrowRight, Play, ChevronRight } from "lucide-react";

const enrolledCourses = courses.filter((c) => studentProfile.enrolledCourses.includes(c.id));

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: enrolledCourses.length, color: "#0056D2", bg: "#EFF6FF" },
    { icon: Flame, label: "Day Streak", value: `${studentProfile.streak} days`, color: "#F59E0B", bg: "#FFFBEB" },
    { icon: Users, label: "Booked Tutors", value: studentProfile.bookedTutors.length, color: "#22C55E", bg: "#F0FDF4" },
    { icon: Trophy, label: "Target Exam", value: studentProfile.targetExam, color: "#7C3AED", bg: "#F5F3FF" },
  ];

  return (
    <DashboardLayout role="student">
      {/* Welcome */}
      <div className="mb-7">
        <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>
          Welcome back, <span style={{ color: "#0056D2" }}>{studentProfile.name.split(" ")[0]}! 👋</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Ready to continue your learning journey?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="glass-card p-5 card-hover">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <p className="text-2xl font-black" style={{ color: "#1F2937" }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: "#6B7280" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>Continue Learning</h2>
          <button
            onClick={() => navigate("/student/courses")}
            className="flex items-center gap-1 text-sm font-semibold transition-colors"
            style={{ color: "#0056D2" }}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {enrolledCourses.map((course) => {
            const total = course.chapters.reduce((a, c) => a + c.lessons.length, 0);
            const done = course.chapters.reduce((a, c) => a + c.lessons.filter((l) => l.completed).length, 0);
            const pct = Math.round((done / total) * 100);
            return (
              <div
                key={course.id}
                className="glass-card p-5 card-hover cursor-pointer"
                onClick={() => navigate(`/student/course/${course.id}`)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                    style={{ background: "#EFF6FF" }}
                  >
                    📚
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm mb-1 truncate" style={{ color: "#1F2937" }}>{course.title}</h3>
                    <p className="text-xs" style={{ color: "#6B7280" }}>{course.tutor}</p>
                    <span className="badge badge-blue mt-2">{course.subject}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mb-2" style={{ color: "#6B7280" }}>
                  <span>{done}/{total} lessons</span>
                  <span className="font-bold" style={{ color: "#0056D2" }}>{pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: "#E5E7EB" }}>
                  <div className="progress-bar rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <button className="btn-primary flex items-center gap-2 w-full justify-center mt-4 py-2.5 rounded-xl text-sm">
                  <Play size={14} fill="white" /> Continue Watching
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        {[
          { label: "Browse All Courses", desc: "Explore 3,200+ courses", icon: BookOpen, path: "/student/courses", color: "#0056D2", bg: "#EFF6FF" },
          { label: "Book a Tutor", desc: "Find tutors near you", icon: Users, path: "/student/tutors", color: "#7C3AED", bg: "#F5F3FF" },
          { label: "Post Requirement", desc: "Let tutors find you", icon: ArrowRight, path: "/student/requests", color: "#0891B2", bg: "#F0F9FF" },
        ].map(({ label, desc, icon: Icon, path, color, bg }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="glass-card p-5 card-hover text-left flex items-center gap-4 group w-full"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: "#1F2937" }}>{label}</p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>{desc}</p>
            </div>
            <ChevronRight size={16} style={{ color: "#CBD5E1" }} />
          </button>
        ))}
      </div>

      {/* Recommended Tutors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>Recommended Tutors</h2>
          <button
            onClick={() => navigate("/student/tutors")}
            className="flex items-center gap-1 text-sm font-semibold"
            style={{ color: "#0056D2" }}
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tutors.slice(0, 3).map((tutor) => (
            <div key={tutor.id} className="glass-card p-5 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <img src={tutor.avatar} alt={tutor.name} className="w-11 h-11 rounded-full border-2" style={{ borderColor: "#E5E7EB" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#1F2937" }}>{tutor.name}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{tutor.subject}</p>
                </div>
                {tutor.verified && <div className="ml-auto badge badge-green">✓ Verified</div>}
              </div>
              <StarRating rating={tutor.rating} />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-xl font-black" style={{ color: "#0056D2" }}>₹{tutor.monthlyFee.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>per month</p>
                </div>
                <button
                  onClick={() => navigate("/student/tutors")}
                  className="btn-primary px-4 py-2 rounded-lg text-sm"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
