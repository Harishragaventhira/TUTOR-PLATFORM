import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TutorRegistration() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  // Registration Data State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', 
    subjects: '', experience: '', qualifications: '', 
    bio: '', fee: '', mode: 'Both', preference: 'Both',
    location: '', pinCode: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, save partial data here
    navigate('/tutor/register/documents');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Join as a Tutor</h2>
          <p className="mt-2 text-sm text-gray-600">Complete your profile to start teaching.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-1 bg-gray-200 rounded"></div>
            <div className="absolute left-0 top-1/2 -mt-0.5 h-1 bg-blue-600 rounded transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }}></div>
            
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10`}>1</div>
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10`}>2</div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
            <span>Basic Details</span>
            <span>Professional Info</span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            
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
                  <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 2: Professional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Subjects You Teach</label>
                    <input type="text" name="subjects" placeholder="e.g. Mathematics, Physics" required value={formData.subjects} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                    <input type="number" name="experience" min="0" required value={formData.experience} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expected Monthly Fee (₹)</label>
                    <input type="number" name="fee" required value={formData.fee} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                    <input type="text" name="qualifications" placeholder="e.g. M.Sc in Physics, B.Ed" required value={formData.qualifications} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teaching Mode</label>
                    <select name="mode" value={formData.mode} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option>Online</option>
                      <option>Offline</option>
                      <option>Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" placeholder="City / Area" required value={formData.location} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Short Professional Bio</label>
                    <textarea name="bio" rows="3" required value={formData.bio} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400" placeholder="Tell students about your teaching style..."></textarea>
                  </div>
                </div>

                <div className="flex justify-between pt-5">
                  <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    ← Back
                  </button>
                  <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Continue to Document Upload
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
