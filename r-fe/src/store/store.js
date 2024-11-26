import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postSlice';
import userSlice from './userSlice';
import commentSlice from './commentSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
    comments: commentSlice
  },
});

export default store;
