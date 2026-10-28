// UpdateBooking.j
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PartialUpdateCustomer from './Customer/PartialUpdateCustomer.jsx';

function UpdateCustomer({}) {
  const { id } = useParams();
  const customerId = id; // Assuming you have a route parameter for the booking ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
  });

const [showPartialUpdateForm, setShowPartialUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch the existing booking data when the component mounts
    axios.get(`https://localhost:7074/api/customer/${customerId}`)
      .then((response) => {
        const customerData = response.data;
        setFormData({
          id: customerData.id,
          FirstName: customerData.FirstName,
          LastName: customerData.LastName,
          Email: customerData.Email,
          Phone: customerData.Phone,
        });
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error);
      });
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://localhost:7074/api/customer/Update/${customerId}`, formData)
      .then((response) => {
        console.log('Customer updated successfully:', response.data);
        // Redirect or display a success message
        navigate('/update');
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
        // Handle the error and display an error message
      });
  };

  const handlePartialUpdateSuccess = (updateData) => {
    console.log('Partial update succeeded:', updateData);
  }

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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
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
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shodow-outline"
          type="button"
          onClick={() => setShowPartialUpdateForm(true)}>
            Update Partial
          </button>
        </div>
        {showPartialUpdateForm && (<PartialUpdateCustomer
          customerId={customerId}
          onSuccess={handlePartialUpdateSuccess}/>)}
      </div>
    </div>
  );
}

export default UpdateCustomer;
