import React from 'react';
import { Users, BookOpen, CheckCircle, Clock, ShieldAlert, GraduationCap, ArrowRight, Eye } from 'lucide-react';

const mockAdminData = {
  tutors: { registered: 120, verified: 95, subscribed: 80, renewal: 15, present: 75 },
  students: { registered: 850, verified: 800, subscribed: 600, renewal: 50, present: 500 },
  monitoring: { undergoing: 300, skillTestCompleted: 780 }
};

const MetricGroup = ({ title, data, type }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4 pb-2 border-b">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      {type === 'tutor' && <GraduationCap className="text-blue-500" />}
      {type === 'student' && <Users className="text-green-500" />}
      {type === 'monitor' && <Eye className="text-purple-500" />}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="text-center">
          <p className="text-2xl font-black text-gray-800">{value}</p>
          <p className="text-xs font-semibold text-gray-500 uppercase mt-1">{key}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-3 text-right">
      <button className="text-sm text-blue-600 font-semibold hover:underline flex items-center justify-end w-full">
        View Full Report <ArrowRight size={14} className="ml-1" />
      </button>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Super Admin Dashboard</h2>
      
      {/* Metrics Groups */}
      <div className="space-y-6">
        <MetricGroup title="Tutor Details" data={mockAdminData.tutors} type="tutor" />
        <MetricGroup title="Student Details" data={mockAdminData.students} type="student" />
        <MetricGroup title="Tutoring & Monitoring" data={{
          ...mockAdminData.monitoring,
          totalSubscribed: mockAdminData.tutors.subscribed + mockAdminData.students.subscribed
        }} type="monitor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Quick Actions for Approvals */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <ShieldAlert className="text-red-500 mr-2" /> Pending Actions
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-red-50 text-red-900 rounded-lg">
              <div>
                <span className="font-bold">25</span> Tutors Pending Verification
              </div>
              <button className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700">Review</button>
            </li>
            <li className="flex justify-between items-center p-3 bg-yellow-50 text-yellow-900 rounded-lg">
              <div>
                <span className="font-bold">50</span> Students Pending Verification
              </div>
              <button className="px-3 py-1 bg-yellow-600 text-white text-xs font-bold rounded-md hover:bg-yellow-700">Review</button>
            </li>
            <li className="flex justify-between items-center p-3 bg-orange-50 text-orange-900 rounded-lg">
              <div>
                <span className="font-bold">12</span> Course Approvals Pending
              </div>
              <button className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-md hover:bg-orange-700">Review</button>
            </li>
          </ul>
        </div>

        {/* Global Control Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Global Controls</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Manage Institutions', icon: '🏢' },
              { label: 'View Skill Tests', icon: '📝' },
              { label: 'All Documents', icon: '📁' },
              { label: 'Monitor Bookings', icon: '📅' },
              { label: 'Manage Courses', icon: '📚' },
              { label: 'Platform Users', icon: '👥' },
            ].map(item => (
              <button key={item.label} className="p-3 border rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-200 transition-colors flex items-center gap-2">
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
