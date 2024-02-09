import React, { useState } from 'react';
import PictureUploadForm from './PictureUploadForm';
import PictureCreateForm from './PictureCreateForm'; // Adjust the path based on your project structure

function Add() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadSuccess = (url) => {
    setImageUrl(url);
    setUploadSuccess(true);
  };

  const handleUploadError = (error) => {
    setError('An error occurred while uploading the picture.');
  };

  const handleCreateSuccess = (data) => {
    // Handle successful creation
    console.log('Picture created successfully:', data);
    // You might want to redirect or update the UI accordingly
  };

  const handleCreateError = (error) => {
    // Handle creation error
    console.error('Error creating picture:', error);
    // You might want to display an error message to the user
  };

  const handleClose = () => {
    // Add any additional logic you need when closing the form
    setUploadSuccess(false);
    setImageUrl('');
    setError(null);
  };

  return (
    <div className="container mx-auto mt-5">
      {uploadSuccess ? (
        <PictureCreateForm
          imageUrl={imageUrl}
          onCreateSuccess={handleCreateSuccess}
          onCreateError={handleCreateError}
          onClose={handleClose}
        />
      ) : (
        <PictureUploadForm
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />
      )}
    </div>
  );
}

export default Add;
