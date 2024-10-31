import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postSlice'
const store = configureStore({
    reducer: {
        posts: postsSlice,
    },
})
export default store