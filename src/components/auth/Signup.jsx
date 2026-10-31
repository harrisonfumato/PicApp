// src/components/auth/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formStyles } from '../styles/styles';
import { useDispatch } from 'react-redux';
import { setItems } from '../../redux/dataSlice'; // Import the action

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleSignup = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          password,
          confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log('Signup successful');
      dispatch(setItems(data)); // Dispatch action to update Redux store
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background} />
      <div style={formStyles.formContainer}>
        <h2 style={formStyles.formHeading}>Signup</h2>
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
            <label style={formStyles.label}>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={formStyles.input}
            />
          </div>
          <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={formStyles.input}
            />
          </div>
          <button type="button" onClick={handleSignup} style={formStyles.button}>Signup</button>
          <p>Already have an account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
