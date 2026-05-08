import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import CoursesPage from "./pages/student/CoursesPage";
import CourseLearningPage from "./pages/student/CourseLearningPage";
import TutorBookingPage from "./pages/student/TutorBookingPage";
import RequestsPage from "./pages/student/RequestsPage";
import ChatPage from "./pages/student/ChatPage";
import TutorDashboard from "./pages/tutor/TutorDashboard";
import UploadCoursePage from "./pages/tutor/UploadCoursePage";
import ManageCoursesPage from "./pages/tutor/ManageCoursesPage";
import EarningsPage from "./pages/tutor/EarningsPage";
import TutorRequestsPage from "./pages/tutor/TutorRequestsPage";
import AvailabilityPage from "./pages/tutor/AvailabilityPage";
import TutorProfile from "./pages/tutor/TutorProfile";

// Shared Imports
import TutoringSessions from "./pages/shared/TutoringSessions";
import Subscriptions from "./pages/shared/Subscriptions";

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TutorVerifications from "./pages/admin/TutorVerifications";
import TutorVerificationDetail from "./pages/admin/TutorVerificationDetail";
import StudentVerifications from "./pages/admin/StudentVerifications";
import StudentVerificationDetail from "./pages/admin/StudentVerificationDetail";
import StudentManagement from "./pages/admin/StudentManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import StudentProfileDetail from "./pages/admin/StudentProfileDetail";

// Auth Imports
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";

// Registration Imports
import TutorRegistration from "./pages/tutor/TutorRegistration";
import TutorDocumentUpload from "./pages/tutor/TutorDocumentUpload";
import TutorVerificationPending from "./pages/tutor/TutorVerificationPending";
import RejectedTutorResubmission from "./pages/tutor/RejectedTutorResubmission";
import StudentRegistration from "./pages/student/StudentRegistration";
import StudentVerificationPending from "./pages/student/StudentVerificationPending";
import StudentProfile from "./pages/student/StudentProfile";

// Role Protected Route Component
const RoleProtectedRoute = ({ children, allowedRole }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Handle Admin
  if (user.role === 'admin' || user.username === 'admin' || user.profileType === 'admin') {
    return children;
  }

  // Map 'student' to 'learner' for backward compatibility and consistency
  const role = (user.profileType || user.type || "").toLowerCase().replace('student', 'learner');
  const required = allowedRole.toLowerCase().replace('student', 'learner');

  if (role !== required) {
    console.warn(`Access denied. User role: ${role}, Required: ${required}`);
    return <Navigate to={role ? `/${role}` : "/"} replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing and Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Learner Routes */}
        <Route path="/learner/register" element={<StudentRegistration />} />
        <Route path="/learner/verification-pending" element={<StudentVerificationPending />} />
        
        <Route path="/learner" element={<RoleProtectedRoute allowedRole="learner"><StudentDashboard /></RoleProtectedRoute>} />
        <Route path="/learner/profile" element={<RoleProtectedRoute allowedRole="learner"><StudentProfile /></RoleProtectedRoute>} />
        <Route path="/learner/courses" element={<RoleProtectedRoute allowedRole="learner"><CoursesPage /></RoleProtectedRoute>} />
        <Route path="/learner/tutoring" element={<RoleProtectedRoute allowedRole="learner"><TutoringSessions /></RoleProtectedRoute>} />
        <Route path="/learner/subscriptions" element={<RoleProtectedRoute allowedRole="learner"><Subscriptions /></RoleProtectedRoute>} />
        <Route path="/learner/course/:id" element={<RoleProtectedRoute allowedRole="learner"><CourseLearningPage /></RoleProtectedRoute>} />
        <Route path="/learner/tutors" element={<RoleProtectedRoute allowedRole="learner"><TutorBookingPage /></RoleProtectedRoute>} />
        <Route path="/learner/requests" element={<RoleProtectedRoute allowedRole="learner"><RequestsPage /></RoleProtectedRoute>} />
        <Route path="/learner/chat" element={<RoleProtectedRoute allowedRole="learner"><ChatPage role="learner" /></RoleProtectedRoute>} />

        {/* Tutor Routes */}
        <Route path="/tutor/register" element={<TutorRegistration />} />
        <Route path="/tutor/register/documents" element={<TutorDocumentUpload />} />
        <Route path="/tutor/verification-pending" element={<TutorVerificationPending />} />
        <Route path="/tutor/rejected" element={<RejectedTutorResubmission />} />
        
        <Route path="/tutor" element={<RoleProtectedRoute allowedRole="tutor"><TutorDashboard /></RoleProtectedRoute>} />
        <Route path="/tutor/profile" element={<RoleProtectedRoute allowedRole="tutor"><TutorProfile /></RoleProtectedRoute>} />
        <Route path="/tutor/upload" element={<RoleProtectedRoute allowedRole="tutor"><UploadCoursePage /></RoleProtectedRoute>} />
        <Route path="/tutor/tutoring" element={<RoleProtectedRoute allowedRole="tutor"><TutoringSessions /></RoleProtectedRoute>} />
        <Route path="/tutor/subscriptions" element={<RoleProtectedRoute allowedRole="tutor"><Subscriptions /></RoleProtectedRoute>} />
        <Route path="/tutor/courses" element={<RoleProtectedRoute allowedRole="tutor"><ManageCoursesPage /></RoleProtectedRoute>} />
        <Route path="/tutor/earnings" element={<RoleProtectedRoute allowedRole="tutor"><EarningsPage /></RoleProtectedRoute>} />
        <Route path="/tutor/requests" element={<RoleProtectedRoute allowedRole="tutor"><TutorRequestsPage /></RoleProtectedRoute>} />
        <Route path="/tutor/chat" element={<RoleProtectedRoute allowedRole="tutor"><ChatPage role="tutor" /></RoleProtectedRoute>} />
        <Route path="/tutor/availability" element={<RoleProtectedRoute allowedRole="tutor"><AvailabilityPage /></RoleProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="verifications" element={<TutorVerifications />} />
          <Route path="verifications/:id" element={<TutorVerificationDetail />} />
          <Route path="student-verifications" element={<StudentVerifications />} />
          <Route path="student-verifications/:id" element={<StudentVerificationDetail />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="students/:id" element={<StudentProfileDetail />} />
          <Route path="courses" element={<CourseManagement />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
