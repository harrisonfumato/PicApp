// Update.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePicture } from '../../redux/pictureSlice'; // Adjust the path as necessary

function Update() {
  const { id } = useParams();
  const pictureId = id; // Assuming you have a route parameter for the picture ID
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: '',
    Title: '',
    Description: '',
    ImageUrl: '',
    DownloadUrl: '',
    Price: '',
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [showPartialUpdateForm, setShowPartialUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch the existing picture data when the component mounts
    axios.get(`${apiBaseUrl}/api/pictures/${pictureId}`)
      .then((response) => {
        const pictureData = response.data;
        setFormData({
          id: pictureData.pictureId,
          Title: pictureData.title,
          Description: pictureData.description,
          ImageUrl: pictureData.imageUrl,
          DownloadUrl: pictureData.downloadUrl,
          Price: pictureData.price,
        });
      })
      .catch((error) => {
        console.error('Error fetching picture data:', error);
      });
  }, [pictureId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${apiBaseUrl}/api/pictures/${pictureId}`, formData)
      .then((response) => {
        console.log('Picture updated successfully:', response.data);
        dispatch(updatePicture(response.data)); // Dispatch the update action
        navigate('/pictable'); // Redirect after update
      })
      .catch((error) => {
        console.error('Error updating picture:', error);
      });
  };

  const handlePartialUpdateSuccess = (updateData) => {
    console.log('Partial update succeeded:', updateData);
    dispatch(updatePicture(updateData)); // Dispatch the update action
    setShowPartialUpdateForm(false); // Close the partial update form
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">Update Picture</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Title"
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Description"
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ImageUrl">
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ImageUrl"
              type="text"
              name="ImageUrl"
              value={formData.ImageUrl}
              onChange={handleChange}
              required
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setShowPartialUpdateForm(true)}
          >
            Update Partial
          </button>
        </div>
        {showPartialUpdateForm && (
          <PartialUpdatePicture
            pictureId={pictureId}
            onSuccess={handlePartialUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default Update;
