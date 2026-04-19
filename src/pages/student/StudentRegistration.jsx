import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  // Registration Data State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', 
    school: '', standard: '', degree: '', board: '',
    subjects: '', learningGoals: '', mode: 'Both',
    location: '', language: '',
    weakSubjects: '', skillLevel: 'Beginner', budget: '',
    tutorPref: 'One-to-one', tutorLocPref: 'Student location'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/student'); // Directs to student dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Join as a Student</h2>
          <p className="mt-2 text-sm text-gray-600">Tell us what you want to learn.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-1 bg-gray-200 rounded"></div>
            <div className="absolute left-0 top-1/2 -mt-0.5 h-1 bg-blue-600 rounded transition-all duration-300" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
            
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10`}>1</div>
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10`}>2</div>
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10`}>3</div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
            <span>Account</span>
            <span>Education</span>
            <span>Preferences</span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 1: Basic Account Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                </div>

                <div className="flex justify-end pt-5">
                  <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 2: Educational Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">School / College Name</label>
                    <input type="text" name="school" required value={formData.school} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class / Standard / Year</label>
                    <input type="text" name="standard" placeholder="e.g. 10th Grade, 2nd Year" required value={formData.standard} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Board / University</label>
                    <input type="text" name="board" placeholder="e.g. CBSE, State Board" required value={formData.board} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Subjects Interested In</label>
                    <input type="text" name="subjects" placeholder="e.g. Physics, Chemistry, Math" required value={formData.subjects} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Learning Mode</label>
                    <select name="mode" value={formData.mode} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option>Online Tutor</option>
                      <option>Offline Tutor</option>
                      <option>Recorded Courses</option>
                      <option>Mixed (All)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Language Preference</label>
                    <input type="text" name="language" placeholder="e.g. English, Hindi" required value={formData.language} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                </div>

                <div className="flex justify-between pt-5">
                  <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                    ← Back
                  </button>
                  <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 3: Additional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Goal / Areas to Improve (Weak Subjects)</label>
                    <textarea name="weakSubjects" rows="2" placeholder="e.g. I struggle with calculus and organic chemistry." required value={formData.weakSubjects} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Group Preference</label>
                    <select name="tutorPref" value={formData.tutorPref} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option>One-to-one (Personalized)</option>
                      <option>One-to-many (Batch)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Monthly Budget for Tuition</label>
                    <input type="text" name="budget" placeholder="e.g. ₹5000" required value={formData.budget} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div className="md:col-span-2 pb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review Your Details</label>
                    <div className="bg-gray-50 p-4 border border-gray-200 rounded-md text-sm text-gray-600 space-y-2">
                      <p><strong>Name:</strong> {formData.fullName}</p>
                      <p><strong>Education:</strong> {formData.standard} at {formData.school}</p>
                      <p><strong>Interested in:</strong> {formData.subjects} ({formData.mode})</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-5">
                  <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                    ← Back
                  </button>
                  <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition">
                    Complete Registration
                  </button>
                </div>
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}
