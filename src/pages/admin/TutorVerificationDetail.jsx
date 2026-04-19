import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTutorVerifications } from '../../data/mockAdminData';

export default function TutorVerificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Find tutor by ID
  const tutor = mockTutorVerifications.find(t => t.id === id) || mockTutorVerifications[0];

  const handleApprove = () => {
    alert(`Tutor ${tutor.tutorName} approved successfully.`);
    navigate('/admin/verifications');
  };

  const handleReject = () => {
    alert(`Tutor ${tutor.tutorName} rejected. Reason: ${rejectionReason}`);
    setShowRejectModal(false);
    navigate('/admin/verifications');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-500 hover:text-gray-700 font-medium flex items-center"
        >
          <span className="mr-2">←</span> Back to List
        </button>
        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
          tutor.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          tutor.status === 'Approved' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          Status: {tutor.status}
        </span>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="h-24 w-24 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-2xl font-bold shadow-inner">
            {tutor.tutorName.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{tutor.tutorName}</h1>
            <p className="text-gray-500 mt-1">{tutor.email} • {tutor.phone}</p>
            <p className="mt-4 text-gray-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm inline-block">
              {tutor.bio}
            </p>
          </div>
          {tutor.status === 'Pending' && (
            <div className="flex flex-col  gap-3 min-w-[140px]">
              <button 
                onClick={handleApprove}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium shadow-sm"
              >
                Approve
              </button>
              <button 
                onClick={() => setShowRejectModal(true)}
                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition font-medium border border-red-200"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Professional Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Subject</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{tutor.subject}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Experience</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{tutor.experience}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Teaching Mode</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{tutor.mode}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Fee</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{tutor.fee}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{tutor.location}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Uploaded Documents</h3>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {tutor.documents.map((doc, idx) => (
                <li key={idx} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm hover:bg-gray-50 transition-colors">
                  <div className="w-0 flex-1 flex items-center">
                    <span className="text-xl mr-2">📄</span>
                    <div className="flex flex-col">
                      <span className="truncate font-medium text-gray-900">{doc.name}</span>
                      <span className="text-gray-500 text-xs">{doc.type}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button className="font-medium text-blue-600 hover:text-blue-500 bg-blue-50 px-3 py-1 rounded">
                      Preview
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Application</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting {tutor.tutorName}'s application. This will be visible to the tutor.
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-red-500 focus:border-red-500"
              rows="4"
              placeholder="e.g. Identity document is unreadable..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 font-medium disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
