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


// POST

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, thunkAPI) => {
    const url = BASE_URL + "posts"; 
    try {
      const response = await axios.post(url, post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  })

  export const uploadsImage = createAsyncThunk(
    "posts/uploadsImage",
    async ({ images, id }, thunkAPI) => {
      const url = `${BASE_URL}posts/${id}/images`;
      const formData = new FormData();
  
      // Append each image file to formData
      images.forEach((image, index) => {
        formData.append('files', image); // Use the same key name for all images
      });
  
      try {
        const response = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to upload images"
        );
      }
    }
  );
  
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
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadsImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadsImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(uploadsImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});



export default postsSlice.reducer;
