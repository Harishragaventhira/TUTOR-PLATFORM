import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, CheckCircle } from 'lucide-react';

export default function TutorRegistration() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || formData.email;
  
  // Registration Data State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    name: '', contact: '', email: '', native: '', tempAddress: '', permAddress: '', photo: null,
    // Step 2: Education
    ug: { major: '', period: '', duration: '', institution: '', marksheet: null, provisional: null, degree: null },
    pg: { major: '', period: '', duration: '', institution: '', marksheet: null, provisional: null, degree: null },
    bed: { major: '', period: '', duration: '', institution: '', marksheet: null, provisional: null, degree: null },
    med: { major: '', period: '', duration: '', institution: '', marksheet: null, provisional: null, degree: null },
    mphil: { major: '', period: '', duration: '', institution: '', marksheet: null, provisional: null, degree: null },
    phd: { major: '', period: '', duration: '', institution: '', marksheet: null, provisional: null, degree: null },
    // Step 3: Experience
    experience: [{ org: '', period: '', duration: '', certificate: null }],
    // Step 4: Police Verification
    policeCertificate: null,
    // Step 5: Tutoring Mode
    modes: { online: false, home: false, studentHome: false, tuitionCenter: false }
  });

  const handleBasicChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({...formData, [name]: files[0]});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleEducationChange = (level, field, value, isFile = false) => {
    setFormData(prev => ({
      ...prev,
      [level]: { ...prev[level], [field]: isFile ? value[0] : value}
    }));
  };

  const handleExperienceChange = (index, field, value, isFile = false) => {
    const newExp = [...formData.experience];
    newExp[index][field] = isFile ? value[0] : value;
    setFormData({...formData, experience: newExp});
  };

  const addExperience = () => {
    setFormData({...formData, experience: [...formData.experience, { org: '', period: '', duration: '', certificate: null }]});
  };

  const handleModeChange = (key) => {
    setFormData(prev => ({
      ...prev,
      modes: { ...prev.modes, [key]: !prev.modes[key] }
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/profile/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          profileData: {
            native_place: formData.native,
            education_details: {
              ug: formData.ug,
              pg: formData.pg,
              bed: formData.bed,
              med: formData.med,
              mphil: formData.mphil,
              phd: formData.phd
            },
            experience_details: formData.experience,
            tutoring_modes: formData.modes
          }
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save profile');

      alert("Profile submitted successfully for Admin approval!");
      navigate('/tutor/verification-pending');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Tutor Registration</h2>
          <p className="mt-2 text-sm text-gray-600">Complete your professional profile to start teaching.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-1 bg-gray-200 rounded"></div>
            <div className="absolute left-0 top-1/2 -mt-0.5 h-1 bg-blue-600 rounded transition-all duration-300" 
                 style={{ width: `${((step - 1) / 5) * 100}%` }}></div>
            
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={num} className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= num ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'} font-bold z-10 text-xs`}>
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={step === 6 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 1: Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleBasicChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" name="contact" required value={formData.contact} onChange={handleBasicChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleBasicChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Native Place</label>
                    <input type="text" name="native" required value={formData.native} onChange={handleBasicChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Passport Size Photo <Upload size={14} className="inline"/></label>
                    <input type="file" name="photo" required onChange={handleBasicChange} className="mt-1 block w-full text-sm py-1" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 2: Education Qualification</h3>
                
                {['ug', 'pg', 'bed', 'med', 'mphil', 'phd'].map((level) => (
                  <div key={level} className="border p-4 rounded-md mb-4 bg-gray-50">
                    <h4 className="font-bold text-blue-800 uppercase mb-2">{level} Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700">Major / Course</label>
                        <input type="text" placeholder="e.g. B.Sc Physics" value={formData[level].major} onChange={(e) => handleEducationChange(level, 'major', e.target.value)} className="mt-1 block w-full px-2 py-1 border rounded" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Period (e.g. 2015-18)</label>
                        <input type="text" value={formData[level].period} onChange={(e) => handleEducationChange(level, 'period', e.target.value)} className="mt-1 block w-full px-2 py-1 border rounded" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Duration (Years)</label>
                        <input type="text" value={formData[level].duration} onChange={(e) => handleEducationChange(level, 'duration', e.target.value)} className="mt-1 block w-full px-2 py-1 border rounded" />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs font-medium text-gray-700">Institution Name</label>
                        <input type="text" value={formData[level].institution} onChange={(e) => handleEducationChange(level, 'institution', e.target.value)} className="mt-1 block w-full px-2 py-1 border rounded" />
                      </div>
                      <div className="md:col-span-4 grid grid-cols-3 gap-2 mt-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Marksheet</label>
                          <input type="file" onChange={(e) => handleEducationChange(level, 'marksheet', e.target.files, true)} className="text-xs" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Provisional</label>
                          <input type="file" onChange={(e) => handleEducationChange(level, 'provisional', e.target.files, true)} className="text-xs" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Degree Cert.</label>
                          <input type="file" onChange={(e) => handleEducationChange(level, 'degree', e.target.files, true)} className="text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 3: Experience Details</h3>
                
                {formData.experience.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Organization / Institution</label>
                      <input type="text" required value={exp.org} onChange={(e) => handleExperienceChange(index, 'org', e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Period (e.g. 2018-2022)</label>
                      <input type="text" required value={exp.period} onChange={(e) => handleExperienceChange(index, 'period', e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input type="text" required value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Upload Experience Certificate</label>
                      <input type="file" required onChange={(e) => handleExperienceChange(index, 'certificate', e.target.files, true)} className="mt-1 block w-full text-sm" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addExperience} className="text-sm text-blue-600 font-bold hover:underline">+ Add More Experience</button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 4: Police Verification</h3>
                <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-md mb-4">
                  <p className="text-sm text-yellow-800 font-medium">As part of our safety standards, all tutors must provide a valid Police Verification Certificate. This is a mandatory requirement.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Police Verification Certificate *</label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 p-6 text-center rounded-md bg-gray-50">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <input type="file" required onChange={handleBasicChange} name="policeCertificate" className="mx-auto" />
                    <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, JPG, PNG.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Step 5: Tutoring Mode Selection</h3>
                <p className="text-sm text-gray-600 mb-4">Select all the modes through which you are willing to offer tutoring:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`border p-4 rounded-lg cursor-pointer ${formData.modes.online ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <input type="checkbox" className="hidden" checked={formData.modes.online} onChange={() => handleModeChange('online')} />
                    <h4 className="font-bold text-gray-800">💻 Online Tutoring</h4>
                    <p className="text-xs text-gray-500 mt-1">Via Zoom, Google Meet, Teams, etc.</p>
                  </label>
                  <label className={`border p-4 rounded-lg cursor-pointer ${formData.modes.home ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <input type="checkbox" className="hidden" checked={formData.modes.home} onChange={() => handleModeChange('home')} />
                    <h4 className="font-bold text-gray-800">🏠 Tutor's Home</h4>
                    <p className="text-xs text-gray-500 mt-1">Students visit your location for lessons.</p>
                  </label>
                  <label className={`border p-4 rounded-lg cursor-pointer ${formData.modes.studentHome ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <input type="checkbox" className="hidden" checked={formData.modes.studentHome} onChange={() => handleModeChange('studentHome')} />
                    <h4 className="font-bold text-gray-800">🚗 Student's Home</h4>
                    <p className="text-xs text-gray-500 mt-1">You travel to the student's location.</p>
                  </label>
                  <label className={`border p-4 rounded-lg cursor-pointer ${formData.modes.tuitionCenter ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <input type="checkbox" className="hidden" checked={formData.modes.tuitionCenter} onChange={() => handleModeChange('tuitionCenter')} />
                    <h4 className="font-bold text-gray-800">🏫 Tuition Center</h4>
                    <p className="text-xs text-gray-500 mt-1">Operated from a dedicated commercial space.</p>
                  </label>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="text-center pb-6">
                  <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">Profile Complete</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                    Your application and documents are ready for submission.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 border border-blue-200 rounded-md text-sm text-blue-800">
                  <strong>Important:</strong> As per platform policy, your profile requires mandatory verification by an Admin before you can access the platform, view requests, or offer courses.
                </div>
              </div>
            )}

            <div className="flex justify-between pt-8 mt-4 border-t">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  ← Back
                </button>
              ) : <div></div>}
              <button type="submit" className="px-8 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                {step === 6 ? 'Submit for Admin Verification' : 'Next Step →'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
