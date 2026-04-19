import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { courses } from "../../data/dummyData";
import { StarRating } from "../../components/shared/StarRating";
import { Eye, Edit, Trash2, Users, BookOpen, TrendingUp, Plus } from "lucide-react";

const tutorCourses = courses.filter((c) => c.tutorId === 1);

export default function ManageCoursesPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="tutor">
      <div className="flex items-start justify-between mb-7 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>My Courses</h1>
          <p className="text-sm mt-1" style={{ color: "#4B5563" }}>
            {tutorCourses.length} courses published · {tutorCourses.reduce((a, c) => a + c.students, 0).toLocaleString()} total students
          </p>
        </div>
        <button onClick={() => navigate("/tutor/upload")} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Plus size={17} /> Add New Course
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Students", value: tutorCourses.reduce((a, c) => a + c.students, 0).toLocaleString(), icon: Users, color: "#0056D2", bg: "#EFF6FF" },
          { label: "Total Revenue", value: `₹${tutorCourses.reduce((a, c) => a + c.price * Math.round(c.students * 0.3), 0).toLocaleString()}`, icon: TrendingUp, color: "#22C55E", bg: "#F0FDF4" },
          { label: "Avg Rating", value: (tutorCourses.reduce((a, c) => a + c.rating, 0) / tutorCourses.length).toFixed(1) + "★", icon: BookOpen, color: "#F59E0B", bg: "#FFFBEB" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="glass-card p-4 flex items-center gap-4 card-hover">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-lg font-black" style={{ color: "#1F2937" }}>{value}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tutorCourses.map((course) => (
          <div key={course.id} className="glass-card p-5 card-hover">
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: "#EFF6FF" }}>📚</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm line-clamp-2 mb-1" style={{ color: "#1F2937" }}>{course.title}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={course.rating} size={11} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>({course.reviews})</span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: "#6B7280" }}>
                  <span className="flex items-center gap-1"><Users size={10} />{course.students.toLocaleString()}</span>
                  <span className="font-bold text-base" style={{ color: "#0056D2" }}>₹{course.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
              {[
                { label: "Revenue", value: `₹${(course.price * Math.round(course.students * 0.3)).toLocaleString()}` },
                { label: "Reviews", value: course.reviews },
                { label: "Lectures", value: course.lectures },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-black" style={{ color: "#0056D2" }}>{value}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-all justify-center"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <Eye size={13} /> Preview
              </button>
              <button className="flex items-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-all justify-center"
                style={{ color: "#0056D2" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <Edit size={13} /> Edit
              </button>
              <button className="flex items-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-all justify-center"
                style={{ color: "#EF4444" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
