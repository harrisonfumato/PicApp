// PartialUpdateCustomer.js
import React, { useState } from 'react';
import axios from 'axios';

function PartialUpdateCustomer({ customerId, onSuccess }) {
  const [formData, setFormData] = useState({
    FirstName: '',
  });

  // Environment variable (API base URL)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    const patchDocument = [{
      op: 'replace',
      path: '/FirstName',
      value: formData.FirstName,
    }];

    axios.patch(`${apiBaseUrl}/api/HotelBooking/UpdatePartial/${customerId}`, patchDocument)
      .then((response) => {
        console.log('Customer partially updated successfully:', response.data);
        if (onSuccess) {
          onSuccess(response.data);
        }
        // Reset form after success
        setFormData({ FirstName: '' });
      })
      .catch((error) => {
        console.error('Error updating customer partially:', error);
        // Handle error display logic here
      });
  };

  return (
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
          onChange={(e) => setFormData({ FirstName: e.target.value })}
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
  );
}

export default PartialUpdateCustomer;
