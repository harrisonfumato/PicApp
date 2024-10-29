// features/pictures/pictureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Function to get the token (you can adjust this based on your auth setup)
const getAuthToken = () => {
  return localStorage.getItem('token'); // or get it from Redux state if you store it there
};

// Async thunk to upload picture
export const uploadPicture = createAsyncThunk('pictures/uploadPicture', async (formData) => {
  const token = getAuthToken();
  const response = await axios.post(`${apiBaseUrl}/api/pictures/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}` // Add Bearer token here
    },
  });
  return response.data; // Return the uploaded picture's data
});

// Async thunk to create picture details
export const createPictureDetails = createAsyncThunk('pictures/createPictureDetails', async (pictureData) => {
  const token = getAuthToken();
  const response = await axios.post(`${apiBaseUrl}/api/pictures/create`, pictureData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add Bearer token here
    },
  });
  return response.data; // Return the created picture details
});

// Fetch pictures thunk
export const fetchPictures = createAsyncThunk('pictures/fetchPictures', async () => {
  const token = getAuthToken();
  const response = await axios.get(`${apiBaseUrl}/api/pictures`, {
    headers: {
      'Authorization': `Bearer ${token}` // Add Bearer token here
    },
  });
  return response.data;
});

const pictureSlice = createSlice({
  name: 'pictures',  // Ensure this is present and correctly spelled
  initialState: {
    items: [],  // This should match what you're using in the component
    status: 'idle',
    error: null,
  },
  reducers: {
    addPicture: (state, action) => {
      state.items.push(action.payload);
    },
    deletePicture: (state, action) => {
      state.items = state.items.filter(picture => picture.pictureId !== action.payload);
    },
    updatePicture: (state, action) => {
      const index = state.items.findIndex(picture => picture.pictureId === action.payload.pictureId);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPictures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPictures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;  // Store the fetched pictures in 'items'
      })
      .addCase(fetchPictures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadPicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);  // Add the uploaded picture to the state
      })
      .addCase(uploadPicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPictureDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPictureDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // Add the newly created picture to the state
      })
      .addCase(createPictureDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPicture, deletePicture, updatePicture } = pictureSlice.actions;

export default pictureSlice.reducer;
