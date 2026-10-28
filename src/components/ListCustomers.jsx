import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteCustomer from './Customer/DeleteCustomer';

function ListCustomers() {
  const [customers, setCustomer] = useState([]);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  // Environment variable (API base URL)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/customer`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  return (
    <div className="container mx-auto main-content"> {/* Added main-content class */}
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      {deletedSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="black sm:inline ml-2">Customer was successfully deleted.</span>
        </div>
      )}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border px-4 py-2">{customer.id}</td>
              <td className="border px-4 py-2">{customer.FirstName}</td>
              <td className="border px-4 py-2">{customer.LastName}</td>
              <td className="border px-4 py-2">{customer.Email}</td>
              <td className="border px-4 py-2">{customer.Phone}</td>
              <td className="border px-4 py-2">
                <Link to={`/update/${customer.id}`} className="text-blue-500 hover:text-blue-700">
                  Update
                </Link> |
                <DeleteCustomer
                  customerId={customer.id}
                  onDelete={() => {
                    setDeletedSuccess(true);
                  }}
                  customerDetails={customer}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCustomers;
