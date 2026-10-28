// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Function to get the token (you can adjust this based on your auth setup)
const getAuthToken = () => {
  return localStorage.getItem('token'); // or get it from Redux state if you store it there
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const token = getAuthToken(); // Retrieve the token

  const response = await axios.get(`${apiBaseUrl}/api/order`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Add the Bearer token here
    },
  });

  return response.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
