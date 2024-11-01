import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66a07b337053166bcabb89f5.mockapi.io/api/v1/'
export const getPosts = createAsyncThunk("posts/getPosts", async (thunkAPI) => {
    const url = BASE_URL + "posts";
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  });

export const getComments = createAsyncThunk("comments/getComments", async (thunkAPI) => {
  const url = BASE_URL + "comments";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); 
  }
})
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    comments: [],
    status: 'idle',
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;  
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});



export default postsSlice.reducer;
