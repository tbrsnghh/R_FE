import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/";

export const votePost = createAsyncThunk(
  "vote/votePost",
  async ({ voteType, postId }, thunkAPI) => {
    const url = BASE_URL + "votes";
    try {
      // POST request with correct request body and headers
      const response = await axios.post(
        url,
        { voteType, postId }, // Request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Correct placement for headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    data: null,
    error: null,
    state: 'idle', // idle | loading | succeeded | failed
  },
  extraReducers: (builder) => {
    builder
      .addCase(votePost.pending, (state) => {
        state.state = 'loading';
        state.error = null;
      })
      .addCase(votePost.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.data = action.payload;
      })
      .addCase(votePost.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.payload;
      });
  },
});

export default voteSlice.reducer;
