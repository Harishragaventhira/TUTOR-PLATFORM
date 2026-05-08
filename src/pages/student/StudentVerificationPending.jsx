import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function StudentVerificationPending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <Clock className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Under Review</h2>
          <p className="text-sm text-gray-600 mb-6">
            Your profile details and skill assessment scores have been successfully submitted. An admin will review and approve your account shortly.
            You cannot access the platform features until your account is approved.
          </p>
          <button 
            onClick={() => navigate('/student/courses')} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
