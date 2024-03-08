import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { formStyles } from '../styles/styles'; // Import form styles

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('https://localhost:7074/signup', {
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

      // Sign up successful, you can redirect or perform any other action here
      console.log('Signup successful');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div style={formStyles.container}>
      {/* Background Image */}
      <div style={formStyles.background} />

      {/* Signup Form */}
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
          <p>Already have an account? <Link to="/">Login</Link></p> {/* Link to login page */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
