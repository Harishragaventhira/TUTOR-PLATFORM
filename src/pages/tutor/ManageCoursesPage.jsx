import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { StarRating } from "../../components/shared/StarRating";
import { Eye, Edit, Trash2, Users, BookOpen, TrendingUp, Plus, X, Save } from "lucide-react";

export default function ManageCoursesPage() {
  const navigate = useNavigate();
  const [tutorCourses, setTutorCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState(null);
  
  // Edit State
  const [editingCourse, setEditingCourse] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", price: "", category: "", level: "", status: "" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setSessionUser(user);
      fetchTutorCourses(user.id);
    }
  }, []);

  const fetchTutorCourses = async (userId) => {
    try {
      const res = await fetch(`/api/courses/tutor/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setTutorCourses(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course? This will also remove all associated videos and cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
      if (res.ok) {
        setTutorCourses(tutorCourses.filter(c => c.id !== courseId));
        alert("Course deleted successfully");
      } else {
        const data = await res.json();
        alert("Failed to delete course: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error deleting course: " + err.message);
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setEditForm({
      title: course.title,
      description: course.description || "",
      price: course.price,
      category: course.category,
      level: course.level,
      status: course.status
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      const data = await res.json();
      if (res.ok) {
        setTutorCourses(tutorCourses.map(c => c.id === data.id ? { ...c, ...data } : c));
        setEditingCourse(null);
        alert("Course updated successfully! Changes will reflect for Learners immediately.");
      } else {
        alert("Failed to update course: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error updating course: " + err.message);
    }
  };

  const totalStudents = tutorCourses.reduce((a, c) => a + (c.students_count || 0), 0);
  const totalRevenue = tutorCourses.reduce((a, c) => a + ((c.price || 0) * (c.students_count || 0) * 0.85), 0);

  if (loading) {
    return (
      <DashboardLayout role="tutor">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="tutor">
      <div className="flex items-start justify-between mb-7 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#1F2937" }}>My Courses</h1>
          <p className="text-sm mt-1" style={{ color: "#4B5563" }}>
            {tutorCourses.length} courses created · {totalStudents.toLocaleString()} total students
          </p>
        </div>
        <button onClick={() => navigate("/tutor/upload")} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Plus size={17} /> Add New Course
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users, color: "#0056D2", bg: "#EFF6FF" },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "#22C55E", bg: "#F0FDF4" },
          { label: "Total Courses", value: tutorCourses.length, icon: BookOpen, color: "#F59E0B", bg: "#FFFBEB" },
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
               {course.thumbnail_url ? (
                 <img src={course.thumbnail_url} className="w-16 h-16 rounded-xl object-cover shrink-0" alt="" />
               ) : (
                 <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: "#EFF6FF" }}>📚</div>
               )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm line-clamp-2 mb-1" style={{ color: "#1F2937" }}>{course.title}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={4.5} size={11} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>(0)</span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: "#6B7280" }}>
                  <span className="flex items-center gap-1"><Users size={10} />{course.students_count || 0}</span>
                  <span className="font-bold text-base" style={{ color: "#0056D2" }}>₹{(+course.price).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Status & Info */}
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
              {[
                { label: "Status", value: course.status },
                { label: "Level", value: course.level },
                { label: "Videos", value: course.videos?.length || 0 },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-black capitalize" style={{ color: "#0056D2" }}>{value}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-all justify-center"
                style={{ color: "#6B7280" }}
                onClick={() => navigate(`/learner/course/${course.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F7FA")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <Eye size={13} /> Preview
              </button>
              <button className="flex items-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-all justify-center"
                style={{ color: "#0056D2" }}
                onClick={() => handleEditClick(course)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <Edit size={13} /> Edit
              </button>
              <button className="flex items-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-medium transition-all justify-center"
                style={{ color: "#EF4444" }}
                onClick={() => handleDelete(course.id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
        {tutorCourses.length === 0 && (
          <div className="col-span-full py-12 text-center glass-card">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-bold text-gray-800">No courses yet</h3>
            <p className="text-gray-500 mb-6">Start sharing your expertise by creating your first course.</p>
            <button onClick={() => navigate("/tutor/upload")} className="btn-primary px-6 py-2 rounded-lg text-sm">
              Create My First Course
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn">
             <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Edit Course Details</h2>
                <button onClick={() => setEditingCourse(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <X size={20} className="text-gray-400" />
                </button>
             </div>
             
             <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Course Title</label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none"
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    >
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>English</option>
                      <option>Computer Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Price (₹)</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Difficulty Level</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none"
                      value={editForm.level}
                      onChange={(e) => setEditForm({...editForm, level: e.target.value})}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Visibility Status</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none"
                      value={editForm.status}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    >
                      <option value="published">Published (Visible to all)</option>
                      <option value="draft">Draft (Hidden)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none resize-none"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                   <button type="button" onClick={() => setEditingCourse(null)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                      Cancel
                   </button>
                   <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                      <Save size={18} /> Update Course
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
