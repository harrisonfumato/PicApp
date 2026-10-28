import React, { useState } from 'react';
import axios from 'axios';

function Checkout({ imageUrl, onCreateSuccess, onCreateError }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    amount: price,
    currency: "GHS",
  });
  const [loading, setLoading] = useState(false);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios.post("https://localhost:7074/api/paystack/initialize", formData)
      .then((createResponse) => {
        onCreateSuccess(createResponse.data);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
        onCreateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">
          Proceed 
        </h2>
        <form onSubmit={handleSubmit} className="p-4">
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {success && <div className="text-green-600 mb-4">Created successfully.</div>}
         
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Title"
              type="text"
              name="Title"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
              Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Description"
              type="text"
              name="Description"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ImageUrl">
              Currency
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ImageUrl"
              type="text"
              name="ImageUrl"
              value={formData.currency}
              onChange={handleChange}
              
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Price"
              type="text"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-center justify-center">
            {loading ? (
              <button
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                type="button"
                disabled
              >
                Creating...
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
            )}
            <button
            onClick={onClose} // Call the onClose function to close the modal
            className="mt-2 bg-red-500 text-white p-2 rounded-lg w-full"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
