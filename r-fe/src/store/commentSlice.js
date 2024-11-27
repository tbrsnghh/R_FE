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
export const getCmtsLv1 = createAsyncThunk("comments/getCmtsLv1", async (postId, thunkAPI) => {
    const url = BASE_URL + "comments/lv1?postId=" + postId;
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
export const getSubCmts = createAsyncThunk("comments/getSubCmts", async (commentId, thunkAPI) => {
    const url = BASE_URL + "comments/subcmts?commentId=" + commentId;
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
export const createComment = createAsyncThunk("comments/createComment", async (comment,thunkAPI) => {
    const url = BASE_URL + "comments";
    try {
      const response = await axios.post(url, comment, {
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
      subComments: [],
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
        .addCase(createComment.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createComment.fulfilled, (state, action) => {
          state.status = 'succeeded';          
        })
        .addCase(createComment.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(getCmtsLv1.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCmtsLv1.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.comments = action.payload;
        })
        .addCase(getCmtsLv1.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(getSubCmts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getSubCmts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const newSubComments = action.payload;
          const existingSubComments = state.subComments;
          state.subComments = existingSubComments.filter(cmt => !newSubComments.some(ncmt => ncmt.id === cmt.id));
          state.subComments = [...state.subComments, ...newSubComments];
        })
        .addCase(getSubCmts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
    }
    })
export default commentSlice.reducer;