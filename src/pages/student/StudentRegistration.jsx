import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, CheckCircle } from 'lucide-react';

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || formData.email;
  
  // Registration Data State
  const [formData, setFormData] = useState({
    name: '', contact: '', email: '', gender: '', age: '',
    native: '', tempAddress: '', permAddress: '',
    schoolName: '', schoolAddress: '', standard: '', section: '',
    collegeName: '', course: '', collegeAddress: '',
    examName: '', coachingCenter: '',
    // Files
    schoolIdCard: null, collegeIdCard: null,
    // Skill Test
    reading: 0, writing: 0, speaking: 0, listening: 0, observation: 0, recall: 0
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({...formData, [name]: files[0]});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleSkillChange = (name, value) => {
    setFormData({...formData, [name]: parseInt(value) || 0});
  };

  const calculateScore = () => {
    const { reading, writing, speaking, listening, observation, recall } = formData;
    const total = reading + writing + speaking + listening + observation + recall;
    const avg = total / 6;
    let classification = '';
    if (avg >= 1 && avg < 3.5) classification = 'Slow Learner';
    else if (avg >= 3.5 && avg < 7) classification = 'Medium Learner';
    else if (avg >= 7 && avg < 9.5) classification = 'Fast Learner';
    else if (avg >= 9.5 && avg <= 10) classification = 'Quick Learner';
    else classification = 'Not Assessed';
    
    return { avg: avg.toFixed(1), classification };
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scoreRes = calculateScore();
    
    try {
      const response = await fetch('http://localhost:5000/api/profile/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          profileData: {
            gender: formData.gender,
            age: formData.age ? parseInt(formData.age) : null,
            native_place: formData.native,
            school_name: formData.schoolName,
            school_address: formData.schoolAddress,
            standard: formData.standard,
            section: formData.section,
            college_name: formData.collegeName,
            course: formData.course,
            college_address: formData.collegeAddress,
            exam_name: formData.examName,
            coaching_center: formData.coachingCenter,
            reading_score: formData.reading,
            writing_score: formData.writing,
            speaking_score: formData.speaking,
            listening_score: formData.listening,
            observation_score: formData.observation,
            recall_score: formData.recall,
            avg_score: parseFloat(scoreRes.avg),
            classification: scoreRes.classification
          }
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save profile');

      alert("Profile submitted successfully for Admin approval!");
      navigate('/learner/verification-pending');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const scoreResult = calculateScore();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Learner Profile Setup</h2>
          <p className="mt-2 text-sm text-gray-600">Complete your details to start learning.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-1 bg-gray-200 rounded"></div>
            <div className="absolute left-0 top-1/2 -mt-0.5 h-1 bg-blue-600 rounded transition-all duration-300" 
                 style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= num ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10`}>
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
            <span>Personal</span>
            <span>Education</span>
            <span>Skills Test</span>
            <span>Submit</span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 1: Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" name="contact" required value={formData.contact} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" required value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" name="age" required value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Native Place</label>
                    <input type="text" name="native" required value={formData.native} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
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
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 2: Education Details</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-blue-800 mb-3">School Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">School Name</label>
                      <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input type="text" name="schoolAddress" value={formData.schoolAddress} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Standard</label>
                      <input type="text" name="standard" value={formData.standard} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Section</label>
                      <input type="text" name="section" value={formData.section} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">School ID Card Upload <Upload size={14}/></label>
                      <input type="file" name="schoolIdCard" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-md font-medium text-blue-800 mb-3">College / University Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">College Name</label>
                      <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Course (UG/PG)</label>
                      <input type="text" name="course" value={formData.course} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input type="text" name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">College ID Card Upload <Upload size={14}/></label>
                      <input type="file" name="collegeIdCard" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="text-md font-medium text-blue-800 mb-3">Aspirant Information (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Target Exam (e.g., UPSC, TNPSC)</label>
                      <input type="text" name="examName" value={formData.examName || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="UPSC, NEET, JEE, TNPSC..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Coaching Center / Institute (if any)</label>
                      <input type="text" name="coachingCenter" value={formData.coachingCenter || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
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
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 3: Skill Assessment Test</h3>
                <p className="text-sm text-red-600 font-medium mb-4">*MANDATORY: Please score yourself from 1 to 10 on the following skills.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['reading', 'writing', 'speaking', 'listening', 'observation', 'recall'].map(skill => (
                    <div key={skill}>
                      <label className="block text-sm font-medium text-gray-700 capitalize flex justify-between">
                        <span>{skill}</span>
                        <span className="text-blue-600 font-bold">{formData[skill]}/10</span>
                      </label>
                      <input 
                        type="range" min="0" max="10" step="1"
                        value={formData[skill]} 
                        onChange={(e) => handleSkillChange(skill, e.target.value)} 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2" 
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 pb-1">Average Score</h4>
                    <p className="text-3xl font-black text-blue-700">{scoreResult.avg}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-sm font-semibold text-gray-700 pb-1">Classification</h4>
                    <p className="text-xl font-bold text-gray-800">{scoreResult.classification}</p>
                  </div>
                </div>

                <div className="flex justify-between pt-5 mt-4 border-t">
                  <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                    ← Back
                  </button>
                  <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="text-center pb-6">
                  <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">Ready for Review</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                    Your profile information and test scores are complete. Submit this information for Admin Verification.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-200 rounded-md text-sm text-gray-600 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div><strong>Name:</strong> {formData.name}</div>
                    <div><strong>Contact:</strong> {formData.contact}</div>
                    <div><strong>Classification:</strong> <span className="font-semibold text-blue-600">{scoreResult.classification} ({scoreResult.avg}/10)</span></div>
                    <div><strong>School/College Info:</strong> {formData.schoolName || formData.collegeName || 'Not Provided'}</div>
                    {formData.examName && (
                      <div className="col-span-2"><strong>Target Exam (Aspirant):</strong> {formData.examName} {formData.coachingCenter ? `(${formData.coachingCenter})` : ''}</div>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-red-500 font-medium text-center">
                  Important: You cannot access the platform until your profile is approved by the admin.
                </p>

                <div className="flex justify-between pt-5 mt-4 border-t">
                  <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
                    ← Back
                  </button>
                  <button type="submit" className="px-8 py-3 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-green-600 hover:bg-green-700 transition">
                    Submit for Admin Approval
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
