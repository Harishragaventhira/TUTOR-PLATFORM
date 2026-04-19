import React from 'react';

export default function CourseManagement() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-[60vh] flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Management</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        This module allows admins to moderate courses, review flagged content, and manage categories.
        Development in progress.
      </p>
    </div>
  );
}
