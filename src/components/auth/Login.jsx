// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { formStyles } from '../styles/styles';
import { setItems } from '../../redux/dataSlice'; // Import the action
import { setUser } from '../../redux/userSlice'; // Import setUser action

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch(); // Hook to dispatch actions

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful');
        // Store JWT token if returned
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log("Token is:", data.token);
          setLoggedIn(true);
          setError('');
          dispatch(setItems(data)); // Dispatch action to update Redux store
          dispatch(setUser({ subdomain: data.subdomain,username: data.username, token: data.token })); // Dispatch action to update Redux store (user)
          // Set user details
          // Construct userDetails object
          const userDetails = {
            name: data.name || 'N/A',  // Use 'N/A' or any fallback if data is missing
            email: data.email || 'N/A',
            username: data.username || 'N/A'
          };
          console.log('User details:', userDetails);
          onLogin(userDetails); // Call onLogin to indicate successful login with user details
        }

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setError('Error occurred during login');
    }
  };

  const handleGoogleResponse = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: credential }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Google login successful');
        // Store JWT token if returned
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log("Token is:", data.token);
        }
        setLoggedIn(true);
        dispatch(setItems(data)); // Dispatch action to update Redux store
        dispatch(setUser({ subdomain: data.subdomain,username: data.username, name: data.name, email: data.email ,token: data.token })); // Dispatch action to update Redux store (user)
        const userDetails = {
          name: data.name || 'N/A',  // Use 'N/A' or any fallback if data is missing
          email: data.email || 'N/A',
          username: data.username || 'N/A'
        };
        console.log('User details:', userDetails);
        onLogin(userDetails); // Call onLogin to indicate successful login with user detail
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Google login failed');
      }
    } catch (error) {
      setError('Error during Google login');
    }
  };
  const handleGoogleFailure = (error) => {
    setError('Google login failed');
    console.error('Google login failed:', error);
  };
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background} />
      <div style={formStyles.formContainer}>
        <h2 style={formStyles.formHeading}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <form style={formStyles.form}>
          <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={formStyles.input}
            />
          </div>
          <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={formStyles.input}
            />
          </div>
          <button type="button" onClick={handleLogin} style={formStyles.button}>Login</button>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onError={handleGoogleFailure}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;



