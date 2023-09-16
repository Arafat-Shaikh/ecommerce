import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signupUser } from "../Api/authApi";

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
    const response = await logoutUser();
    return response.data;
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
      });
  },
});

export const selectUserToken = (state) => state.auth.userToken;
export default authSlice.reducer;
