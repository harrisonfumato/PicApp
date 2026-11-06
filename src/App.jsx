import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './components/auth/AuthContext.jsx';
import ListCustomers from './components/Customer/ListCustomers.jsx';
import Layout from './components/Shared/Layout.jsx';
import CreateCustomer from './components/Customer/CreateCustomer.jsx';
import UpdateCustomer from './components/Customer/UpdateCustomer.jsx';
import OrderTable from './components/Orders/OderTable.jsx';
import Dashboard from './components/Dashboard.jsx';
import Add from './components/Picture/Add.jsx';
import PicTable from './components/Picture/PicTable.jsx';
import Update from './components/Picture/Update.jsx';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from '../src/redux/store.js'; // Import the store here
import { useDispatch } from 'react-redux';
import { setUser, logout as logoutAction } from './redux/userSlice';


const isTokenValid = (t) => {
  try {
    const { exp } = JSON.parse(atob(t.split('.')[1]));
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

function App() {
  const dispatch = useDispatch();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token && isTokenValid(token);
  }); // Set based on auth mechanism
  

  // Function to handle global login state
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token'); // Optional: cleans token on logout
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved && isLoggedIn) dispatch(setUser(JSON.parse(saved)));
  }, [dispatch, isLoggedIn]);
  return (

    <AuthContext.Provider value={{ logout: handleLogout }}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <Router>
          <Routes>
            {/* Check if the user is logged in */}
            {isLoggedIn ? (
              <Route path="/" element={<Layout />}>
                {/* Nested routes under Layout */}
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} /> {/* Removed leading slash */}
                <Route path="create" element={<CreateCustomer />} /> {/* No leading slash */}
                <Route path="customers" element={<ListCustomers />} />
                <Route path="order" element={<OrderTable />} />
                <Route path="picture" element={<Add />} />
                <Route path="pictable" element={<PicTable />} />
                <Route path="update/:id" element={<UpdateCustomer />} />
                <Route path="picupdate/:id" element={<Update />} />

                {/* Fallback route if no match */}
                <Route path="*" element={<Navigate to="dashboard" />} />
              </Route>
            ) : (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            )}
            <Route path="/signup" element={<Signup />} />
            {/* Fallback route for non-logged-in users */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
}

export default App;
