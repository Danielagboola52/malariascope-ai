import React, { useState } from 'react';

export default function PasswordResetForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // Handle password reset logic here
    console.log('Password reset submitted');
    alert('Password reset successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Reset Password
        </h2>
        
        <div className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33444E] focus:border-transparent placeholder-gray-400 text-gray-700"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33444E] focus:border-transparent placeholder-gray-400 text-gray-700"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-4 text-white font-medium rounded-lg transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#33444E]"
            style={{ backgroundColor: '#33444E' }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}