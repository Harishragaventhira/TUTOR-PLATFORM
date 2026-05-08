import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TutorDocumentUpload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    idProof: null,
    education: null,
    experience: null,
    photo: null
  });

  const handleFileChange = (e, type) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission flow
    navigate('/tutor/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Document Verification</h2>
          <p className="mt-2 text-sm text-gray-600">Please upload required documents to verify your profile.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-1 bg-blue-600 rounded"></div>
            
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 bg-blue-600 border-blue-600 text-white font-bold z-10">✓</div>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 bg-blue-600 border-blue-600 text-white font-bold z-10">✓</div>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 bg-blue-600 border-blue-600 text-white font-bold z-10">3</div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
            <span>Basic Details</span>
            <span>Professional</span>
            <span className="text-blue-600">Documents</span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-blue-500">ℹ️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Your documents will be securely reviewed by our team. Approval usually takes 24-48 hours. Clear photos or PDFs speed up the process.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Document 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Government ID Proof (Aadhar/PAN/Passport) *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    <span className="text-3xl">🪪</span>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" required onChange={(e) => handleFileChange(e, 'idProof')} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">{files.idProof ? files.idProof.name : 'PDF, PNG, JPG up to 5MB'}</p>
                  </div>
                </div>
              </div>

              {/* Document 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Highest Education Certificate / Degree *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    <span className="text-3xl">🎓</span>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" required onChange={(e) => handleFileChange(e, 'education')} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">{files.education ? files.education.name : 'PDF, PNG, JPG up to 5MB'}</p>
                  </div>
                </div>
              </div>

              {/* Document 3 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Photo (Selfie) *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    <span className="text-3xl">📸</span>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" required accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">{files.photo ? files.photo.name : 'PNG, JPG up to 2MB. Clear face, plain background.'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-5">
              <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                ← Back
              </button>
              <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Submit Application
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
