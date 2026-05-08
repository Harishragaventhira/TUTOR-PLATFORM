import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function StudentProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      if (!sessionUser || !sessionUser.id) return;
      try {
        const response = await fetch(`/api/profile/student/${sessionUser.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="learner">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const profile = userData?.studentProfile || {};
  const addresses = userData?.addresses || [];
  const currentAddress = addresses.find(a => a.address_type === 'current') || {};

  return (
    <DashboardLayout role="learner">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-600">View and modify your details.</p>
      </div>

      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold uppercase">
            {userData?.username?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{userData?.username}</h2>
            <p className="text-sm text-gray-600">{userData?.email}</p>
            <span className="badge badge-blue mt-2">
              {profile.classification || 'Profile Under Review'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Personal Info</h3>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Location:</strong> {currentAddress.area ? `${currentAddress.area}, ${currentAddress.district}` : 'Not provided'}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Contact:</strong> {userData?.mobile || 'Not provided'}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Gender:</strong> {profile.gender || 'Not provided'}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Education Details</h3>
          <p className="text-sm text-gray-700 mb-2">
            <strong>School/College:</strong> {profile.school_name || profile.college_name || 'Not provided'}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Standard/Course:</strong> {profile.standard || profile.course || 'Not provided'}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Target Exam:</strong> {profile.exam_name || 'Not provided'}
          </p>
        </div>

        <div className="glass-card p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Skill Assessment Scores</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Reading', score: profile.reading_score },
              { label: 'Writing', score: profile.writing_score },
              { label: 'Speaking', score: profile.speaking_score },
              { label: 'Listening', score: profile.listening_score },
              { label: 'Observation', score: profile.observation_score },
              { label: 'Recall', score: profile.recall_score }
            ].map(skill => (
              <div key={skill.label} className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm font-semibold text-gray-600">{skill.label}</p>
                <p className="text-2xl font-black text-blue-600">{skill.score || 0}/10</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
