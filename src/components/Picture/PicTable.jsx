// PicTable.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPictures, deletePicture } from '../../redux/pictureSlice'; // Adjust the import path as necessary
import Delete from './Delete'; // Assuming you have a Delete component
import Update from './Update'; // Assuming you have an Update component
import { Link } from 'react-router-dom';

const PicTable = () => {
  const dispatch = useDispatch();
  const pictures = useSelector((state) => state.pictures.items); // Assuming you store pictures in 'items'
  const loading = useSelector((state) => state.pictures.loading);

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  const handleDelete = (pictureId) => {
    dispatch(deletePicture(pictureId)); // Dispatch delete action
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Pictures Table</h2>
      {loading ? (
        <p className="text-center">Loading pictures...</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Image URL</th>
              <th className="px-4 py-2">Download URL</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pictures.map((picture) => (
              <tr key={picture.pictureId}>
                <td className="px-4 py-2">{picture.pictureId}</td>
                <td className="px-4 py-2">{picture.title}</td>
                <td className="px-4 py-2">{picture.description}</td>
                <td className="px-4 py-2">{picture.imageUrl}</td>
                <td className="px-4 py-2">{picture.downloadUrl}</td>
                <td className="px-4 py-2">{picture.price}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link to={`/update/${picture.pictureId}`}>
                    <button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                      Update
                    </button>
                  </Link>
                  <Delete
                    pictureId={picture.pictureId}
                    onDelete={() => handleDelete(picture.pictureId)}
                    pictureDetails={picture}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PicTable;
