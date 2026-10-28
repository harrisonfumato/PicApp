// src/components/Add.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/dataSlice';
import PictureUploadForm from './PictureUploadForm';
import PictureCreateForm from './PictureCreateForm';

function Add() {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSuccess = (url) => {
    setImageUrl(url);
    setUploadSuccess(true);
  };

  const handleCreateSuccess = (data) => {
    dispatch(addItem(data)); // Add new item to Redux
  };

  return (
    <div>
      {uploadSuccess ? (
        <PictureCreateForm
          imageUrl={imageUrl}
          onCreateSuccess={handleCreateSuccess}
        />
      ) : (
        <PictureUploadForm
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}

export default Add;
