import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  fetchUserDetails,
  fetchUserOrders,
  updateUser,
} from "../Api/userApi";

const initialState = {
  userDetails: "",
  userOrders: [],
  status: "idle",
};

export const fetchCurrentUserAsync = createAsyncThunk(
  "user/fetchCurrentUserAsync",
  async () => {
    const response = await fetchCurrentUser();
    return response.data;
  }
);

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrdersAsync",
  async () => {
    const response = await fetchUserOrders();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUserAsync",
  async (user) => {
    const response = await updateUser(user);
    return response.data;
  }
);

export const fetchUserDetailsAsync = createAsyncThunk(
  "user/fetchUserDetailsAsync",
  async () => {
    const response = await fetchUserDetails();
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetails = action.payload;
      })
      .addCase(fetchUserOrdersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserDetailsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetails = action.payload;
      });
  },
});

export const selectUserDetails = (state) => state.user.userDetails;
export const selectUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
