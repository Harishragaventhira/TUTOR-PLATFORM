import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Subscriptions() {
  const location = useLocation();
  const role = location.pathname.startsWith('/student') ? 'student' : 'tutor';

  return (
    <DashboardLayout role={role}>
      <div className="mb-7">
        <h1 className="text-2xl font-black text-gray-800">Subscription & Renewal</h1>
        <p className="text-sm text-gray-600">Manage your platform plans and billing history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-l-4 border-green-500">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Current Active Plan</h3>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-bold text-xl text-blue-600">Premium {role === 'student' ? 'Access' : 'Listing'}</p>
                <p className="text-sm text-gray-600 mt-1">Billed Monthly</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-800">₹999 / mo</p>
                <p className="text-sm text-gray-500">Renews on Oct 15, 2025</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button className="btn-primary py-2 px-6 rounded-lg text-sm">Renew Now</button>
              <button className="btn-secondary py-2 px-6 rounded-lg text-sm border-red-200 text-red-600 hover:bg-red-50">Cancel Plan</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Billing History</h3>
            <div className="space-y-3">
              {[
                { date: 'Sep 15, 2025', amount: '₹999', status: 'Paid' },
                { date: 'Aug 15, 2025', amount: '₹999', status: 'Paid' },
                { date: 'Jul 15, 2025', amount: '₹999', status: 'Paid' }
              ].map((inv, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-gray-800">{inv.date}</p>
                    <p className="text-xs text-blue-600 cursor-pointer">Download Invoice</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{inv.amount}</p>
                    <span className="text-xs font-bold text-green-600">{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="glass-card p-6 bg-blue-50 border-blue-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Upgrade Plan</h3>
            <p className="text-sm text-gray-600 mb-4">Get access to premium features, zero platform fees, and advanced AI analytics.</p>
            <ul className="space-y-2 mb-6 text-sm text-gray-700">
              <li className="flex gap-2">✓ Priority Support</li>
              <li className="flex gap-2">✓ Unlimited AI Access</li>
              <li className="flex gap-2">✓ Featured Profile</li>
            </ul>
            <button className="w-full btn-primary py-3 rounded-lg text-sm">Upgrade to Pro - ₹1999</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
