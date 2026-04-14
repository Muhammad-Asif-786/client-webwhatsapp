import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";

// Jab user login karega aur aap dispatch(fetchUserDetails()) call karoge:
// Ye backend API ko call karega aur user ka profile data le aayega.
// Jo JSON backend se aayega (jaise _id, name, email, mobile, etc.) wo Redux store yani (store.js) (state.user) me save ho jayega


// Fetch user profile/details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios({ ...SummaryApi.userDetails });
      return response.data.data; // only for user profile
    } catch (error) {
      return rejectWithValue(error.message || 'Fetching user data failed');
    }
  },
);

// Login user and get tokens
export const userLogin = createAsyncThunk(
  'user/userLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios({ ...SummaryApi.login, data });
      // return only tokens
      return {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      )
    }
  },
);

// Send Login OTP
export const sendLoginOtp = createAsyncThunk(
  "user/sendLoginOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.sendLoginOtp,
        data: { email },
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.message || "Sending OTP failed");
    }
  }
);

// Verify Login OTP
export const verifyLoginOtp = createAsyncThunk(
  "user/verifyLoginOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await Axios({
        ...SummaryApi.verifyLoginOtp,
        data: { email, otp },
      });

      return {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };
    } catch (error) {
      return rejectWithValue(error.message || "OTP verification failed");
    }
  }
);

// Update profile with file support
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ name, status, avatarFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (status) formData.append("status", status);
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await Axios({
        ...SummaryApi.updateProfile,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);



const initialState = {
        accessToken: null,
        refreshToken: null,
        _id: '',
        mobile: "",
        phoneSuffix: "+92",
        email: "",
        name: "",
        avatar: "",
        status: "",
        isVerified: false,
        lastLoginDate: null,
        lastSeen: null,
        isOnline: false,
        agreed: false,
        createdAt: null,
        updatedAt: null,
        isLoggedIn: false, // login status
        loading: false,
        error: null,
  };


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // 1 - fetch user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload); // merge user data
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // 2 - user login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // SEND OTP (otp base login)
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY OTP (otp base login)
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;