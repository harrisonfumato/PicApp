import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formStyles } from '../styles/styles'; // Import form styles


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {loggedIn, setLoggedIn} = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7074/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        setLoggedIn(true);
        // Redirect the user or perform any other action upon successful login
      } else {
        console.error('Login failed');
        // Handle login failure, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle any errors that occur during the login process
    }
  };

  if(loggedIn){
    return <Redirect to="/dashboard"/>;
  }

  return (
    <div style={formStyles.container}>
      {/* Background Image */}
      <div style={formStyles.background} />

      {/* Login Form */}
      <div style={formStyles.formContainer}>
        <h2 style={formStyles.formHeading}>Login</h2>
        <form style={formStyles.form}>
          <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Username:</label>
            <input
              type="username"
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
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
