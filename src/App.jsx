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

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TutorVerifications from "./pages/admin/TutorVerifications";
import TutorVerificationDetail from "./pages/admin/TutorVerificationDetail";
import StudentManagement from "./pages/admin/StudentManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import StudentProfileDetail from "./pages/admin/StudentProfileDetail";

// Registration Imports
import TutorRegistration from "./pages/tutor/TutorRegistration";
import TutorDocumentUpload from "./pages/tutor/TutorDocumentUpload";
import TutorVerificationPending from "./pages/tutor/TutorVerificationPending";
import RejectedTutorResubmission from "./pages/tutor/RejectedTutorResubmission";
import StudentRegistration from "./pages/student/StudentRegistration";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Student Routes */}
        <Route path="/student/register" element={<StudentRegistration />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<CoursesPage />} />
        <Route path="/student/course/:id" element={<CourseLearningPage />} />
        <Route path="/student/tutors" element={<TutorBookingPage />} />
        <Route path="/student/requests" element={<RequestsPage />} />
        <Route path="/student/chat" element={<ChatPage role="student" />} />

        {/* Tutor Routes */}
        <Route path="/tutor/register" element={<TutorRegistration />} />
        <Route path="/tutor/register/documents" element={<TutorDocumentUpload />} />
        <Route path="/tutor/verification-pending" element={<TutorVerificationPending />} />
        <Route path="/tutor/rejected" element={<RejectedTutorResubmission />} />
        
        <Route path="/tutor" element={<TutorDashboard />} />
        <Route path="/tutor/upload" element={<UploadCoursePage />} />
        <Route path="/tutor/courses" element={<ManageCoursesPage />} />
        <Route path="/tutor/earnings" element={<EarningsPage />} />
        <Route path="/tutor/requests" element={<TutorRequestsPage />} />
        <Route path="/tutor/chat" element={<ChatPage role="tutor" />} />
        <Route path="/tutor/availability" element={<AvailabilityPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="verifications" element={<TutorVerifications />} />
          <Route path="verifications/:id" element={<TutorVerificationDetail />} />
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
