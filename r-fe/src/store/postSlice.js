import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/'

export const getLasestPosts = createAsyncThunk(
  "posts/getLasestPosts",
  async (thunkAPI) => { // Receive token as an argument
    const url = `${BASE_URL}posts/latest?page=${0}&size=${15}`;
    const token = localStorage.getItem('authToken'); 
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}` // Add token to Authorization header
        }
      });
      return response.data; // Assuming the API returns an object or array
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch latest posts"
      );
    }
  }
);

export const getPostImageName = createAsyncThunk(
  "posts/getPostImageName",
  async (id, thunkAPI) => {
      const url = `${BASE_URL}posts/${id}`;
      try {
          const response = await axios.get(url, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}` // Add token to Authorization header
              }
          });
          return { id, imageUrls: response.data.data.imageUrls.map(url => url.replace(/^uploads\\/, "")) }; // Return post ID and image URLs
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch post images");
      }
  }
);

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
    postImageNames: [],
    status: 'idle',
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLasestPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLasestPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.data.content;
      })
      .addCase(getLasestPosts.rejected, (state, action) => {
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
      .addCase(getPostImageName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostImageName.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.postImageNames.push(action.payload);
      })
      .addCase(getPostImageName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});



export default postsSlice.reducer;
