import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';
import roomReducer from './features/roomSlice';

export const store = configureStore({
  reducer : {
    user : userReducer,
    chat : chatReducer,
    room : roomReducer
  }
});