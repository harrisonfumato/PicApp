import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPictureDetails } from '../../redux/pictureSlice'; // Adjust import path
import { fetchCustomers } from '../../redux/customerSlice'; // Adjust the import path as necessary

// 1. Accept 'url' instead of 'DownloadUrl' to match backend casing
function PictureCreateForm({ imageUrl, url, customerId, publicIds, files, folderName = ""}) {
  const dispatch = useDispatch();
  console.log("Passed URL:", url) 

  const { list: customers = [], loading: customersLoading, error: customersError } = useSelector((state) => state.customers);

  
  const [formError, setFormError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: imageUrl, // Prepopulate with uploaded image URL
    price: '',
    folderName: '',
    DownloadUrl: url || "",// 2. Fallback to empty string if undefined
    customerId: customerId || '', //Store the selectd customer ID
    publicIds: Array.isArray(publicIds) ? publicIds : [], // Save all cloudinary publicIds
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);


  // Safety synchronization hook: ensures state updates if props arrive slightly delayed
  useEffect(() => {
    if (url) {
      setFormData(prev => ({ ...prev, 
        ...(url !== undefined && { DownloadUrl: url }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(customerId !== undefined && { customerId}),
        ...(folderName !== undefined && {
          folderName: folderName || '',
        }),
        ...(publicIds !== undefined && {
          publicIds: Array.isArray(publicIds) ? publicIds : [], }), }));
    }
  }, [url, imageUrl, customerId, publicIds, folderName ]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if ( !formData.title.trim() ||
      !formData.description.trim() ||
      String(formData.price).trim() === '' ||
      !Number.isFinite(price) ||
      !formData.DownloadUrl ||
      !formData.customerId ||
      !Number.isInteger(selectedCustomerId) ||
      !Array.isArray(formData.publicIds) ||
      formData.publicIds.length === 0 ||
      formData.publicIds.some(
      (id) => typeof id !== 'string' || !id.trim())) {
      setFormError('Please fill in all fields and select a customer, and uplaod your pictures.'); // 3. Fixed setError -> setFormError
      return;
    }
    // Format numberic fields for your c# PictureDto
    const payload = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      price,
      customerId: selectedCustomerId,
      publicIds: [...formData.publicIds],
    }

    try {
      await dispatch(createPictureDetails(payload)).unwrap();
      // Handle success (e.g., redirect, show a message)
      alert('Picture created successfully!');
    } catch (err) {
      console.error('Error creating picture:', err);
      const response = err?.response?.data ?? err;

      const validationMessages = response?errors && typeof response.errors === 'object'
        ? Object.values(response.errors)
          .flat()
          .filter((message) => typeof message === 'string')
          .join('') 
        : '':
      setFormError(validationMessages ||
        (typeof response === 'string' ? response: response?.message ) || 'Error creating picture. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">Create Picture</h2>
        {/* Visual feedback showing the photographer a preview of what they uploaded */}
        {imageUrl && (
          <div className="px-6 pt-2">
            <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover rounded shadow-inner" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DownloadUrl">
              Download Link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              id="DownloadUrl"
              type="text"
              name="DownloadUrl"
              value={formData.DownloadUrl}
              onChange={handleChange}
              required
              disabled
              readOnly          // better UX than disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Customer</label>
            <select
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              disabled={customersLoading}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ><option value="">
              {customersLoading ? 'Loading customers...' : '-- Select a Customer --'}
            </option>
            {customers.map((customer) => ( 
              <option key={customer.customerId} value={customer.customerId}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
            </select>
            {customersError && (
              <p className="text-red-500 text-xs mt-1">Failed to load customers: {customersError}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create Picture
          </button>
          {formError && <p className="text-red-600 mt-4">{formError}</p>}
        </form>
      </div>
    </div>

  );
}

export default PictureCreateForm;
