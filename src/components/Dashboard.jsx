// src/components/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const Dashboard = () => {
  // Access user data from Redux store
  const userData = useSelector((state) => state.data.items);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Welcome to Your Dashboard!</h2>
      {userData.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl">User Details:</h3>
          <div className="flex items-center mt-4">
            {userData[0].avatarUrl && ( // Assuming avatarUrl contains the link to the user's picture
              <img
                src={userData[0].avatarUrl}
                alt="User Avatar"
                className="w-16 h-16 rounded-full mr-4" // Styling for the avatar
              />
            )}
            <div>
              <strong>Username:</strong> {userData[0].username}<br />
              <strong>Email:</strong> {userData[0].email} {/* Assuming user data includes an email field */}
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
