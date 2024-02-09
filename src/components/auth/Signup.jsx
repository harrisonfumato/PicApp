// components/Auth/Signup.jsx
import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Add your signup logic here (e.g., API calls, user creation)
    console.log('Signing up with:', email, password);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
