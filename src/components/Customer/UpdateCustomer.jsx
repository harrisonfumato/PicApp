// UpdateCustomer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PartialUpdateCustomer from './PartialUpdateCustomer.jsx';

function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
  });

  const [showPartialUpdateForm, setShowPartialUpdateForm] = useState(false);

  // Environment variable (API base URL)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch the existing customer data when the component mounts
    axios.get(`${apiBaseUrl}/api/customer/${id}`)
      .then((response) => {
        const customerData = response.data;
        setFormData({
          FirstName: customerData.firstName,
          LastName: customerData.lastName,
          Email: customerData.email,
          Phone: customerData.phone,
        });
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, [id, apiBaseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${apiBaseUrl}/api/customer/Update/${id}`, formData)
      .then((response) => {
        console.log('Customer updated successfully:', response.data);
        navigate('/customers');
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
        // Handle error display logic here
      });
  };

  const handlePartialUpdateSuccess = (updateData) => {
    console.log('Partial update succeeded:', updateData);
    // Optionally refresh data after a partial update
    setShowPartialUpdateForm(false); // Hide the partial update form after success
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">Update Customer</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FirstName">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstName"
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LastName">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastName"
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="text"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone">
              Phone No.
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Phone"
              type="text"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update 
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setShowPartialUpdateForm(true)}
          >
            Update Partial
          </button>
        </div>
        {showPartialUpdateForm && (
          <PartialUpdateCustomer
            customerId={id}
            onSuccess={handlePartialUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default UpdateCustomer;
