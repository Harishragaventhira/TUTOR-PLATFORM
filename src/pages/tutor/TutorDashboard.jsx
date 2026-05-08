import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { tutorProfile, courses, studentRequests } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import { TrendingUp, Users, BookOpen, DollarSign, Upload, ClipboardList, MessageSquare, ChevronRight, Eye, Star } from "lucide-react";

const tutorCourses = courses.filter((c) => c.tutorId === 1);

export default function TutorDashboard() {
  const navigate = useNavigate();
  
  // Get logged-in user from localStorage
  const sessionUser = JSON.parse(localStorage.getItem('user')) || { username: 'Tutor' };

  const stats = [
    { icon: DollarSign, label: "This Month", value: `₹${tutorProfile.thisMonthEarnings.toLocaleString()}`, sub: "Earnings", color: "#22C55E", bg: "#F0FDF4" },
    { icon: Users, label: "Active Students", value: tutorProfile.activeStudents, sub: "Currently enrolled", color: "#0056D2", bg: "#EFF6FF" },
    { icon: BookOpen, label: "Courses Sold", value: tutorProfile.coursesSold, sub: "Total units", color: "#7C3AED", bg: "#F5F3FF" },
    { icon: Star, label: "Rating", value: `${tutorProfile.rating}★`, sub: `${tutorProfile.reviews} reviews`, color: "#F59E0B", bg: "#FFFBEB" },
  ];

  return (
    <DashboardLayout role="tutor">
      {/* Welcome */}
      <div className="flex items-start justify-between mb-7 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>
            Welcome, <span style={{ color: "#0056D2" }}>{sessionUser.username.split(" ")[0]}! 👋</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "#4B5563" }}>Here's your teaching dashboard overview</p>
        </div>
        <button onClick={() => navigate("/tutor/upload")} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Upload size={17} /> Upload New Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className="glass-card p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <span className="badge badge-green text-xs">+12%</span>
            </div>
            <p className="text-2xl font-black" style={{ color: "#1F2937" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{sub}</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Earnings chart */}
      <div className="glass-card p-6 mb-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>Earnings Overview</h2>
          <span className="badge badge-green">Total: ₹{tutorProfile.totalEarnings.toLocaleString()}</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {[6000, 9000, 7500, 11000, 8500, 14000, 12000].map((val, i) => {
            const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
            const maxVal = 14000;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg transition-all cursor-pointer"
                  style={{
                    height: `${(val / maxVal) * 100}%`,
                    background: i === 5 ? "#0056D2" : "#BFDBFE",
                    minHeight: "8px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = i === 5 ? "#0042A8" : "#93C5FD")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i === 5 ? "#0056D2" : "#BFDBFE")}
                />
                <span className="text-xs" style={{ color: "#9CA3AF" }}>{months[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>My Courses</h2>
            <button onClick={() => navigate("/tutor/courses")} className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#0056D2" }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {tutorCourses.slice(0, 2).map((course) => (
              <div key={course.id} className="glass-card p-4 card-hover">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: "#EFF6FF" }}>📚</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "#1F2937" }}>{course.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <StarRating rating={course.rating} size={11} />
                      <span className="text-xs" style={{ color: "#6B7280" }}>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-lg" style={{ color: "#0056D2" }}>₹{course.price.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-xs mt-1" style={{ color: "#9CA3AF" }}>
                      <Eye size={10} />{course.reviews} reviews
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Student Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: "#1F2937" }}>Student Requests</h2>
            <button onClick={() => navigate("/tutor/requests")} className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#0056D2" }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {studentRequests.slice(0, 3).map((req) => (
              <div key={req.id} className="glass-card p-4 card-hover cursor-pointer" onClick={() => navigate("/tutor/requests")}>
                <div className="flex items-center gap-3">
                  <img src={req.avatar} alt={req.studentName} className="w-10 h-10 rounded-xl shrink-0 border-2" style={{ borderColor: "#E5E7EB" }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "#1F2937" }}>{req.studentName}</p>
                    <p className="text-xs font-semibold" style={{ color: "#0056D2" }}>{req.subject}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#6B7280" }}>{req.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black" style={{ color: "#0056D2" }}>₹{req.budget.toLocaleString()}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>/month</p>
                    <span className={`badge mt-1 inline-block ${req.status === "open" ? "badge-green" : "badge-blue"}`}>{req.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Upload, label: "Upload Course", path: "/tutor/upload", color: "#0056D2", bg: "#EFF6FF" },
          { icon: ClipboardList, label: "View Requests", path: "/tutor/requests", color: "#7C3AED", bg: "#F5F3FF" },
          { icon: MessageSquare, label: "Messages", path: "/tutor/chat", color: "#0891B2", bg: "#F0F9FF" },
          { icon: TrendingUp, label: "Earnings", path: "/tutor/earnings", color: "#22C55E", bg: "#F0FDF4" },
        ].map(({ icon: Icon, label, path, color, bg }) => (
          <button key={label} onClick={() => navigate(path)} className="glass-card p-5 card-hover flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: "#4B5563" }}>{label}</span>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
}
