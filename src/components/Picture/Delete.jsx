// Delete.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deletePicture } from '../../redux/pictureSlice.js';

function Delete({ pictureId, pictureDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleDelete = () => {
    axios.delete(`${apiBaseUrl}/api/pictures/${pictureId}`)
      .then(() => {
        dispatch(deletePicture(pictureId)); // Dispatch the action to update Redux state
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting picture:', error);
      });
  }

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        Delete
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-1/3 p-4 rounded-lg z-50">
            <p className="text-xl mb-4">Confirm Deletion</p>
            {pictureDetails && (
              <div className="mb-4">
                <p>Picture Details:</p>
                <p>ID: {pictureDetails.pictureId}</p>
                <p>Title: {pictureDetails.title}</p>
                <p>Description: {pictureDetails.description}</p>
                <p>Picture: <img src={pictureDetails.imageUrl} alt={pictureDetails.title} className="w-full h-auto" /></p>
                <p>Price: {pictureDetails.price}</p>
              </div>
            )}
            <p>Are you sure you want to delete this Picture?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Delete;
