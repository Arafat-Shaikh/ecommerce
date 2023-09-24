import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  signupUser,
  verifyUserSession,
} from "../Api/authApi";

const initialState = {
  userToken: "",
  status: "idle",
  errorMessage: "",
};

export const signupUserAuth = createAsyncThunk(
  "auth/signupUserAuth",
  async (user, thunkAPI) => {
    try {
      const response = await signupUser(user);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const loginUserAuth = createAsyncThunk(
  "auth/loginUserAuth",
  async (user, thunkAPI) => {
    try {
      const response = await loginUser(user);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUserAsync",
  async () => {
    try {
      const response = await logoutUser();
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const verifyUserSessionAsync = createAsyncThunk(
  "auth/verifyUserSessionAsync",
  async (thunkAPI) => {
    try {
      const response = await verifyUserSession();
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUserAuth.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signupUserAuth.fulfilled, (state, action) => {
        state.status = "idle";
        state.userToken = action.payload;
      })
      .addCase(signupUserAuth.rejected, (state, action) => {
        state.status = "idle";
        state.errorMessage = action.payload;
      })
      .addCase(loginUserAuth.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserAuth.fulfilled, (state, action) => {
        state.status = "idle";
        state.userToken = action.payload;
      })
      .addCase(loginUserAuth.rejected, (state, action) => {
        state.status = "idle";
        state.errorMessage = action.payload;
      })
      .addCase(logoutUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userToken = "";
      })
      .addCase(verifyUserSessionAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(verifyUserSessionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userToken = action.payload;
      })
      .addCase(verifyUserSessionAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errorMessage = action.payload;
      });
  },
});

export const selectUserToken = (state) => state.auth.userToken;
export default authSlice.reducer;
