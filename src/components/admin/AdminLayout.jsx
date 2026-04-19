import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Tutor Verifications', href: '/admin/verifications', icon: '✅' },
    { name: 'Student Management', href: '/admin/students', icon: '👨‍🎓' },
    { name: 'Course Management', href: '/admin/courses', icon: '📚' },
    { name: 'Platform Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="text-2xl font-bold text-blue-600">TutorBridge</Link>
          <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname.startsWith(item.href)
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Super Admin</p>
              <Link to="/admin" className="text-xs text-red-500 hover:text-red-700">Logout</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {navigation.find((item) => location.pathname.startsWith(item.href))?.name || 'Admin'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 relative">
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                🔔
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
