// UpdateBooking.j
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Update({}) {
  const { id } = useParams();
  const pictureId = id; // Assuming you have a route parameter for the booking ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    Title: '',
    Description: '',
    ImageUrl: '',
    DownloadUrl: '',
    Price: '',
  });

const [showPartialUpdateForm, setShowPartialUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch the existing booking data when the component mounts
    axios.get(`https://localhost:7074/api/pictures/${pictureId}`)
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

    axios.put(`https://localhost:7074/api/pictures/${pictureId}`, formData)
      .then((response) => {
        console.log('Picture updated successfully:', response.data);
        // Redirect or display a success message
        navigate('/pictable');
      })
      .catch((error) => {
        console.error('Error updating picture:', error);
        // Handle the error and display an error message
      });
  };

  const handlePartialUpdateSuccess = (updateData) => {
    console.log('Partial update succeeded:', updateData);
  }

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
              ImageUrl
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ImageUrl">
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shodow-outline"
          type="button"
          onClick={() => setShowPartialUpdateForm(true)}>
            Update Partial
          </button>
        </div>
        {showPartialUpdateForm && (<PartialUpdatePicture
          pictureId={picturerId}
          onSuccess={handlePartialUpdateSuccess}/>)}
      </div>
    </div>
  );
}

export default Update;
