// store.js
import { configureStore } from '@reduxjs/toolkit';
import pictureReducer from './pictureSlice.js'; // Adjust the path as necessary
import customerReducer from './customerSlice';
import orderReducer from './orderSlice.js';
import dataReducer from './dataSlice.js';
import userReducer from './userSlice.js'


const store = configureStore({
  reducer: {
    pictures: pictureReducer, // Add your reducer here
    customers: customerReducer,
    orders: orderReducer, // Add your reducer here
    data: dataReducer, // Ensure 'data' is the key
    user: userReducer,
  },
});

export default store;
