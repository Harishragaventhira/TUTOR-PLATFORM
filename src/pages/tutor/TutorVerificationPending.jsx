import React from 'react';
import { Link } from 'react-router-dom';

export default function TutorVerificationPending() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-md rounded-xl border border-gray-100 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-yellow-100 mb-6">
            <span className="text-5xl">⏳</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Application Under Review</h2>
          <p className="text-gray-600 mb-6 px-4">
            Thank you for applying to join TutorBridge! Your profile and documents are currently being verified by our team. 
            This process typically takes 24-48 hours.
          </p>
          <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
            <p className="text-sm text-yellow-800 font-medium">Status: Verification Pending</p>
          </div>
          <div className="space-y-3">
            <Link to="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
