// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pictureReducer from './pictureSlice.js'; // Adjust the path as necessary
import customerReducer from './customerSlice';
import orderReducer from './orderSlice.js';
import dataReducer from './dataSlice.js';
import userReducer from './userSlice.js';
import { logout } from './userSlice.js';


const appReducer = combineReducers({
  pictures: pictureReducer, // Add your reducer here
  customers: customerReducer,
  orders: orderReducer, // Add your reducer here
  data: dataReducer, // Ensure 'data' is the key
  user: userReducer,
 
});

const rootReducer = (state, action) => {
  if (logout.match(action)){
    state = undefined;
  }
  return appReducer(state, action);
}

const store = configureStore({ reducer: rootReducer });

export default store;
