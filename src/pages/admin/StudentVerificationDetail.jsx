import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function StudentVerificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/admin/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`/api/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        alert(`Student ${student.username} ${newStatus} successfully.`);
        navigate('/admin/student-verifications');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleApprove = () => updateStatus('approved');
  const handleReject = () => {
    updateStatus('rejected');
    setShowRejectModal(false);
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!student) return <div className="p-10 text-center">Student not found</div>;

  const profile = student.studentProfile || {};
  const addresses = student.addresses || [];
  const currentAddress = addresses.find(a => a.address_type === 'current') || {};

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-500 hover:text-gray-700 font-medium flex items-center"
        >
          <span className="mr-2">←</span> Back to List
        </button>
        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full border ${
          student.status === 'pending_admin' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
          student.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
          'bg-red-100 text-red-800 border-red-200'
        }`}>
          Status: {student.status === 'pending_admin' ? 'Pending Approval' : student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="h-24 w-24 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-3xl font-bold shadow-md uppercase">
            {student.username.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{student.username}</h1>
            <p className="text-gray-500 mt-1">{student.email} • {student.mobile || 'No Phone'}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
               <span className="badge badge-blue">Native: {profile.native_place || 'N/A'}</span>
               <span className="badge badge-green">Classification: {profile.classification || 'N/A'}</span>
            </div>
          </div>
          {student.status === 'pending_admin' && (
            <div className="flex flex-col gap-3 min-w-[140px]">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Academic Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">School/College</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{profile.school_name || profile.college_name || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Grade/Standard</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{profile.standard || profile.course || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Target Exam</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{profile.exam_name || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Avg. Skill Score</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{profile.avg_score || '0'}/10</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">
                  {currentAddress.door_no}, {currentAddress.street_address}, {currentAddress.area}, {currentAddress.district}, {currentAddress.state} - {currentAddress.pincode}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Detailed Skill Scores</h3>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Reading', score: profile.reading_score },
                 { label: 'Writing', score: profile.writing_score },
                 { label: 'Speaking', score: profile.speaking_score },
                 { label: 'Listening', score: profile.listening_score },
                 { label: 'Observation', score: profile.observation_score },
                 { label: 'Recall', score: profile.recall_score }
               ].map(s => (
                 <div key={s.label} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                    <span className="text-xs font-medium text-gray-600">{s.label}</span>
                    <span className="text-sm font-bold text-blue-600">{s.score || 0}/10</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Application</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting {student.username}'s application. This will be visible to the student.
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
