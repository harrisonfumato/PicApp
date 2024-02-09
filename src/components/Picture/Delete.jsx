import React, { useState } from 'react';
import axios from 'axios';

function Delete({ pictureId, onDelete, pictureDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    axios.delete(`https://localhost:7074/api/pictures/${pictureId}`)
      .then(() => {
        onDelete();
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
                <p>Piture Details:</p>
                <p>ID: {pictureDetails.pictureId}</p>
                <p>Title: {pictureDetails.title}</p>
                <p>Description: {pictureDetails.description}</p>
                <p>Picture: {pictureDetails.imageUrl}</p>
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
