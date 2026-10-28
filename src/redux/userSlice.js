// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    subdomain: null, // Store the subdomain here
    isLoggedIn: false
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload; // Ensure user data is set correctly
      state.subdomain = action.payload.subdomain; // Store subdomain
      state.isLoggedIn = true;
    },
    logout(state) {
      state.currentUser = null;
      state.subdomain = null; // Reset subdomain on logout
      state.isLoggedIn = false;
    },
  },
});
// Selector to get the current user
export const selectUser = (state) => state.user.currentUser;
export const selectSubdomain = (state) => state.user.subdomain; // Selector for subdomain
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
