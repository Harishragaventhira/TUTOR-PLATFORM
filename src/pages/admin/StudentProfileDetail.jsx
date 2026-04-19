import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockStudents } from '../../data/mockAdminData';

export default function StudentProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find student by ID or use first one 
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-500 hover:text-gray-700 font-medium flex items-center"
        >
          <span className="mr-2">←</span> Back
        </button>
        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Status: {student.status}
        </span>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="h-24 w-24 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-3xl font-bold shadow-md border-4 border-white">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-600 mt-1">{student.email} • {student.phone}</p>
            <p className="text-sm text-gray-500 mt-1">Joined: {student.joinDate}</p>
          </div>
          <div className="flex flex-col gap-3 min-w-[140px]">
            <button className="w-full px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition font-medium shadow-sm">
              Message Student
            </button>
            <button className="w-full px-4 py-2 bg-white text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition font-medium shadow-sm">
              Suspend Account
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Educational Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">School / College</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{student.school}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Standard / Class</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{student.standard}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Board</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{student.board}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Learning Preferences</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Target Subjects</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">
                  {student.targetSubjects.join(", ")}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Learning Mode</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{student.learningMode}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Monthly Budget</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{student.budget}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
