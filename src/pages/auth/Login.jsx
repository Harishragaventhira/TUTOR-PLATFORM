import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const profileType = location.state?.profileType || 'Learner'; // default to Learner or use passed state

  const [view, setView] = useState('login'); // login | forgotPassword | forgotUsername
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role === 'admin') {
        localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'admin' }));
        navigate('/admin/dashboard');
        return;
      }

      // Check admin approval status
      const user = data.user;
      
      if (user.status === 'pending_admin') {
        alert('Your profile is currently under review by an administrator. You will be able to access the platform once approved.');
        if (user.profileType === 'learner' || user.profileType === 'student' || user.profileType === 'Learner') {
          navigate('/learner/verification-pending');
        } else {
          navigate('/tutor/verification-pending');
        }
        return;
      }

      if (user.status === 'rejected') {
        alert('Your application was rejected by the administrator. Please contact support.');
        if (user.profileType === 'tutor' || user.profileType === 'Tutor') navigate('/tutor/rejected');
        return;
      }

      // Store user session data
      localStorage.setItem('user', JSON.stringify(user));

      // Approved users can enter the platform
      if (user.profileType === 'learner' || user.profileType === 'student' || user.profileType === 'Learner') {
        navigate('/learner'); 
      } else if (user.profileType === 'tutor' || user.profileType === 'Tutor') {
        navigate('/tutor');
      } else {
        navigate(`/${user.profileType}`);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    alert(`Recovery link sent to ${formData.email}`);
    setView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {view === 'login' ? 'Sign in to TutorBridge' : 
           view === 'forgotPassword' ? 'Reset Password' : 
           'Recover Username'}
        </h2>
        {view === 'login' && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {view === 'login' && (
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input required name="username" type="text" value={formData.username} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input required name="password" type="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button type="button" onClick={() => setView('forgotUsername')} className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot username?
                  </button>
                </div>
                <div className="text-sm">
                  <button type="button" onClick={() => setView('forgotPassword')} className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </button>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Sign in
                </button>
              </div>
            </form>
          )}

          {(view === 'forgotPassword' || view === 'forgotUsername') && (
            <form className="space-y-6" onSubmit={handleRecoverySubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter your Email ID</label>
                <input required name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Send Recovery Link
                </button>
              </div>
              
              <div className="text-center text-sm">
                <button type="button" onClick={() => setView('login')} className="font-medium text-gray-600 hover:text-gray-500">
                  Back to Sign in
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
