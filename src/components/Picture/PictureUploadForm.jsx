import React, { useState } from 'react';
import axios from 'axios';
import PictureCreateForm from './PictureCreateForm';

function PictureUploadForm() {
  const [folderName, setFolderName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [error, setError] = useState(null);
  const [proceedToCreate, setProceedToCreate] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = () => {
    if (folderName === '' || selectedFiles.length === 0) {
      setError('Please provide a folder name and select files to upload.');
      return;
    }

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('FolderName', folderName);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('Files', selectedFiles[i]);
    }

    axios
      .post('https://localhost:7074/api/pictures/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setUploadResponse(response.data);
        setProceedToCreate(true); // Proceed to create form after successful upload
      })
      .catch((err) => {
        setError('Error uploading pictures. Please try again later.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div>
      {proceedToCreate ? (
        <PictureCreateForm
          imageUrl={uploadResponse[0].url} // Assuming the first URL is the one you want to use
        />
      ) : (
        <div className="container mx-auto mt-5">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md" >
            <h2 className="text-2xl font-bold text-gray-800 text-center py-4">Upload Pictures</h2>
            <form className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Folder Name:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={folderName} onChange={handleFolderNameChange} />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Pictures:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" multiple onChange={handleFileChange} />
              </div>
              <div className="flex items-center justify-center mb-2">
                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" onClick={handleUpload} disabled={uploading}>
                  Upload
                </button>
              </div>
              {error && <p className="text-red-600">{error}</p>}
              {uploadResponse && (
                <div>
                  <h3>Upload Response:</h3>
                  <pre>{JSON.stringify(uploadResponse, null, 2)}</pre>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PictureUploadForm;
