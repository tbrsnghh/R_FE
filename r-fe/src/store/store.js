import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
  },
});

export default store;
