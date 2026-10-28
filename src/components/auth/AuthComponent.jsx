import React, { useState } from 'react';
import Login from './Login';
import UserDetail from '../../components/Shared/UserDetails.jsx';

const AuthContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = (details) => {
    console.log("User Details from Login:", details); // Debugging line
    setIsLoggedIn(true); // Switch to logged-in state
    setUserDetails(details); // Store user details
  };

  const handleClose = () => {
    setIsLoggedIn(false); // Log the user out
    setUserDetails(null); // Clear user details
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />  // Show login form if not logged in
      ) : (
        <UserDetail user={userDetails} onClose={handleClose} />  // Show user details modal if logged in
      )}
    </div>
  );
};

export default AuthContainer;
