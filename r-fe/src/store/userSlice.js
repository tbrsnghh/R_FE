import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/"; // Thay URL backend của bạn

export const signup = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, { username, email, password });
      return response.data; // Trả dữ liệu user khi đăng ký thành cong
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to sign up"
      );
    }
  }
);

// Async Thunk để xử lý đăng nhập
export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, { username, password });
      const { authenticationToken, refreshToken, expiresAt, username: user } = response.data;

      localStorage.setItem("authToken", authenticationToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiresAt", expiresAt);

      return response.data; // Trả dữ liệu user khi đăng nhập thành công
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);
// Async Thunk để làm mới token
export const refreshAccessToken = createAsyncThunk(
  "user/refreshToken",
  async (username, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // Lấy refresh token từ localStorage
      
      if (!refreshToken) throw new Error("Refresh token is missing!");

      const response = await axios.post(`${BASE_URL}auth/refresh/token`, { refreshToken, username });
      const { authenticationToken, refreshToken: newRefreshToken, expiresAt } = response.data;

      // Lưu token mới vào localStorage
      localStorage.setItem("authToken", authenticationToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("expiresAt", expiresAt);

      return response.data; // Trả về token mới
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (username, thunkAPI) => {
    const url = `${BASE_URL}auth/userinfo`;
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
  }
)
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${BASE_URL}auth/profilePicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      // Update user profile picture if necessary
      thunkAPI.dispatch(getUserInfo());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload profile picture"
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,     // Thông tin người dùng
    loading: false,     // Trạng thái loading
    error: null,        // Lỗi nếu đăng nhập thất bại
    state: 'idle'
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiresAt");
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Lưu thông tin user khi đăng nhập thành công
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi khi đăng nhập thất bại
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.authenticationToken; // Cập nhật token mới
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.username;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.state = 'loading';
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.userInfo = action.payload.data;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.state = 'loading';
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.state = 'succeeded';
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
