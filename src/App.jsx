import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set based on auth mechanism
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Function to handle global login state
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (

    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
