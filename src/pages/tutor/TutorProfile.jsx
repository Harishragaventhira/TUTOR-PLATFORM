import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function TutorProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProfile = async () => {
      if (!sessionUser || !sessionUser.id) return;
      try {
        const response = await fetch(`/api/profile/tutor/${sessionUser.id}`);
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
      <DashboardLayout role="tutor">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const profile = userData?.tutorProfile || {};
  const addresses = userData?.addresses || [];
  const currentAddress = addresses.find(a => a.address_type === 'current') || {};

  return (
    <DashboardLayout role="tutor">
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
            <p className="text-sm text-gray-600">{profile.subject || 'Subject not set'}</p>
            <p className="text-sm text-gray-600 font-bold text-blue-600">
              {userData?.status === 'approved' ? '✓ Verified Account' : 'Verification Pending'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Personal Info</h3>
          <p className="text-sm text-gray-700 mb-2"><strong>Email:</strong> {userData?.email}</p>
          <p className="text-sm text-gray-700 mb-2"><strong>Contact:</strong> {userData?.mobile || 'Not provided'}</p>
          <p className="text-sm text-gray-700"><strong>Location:</strong> {currentAddress.area ? `${currentAddress.area}, ${currentAddress.district}` : 'Not provided'}</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Professional Status</h3>
          <p className="text-sm text-gray-700 mb-2"><strong>Teaching Experience:</strong> {profile.experience || 'Not provided'}</p>
          <p className="text-sm text-gray-700 mb-2"><strong>Teaching Mode:</strong> {profile.mode || 'Not provided'}</p>
          <p className="text-sm text-gray-700"><strong>Expected Fee:</strong> {profile.monthly_fee ? `₹${profile.monthly_fee}/month` : 'Not provided'}</p>
        </div>

        <div className="glass-card p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Education & Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800">Higher Education</h4>
              <p className="text-sm text-gray-600">{profile.qualification || 'Not provided'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Current Role</h4>
              <p className="text-sm text-gray-600">{profile.current_role || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
