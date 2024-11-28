import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postSlice';
import userSlice from './userSlice';
import commentSlice from './commentSlice';
import voteSlice from './voteSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
    comments: commentSlice,
    vote: voteSlice
  },
});

export default store;
