import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Delete from './Delete';

function PicTable() {
  const [pictures, setPicture] = useState([]);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:7074/api/pictures')
      .then((response) => {
        setPicture(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pictures:', error);
      });
  }, []);

  return (
    <div className="container mx-auto main-content"> {/* Added main-content class */}
      <h2 className="text-2xl font-bold mb-4">Picture List</h2>
      {deletedSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="black sm:inline ml-2">Picture was successfully deleted.</span>
        </div>
      )}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">ImageUrl</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Download Link</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pictures.map((picture) => (
            <tr key={picture.pictureId}>
              <td className="border px-4 py-2">{picture.pictureId}</td>
              <td className="border px-4 py-2">{picture.title}</td>
              <td className="border px-4 py-2">{picture.description}</td>
              <td className="border px-4 py-2">{picture.imageUrl}</td>
              <td className="border px-4 py-2">{picture.price}</td>
              <td className="border px-4 py-2">{picture.downloadUrl}</td>
              <td className="border px-4 py-2">
                <Link to={`/picupdate/${picture.pictureId}`} className="text-blue-500 hover:text-blue-700">
                  Update
                </Link> |
                <Delete
                  pictureId={picture.pictureId}
                  onDelete={() => {
                    setDeletedSuccess(true);
                  }}
                  pictureDetails={picture}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PicTable;
