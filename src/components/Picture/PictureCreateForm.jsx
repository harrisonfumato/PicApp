import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPictureDetails } from '../../redux/pictureSlice'; // Adjust import path

// 1. Accept 'url' instead of 'DownloadUrl' to match backend casing
function PictureCreateForm({ imageUrl, url }) {
  const dispatch = useDispatch();
  console.log("Passed URL:", url)
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: imageUrl, // Prepopulate with uploaded image URL
    price: '',
    folderName: '',
    DownloadUrl: url || "",// 2. Fallback to empty string if undefined
  });

  // Safety synchronization hook: ensures state updates if props arrive slightly delayed
  useEffect(() => {
    if (url) {
      setFormData(prev => ({ ...prev, DownloadUrl: url }));
    }
  }, [url]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.DownloadUrl) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await dispatch(createPictureDetails(formData)).unwrap();
      // Handle success (e.g., redirect, show a message)
      alert('Picture created successfully!');
    } catch (err) {
      setError('Error creating picture. Please try again.');
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="DownloadUrl"
              type="text"
              name="DownloadUrl"
              value={formData.DownloadUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create Picture
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </div>
    </div>

  );
}

export default PictureCreateForm;
