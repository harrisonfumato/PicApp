// UserDetail.jsx
import React from 'react';

const UserDetail = ({ user, onClose }) => {
  if (!user) {
    console.log('No user data provided to UserDetail:', user);
    return null; // Handle case when user is null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={onClose}
            className="ml-auto bg-blue-500 text-white rounded px-4 py-2"
          >
            Close
          </button>
        </div>

        {/* User details arranged vertically */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-700 font-medium">Name:</p>
            <p className="text-gray-900">{user.name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-700 font-medium">Email:</p>
            <p className="text-gray-900">{user.email}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-700 font-medium">Username:</p>
            <p className="text-gray-900">{user.username}</p>
          </div>

          {/* Add more user details if necessary */}
        </div>
      </div>
    </div>
    
  );
};

export default UserDetail;
