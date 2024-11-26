import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/";

export const getCommentsByPostId = createAsyncThunk("comments/getCommentsByPostId", async (postId,thunkAPI) => {
    const url = BASE_URL + "comments?postId=" + postId;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
})
const commentSlice = createSlice({
    name: 'comments',
    initialState: {
      comments: [],
      status: 'idle',
      error: null
    },    
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCommentsByPostId.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCommentsByPostId.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.comments = action.payload;
        })
        .addCase(getCommentsByPostId.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
    }
    })
export default commentSlice.reducer;