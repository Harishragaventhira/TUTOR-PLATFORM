import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, CheckCircle, ShieldCheck } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    mobile: '',
    profileType: 'learner'
  });
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationPreview, setLocationPreview] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the privacy policy and disclaimer.");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }
      
      if (data._dev_otp) {
        alert(`[FALLBACK MODE] Real email delivery failed. Your OTP is: ${data._dev_otp}\n\nThis usually happens if your SendGrid API key is invalid or your daily limit is reached.`);
      } else {
        alert(`OTP sent to ${formData.email}! Please check your inbox.`);
      }
      setStep(3);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Verify OTP
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const verifyData = await verifyRes.json();
      
      if (!verifyRes.ok) {
        throw new Error(verifyData.message || 'Invalid OTP');
      }
      
      // 2. Register User
      const current_address = {
        door_no: formData.current_door_no,
        street_address: formData.current_street_address,
        area: formData.current_area,
        landmark: formData.current_landmark,
        taluk: formData.current_taluk,
        district: formData.current_district,
        state: formData.current_state,
        country: 'India',
        pincode: formData.current_pincode
      };
      
      const permanent_address = formData.isSameAddress ? current_address : {
        door_no: formData.perm_door_no,
        street_address: formData.perm_street_address,
        area: formData.perm_area,
        landmark: formData.perm_landmark,
        taluk: formData.perm_taluk,
        district: formData.perm_district,
        state: formData.perm_state,
        country: 'India',
        pincode: formData.perm_pincode
      };

      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          profileType: formData.profileType,
          current_address,
          permanent_address,
          is_same_address: !!formData.isSameAddress
        })
      });
      const registerData = await registerRes.json();
      
      if (!registerRes.ok) {
        throw new Error(registerData.error || 'Registration failed');
      }

      alert("Registration successful! Pending admin approval. Please complete your profile details.");
      
      if (formData.profileType === 'learner') {
        navigate("/learner/register", { state: { email: formData.email, username: formData.username } });
      } else {
        navigate("/tutor/register", { state: { email: formData.email, username: formData.username } });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend');
      if (data._dev_otp) {
        alert(`[DEV MODE] OTP Resent! Your new OTP is: ${data._dev_otp}`);
      } else {
        alert('OTP resent successfully!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyLocation = async () => {
    setIsLocating(true);
    setLocationPreview(null);
    try {
      const params = new URLSearchParams({
        street_address: formData.current_street_address || '',
        area: formData.current_area || '',
        taluk: formData.current_taluk || '',
        district: formData.current_district || '',
        state: formData.current_state || '',
        pincode: formData.current_pincode || ''
      });

      const res = await fetch(`/api/auth/geocode?${params.toString()}`);
      const data = await res.json();
      
      if (data && data.latitude && data.longitude) {
        setLocationPreview({ lat: data.latitude, lon: data.longitude, name: data.display_name });
      } else {
        setLocationPreview({ error: 'Location could not be verified automatically.' });
      }
    } catch (error) {
      setLocationPreview({ error: 'Location service unavailable.' });
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Progress Indicators */}
          <div className="mb-8 border-b pb-4">
            <div className="flex justify-between items-center px-6">
              <div className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>1. Info</div>
              <div className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>2. Policies</div>
              <div className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>3. Address</div>
              <div className={`text-sm font-medium ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>4. Verify</div>
            </div>
          </div>

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleStep1Submit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input required name="username" type="text" value={formData.username} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input required name="mobile" type="tel" value={formData.mobile} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email ID</label>
                <input required name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input required name="password" type="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input required name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Type</label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="profileType" value="learner" checked={formData.profileType === 'learner'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Learner</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="profileType" value="tutor" checked={formData.profileType === 'tutor'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Tutor</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Continue to Privacy Policy
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleStep2Submit}>
              <div className="flex justify-center mb-4 text-blue-600">
                <ShieldCheck size={48} />
              </div>
              <h3 className="text-lg font-medium text-center text-gray-900">Privacy Policy & Disclaimer</h3>
              <div className="h-48 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
                <p className="mb-2 font-bold">1. Introduction</p>
                <p className="mb-4">Welcome to TutorBridge. By using our platform, you agree to these terms.</p>
                <p className="mb-2 font-bold">2. Data Collection</p>
                <p className="mb-4">We collect your email, phone, and optional demographic data to match you with the right educational resources.</p>
                <p className="mb-2 font-bold">3. Verifications</p>
                <p>Tutors are subject to police verification and credential checks. Students are subject to skill level assessments.</p>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="agreed" name="agreed" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreed" className="font-medium text-gray-700">I have read and agree to Privacy Policy & Disclaimer</label>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <button type="button" onClick={() => setStep(1)} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Back</button>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">{isLoading ? 'Sending...' : 'Send Verification Email'}</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
              <div className="border-b pb-2 mb-4">
                <h3 className="text-lg font-medium text-gray-900">Current Address</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm">Door No</label><input required name="current_door_no" value={formData.current_door_no || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">Street Address</label><input required name="current_street_address" value={formData.current_street_address || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">Area</label><input required name="current_area" value={formData.current_area || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">Landmark</label><input name="current_landmark" value={formData.current_landmark || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">Taluk</label><input required name="current_taluk" value={formData.current_taluk || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">District</label><input required name="current_district" value={formData.current_district || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">State</label><input required name="current_state" value={formData.current_state || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                <div><label className="block text-sm">Pincode</label><input required name="current_pincode" type="number" value={formData.current_pincode || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
              </div>

              <div className="flex items-center mt-4">
                <input id="isSameAddress" type="checkbox" checked={formData.isSameAddress || false} onChange={(e) => setFormData({...formData, isSameAddress: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="isSameAddress" className="ml-2 text-sm text-gray-700">Permanent address is same as current address</label>
              </div>

              {!formData.isSameAddress && (
                <>
                  <div className="border-b pb-2 mb-4 mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Permanent Address</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm">Door No</label><input required name="perm_door_no" value={formData.perm_door_no || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">Street Address</label><input required name="perm_street_address" value={formData.perm_street_address || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">Area</label><input required name="perm_area" value={formData.perm_area || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">Landmark</label><input name="perm_landmark" value={formData.perm_landmark || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">Taluk</label><input required name="perm_taluk" value={formData.perm_taluk || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">District</label><input required name="perm_district" value={formData.perm_district || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">State</label><input required name="perm_state" value={formData.perm_state || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                    <div><label className="block text-sm">Pincode</label><input required name="perm_pincode" type="number" value={formData.perm_pincode || ''} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" /></div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between gap-4 mt-6">
                <button type="button" onClick={handleVerifyLocation} disabled={isLocating} className="w-full py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50">
                  {isLocating ? 'Verifying location...' : 'Verify Location Preview'}
                </button>
              </div>

              {locationPreview && (
                <div className={`mt-4 p-3 rounded-md text-sm ${locationPreview.error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'}`}>
                  {locationPreview.error ? (
                    <p>⚠️ {locationPreview.error}</p>
                  ) : (
                    <div>
                      <p className="font-semibold text-green-900 mb-1">✓ Location Verified Successfully</p>
                      {locationPreview.name && <p className="text-xs mb-2 text-green-700">Matched to: {locationPreview.name}</p>}
                      <p>Latitude: <span className="font-mono">{locationPreview.lat}</span></p>
                      <p>Longitude: <span className="font-mono">{locationPreview.lon}</span></p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-4 mt-6">
                <button type="button" onClick={() => setStep(2)} className="w-full py-2 border rounded-md text-sm font-medium">Back</button>
                <button type="submit" className="w-full py-2 border rounded-md text-sm font-medium text-white bg-blue-600">Continue to Verification</button>
              </div>
            </form>
          )}

          {step === 4 && (
            <form className="space-y-6" onSubmit={handleStep3Submit}>
              <div className="flex justify-center mb-4 text-green-500">
                <Mail size={48} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Email Verification Sent</h3>
                <p className="mt-2 text-sm text-gray-500">
                  We've sent a verification OTP to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">Enter OTP</label>
                <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-2 block w-1/2 mx-auto text-center border border-gray-300 rounded-md shadow-sm py-2 px-3 tracking-widest text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="123456" />
              </div>

              <div className="text-center mt-2">
                <button type="button" onClick={handleResendOtp} className="text-sm font-medium text-blue-600 hover:text-blue-500">Resend OTP</button>
              </div>

              <div className="flex items-center justify-between gap-4 mt-6">
                <button type="button" onClick={() => setStep(3)} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Back</button>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">{isLoading ? 'Verifying location & Registering...' : 'Verify & Register'}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
