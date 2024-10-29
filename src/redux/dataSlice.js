// src/redux/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.pictureId !== action.payload);
    },
    // Additional reducers as needed
  },
});

export const { setItems, addItem, removeItem } = dataSlice.actions;
export default dataSlice.reducer;
