// ListCustomers.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../redux/customerSlice'; // Adjust the import path as necessary
import DeleteCustomer from './DeleteCustomer'; // Adjust the import path as necessary

function ListCustomers() {
  const dispatch = useDispatch();
  const { list: customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = () => {
    dispatch(fetchCustomers()); // Refresh customer list after deletion
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center py-4">Customer List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone No.</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td className="py-2 px-4 border-b">{customer.firstName}</td>
              <td className="py-2 px-4 border-b">{customer.lastName}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.phone}</td>
              <td className="py-2 px-4 border-b">
                <DeleteCustomer customerId={customer.customerId} onDelete={handleDelete} customerDetails={customer} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCustomers;
