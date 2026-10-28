import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Helper function to get token from localStorage or sessionStorage
const getToken = () => localStorage.getItem('token'); // or sessionStorage.getItem('token');

// Async action to create a customer
export const createCustomer = createAsyncThunk('customers/createCustomer', async (customerData) => {
  const token = getToken();
  console.log('Token:', token);
  const response = await axios.post(
    `${apiBaseUrl}/api/customer/create`,
    customerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      }
    }
  );
  return response.data;
});

// Async action to fetch customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const token = getToken();
  const response = await axios.get(`${apiBaseUrl}/api/customer`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
    }
  });
  return response.data;
});

// Async action to delete a customer
export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId) => {
  const token = getToken();
  await axios.delete(`${apiBaseUrl}/api/customer/${customerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
    }
  });
  return customerId; // Return customerId for further use
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.list.push(action.payload); // Add the new customer to the list
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(customer => customer.customerId !== action.payload);
      });
  },
});

export default customerSlice.reducer;
