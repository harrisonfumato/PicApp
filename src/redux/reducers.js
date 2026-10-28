// src/redux/reducers.js
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import dataReducer from './dataSlice';

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

export default rootReducer;
