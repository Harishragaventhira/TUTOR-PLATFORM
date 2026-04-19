import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RejectedTutorResubmission() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/tutor/verification-pending');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-md rounded-xl border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4">Application Needs Update</h2>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
            <h3 className="text-sm font-bold text-red-800">Rejection Reason:</h3>
            <p className="text-sm text-red-700 mt-1">
              "Experience certificate is blurred and unreadable. Please upload a clearer copy."
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Re-upload Experience Certificate *</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition-colors bg-gray-50">
                <div className="space-y-1 text-center">
                  <span className="text-3xl">📄</span>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                      <span>Upload new file</span>
                      <input type="file" className="sr-only" required onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">{file ? file.name : 'PDF, PNG, JPG up to 5MB'}</p>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              Submit for Re-verification
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
