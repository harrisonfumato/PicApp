import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListCustomers from './components/Customer/ListCustomers.jsx'
import Layout from './components/Shared/Layout.jsx';
import CreateCustomer from './components/Customer/CreateCustomer.jsx';
import UpdateCustomer from './components/Customer/UpdateCustomer.jsx';
import OrderTable from './components/Orders/OderTable.jsx';
import Dashboard from './components/Dashboard.jsx';
import Add from './components/Picture/Add.jsx'
import PicTable from './components/Picture/PicTable.jsx'
import Update from './components/Picture/Update.jsx'
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can set the initial state based on your authentication mechanism

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Routes>
        {/* Check if the user is logged in */}
        {isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/create" element={<CreateCustomer />} />
            <Route path="/customers" element={<ListCustomers />} />
            <Route path="/order" element={<OrderTable />} />
            <Route path="/picture" element={<Add />} />
            <Route path="/pictable" element={<PicTable />} />
            <Route path="/update/:id" element={<UpdateCustomer />} />
            <Route path="/picupdate/:id" element={<Update />} />
          </Route>
        ) : (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
