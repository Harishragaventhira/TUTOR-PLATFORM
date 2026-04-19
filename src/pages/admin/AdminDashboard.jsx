import React from 'react';
import { mockAdminStats } from '../../data/mockAdminData';

// Basic Card component definitions if not imported from common ui
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
    <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-xl mr-4 ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={mockAdminStats.totalStudents} 
          icon="🎓" 
          colorClass="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          title="Total Tutors" 
          value={mockAdminStats.totalTutors} 
          icon="👨‍🏫" 
          colorClass="bg-green-100 text-green-600" 
        />
        <StatCard 
          title="Pending Verifications" 
          value={mockAdminStats.pendingVerifications} 
          icon="⏳" 
          colorClass="bg-yellow-100 text-yellow-600" 
        />
        <StatCard 
          title="Total Revenue" 
          value={mockAdminStats.revenue} 
          icon="₹" 
          colorClass="bg-purple-100 text-purple-600" 
        />
        <StatCard 
          title="Total Courses" 
          value={mockAdminStats.totalCourses} 
          icon="📚" 
          colorClass="bg-indigo-100 text-indigo-600" 
        />
        <StatCard 
          title="Total Bookings" 
          value={mockAdminStats.totalBookings} 
          icon="📅" 
          colorClass="bg-pink-100 text-pink-600" 
        />
        <StatCard 
          title="Active Requests" 
          value={mockAdminStats.activeRequests} 
          icon="🔔" 
          colorClass="bg-orange-100 text-orange-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Platform Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full p-2 text-xs mr-3">👤</span>
              <div>
                <p className="text-sm font-medium text-gray-800">New student registration</p>
                <p className="text-xs text-gray-500">Arjun Kumar joined the platform • 2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-xs mr-3">📄</span>
              <div>
                <p className="text-sm font-medium text-gray-800">Tutor verification submitted</p>
                <p className="text-xs text-gray-500">Priya Sharma uploaded documents • 3 hours ago</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-600 rounded-full p-2 text-xs mr-3">💰</span>
              <div>
                <p className="text-sm font-medium text-gray-800">New course booking</p>
                <p className="text-xs text-gray-500">Sneha Reddy booked 'Advanced Physics' • 5 hours ago</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-2xl mb-2">✅</span>
              <span className="text-sm font-medium text-gray-700">Review Tutors</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-2xl mb-2">📢</span>
              <span className="text-sm font-medium text-gray-700">Send Notice</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">Generate Report</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-2xl mb-2">⚙️</span>
              <span className="text-sm font-medium text-gray-700">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
