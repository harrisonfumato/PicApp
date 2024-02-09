import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import ListCustomers from './components/Customer/ListCustomers.jsx'
import Layout from './components/Shared/Layout.jsx';
import CreateCustomer from './components/Customer/CreateCustomer.jsx';
import UpdateCustomer from './components/Customer/UpdateCustomer.jsx';
import OrderTable from './components/Orders/OderTable.jsx';
import Dashboard from './components/Dashboard.jsx';
import Add from './components/Picture/Add.jsx'
import PicTable from './components/Picture/PicTable.jsx'
import Update from './components/Picture/Update.jsx'

function App() {

  return (
    <Router>
          <Routes>
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
          </Routes>
          <Routes path="login" element={<div>Login</div>}/>
          <Route path="/signup" element={<Signup />} />
    </Router>
  );
}

export default App;
