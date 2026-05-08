import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function TutoringSessions() {
  const location = useLocation();
  const role = location.pathname.startsWith('/student') ? 'student' : 'tutor';

  return (
    <DashboardLayout role={role}>
      <div className="mb-7">
        <h1 className="text-2xl font-black text-gray-800">Undergoing Tutoring</h1>
        <p className="text-sm text-gray-600">Track your active one-to-one tutoring sessions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((session) => (
          <div key={session} className="glass-card p-6 border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{role === 'student' ? 'Physics - Prof. Raman' : 'Math - Student Rahul'}</h3>
                <p className="text-sm text-gray-500">Mode: Online (Zoom)</p>
              </div>
              <span className="badge badge-green">Active</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-700"><strong>Schedule:</strong> Mon, Wed, Fri - 5:00 PM</p>
              <p className="text-sm text-gray-700"><strong>Progress:</strong> Week 3 of 12</p>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary flex-1 py-2 rounded-lg text-sm">Join Call</button>
              <button className="btn-secondary flex-1 py-2 rounded-lg text-sm bg-gray-100 text-gray-800">View Notes</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
