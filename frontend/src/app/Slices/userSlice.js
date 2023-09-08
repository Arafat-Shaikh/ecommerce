import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser, fetchUserOrders, updateUser } from "../Api/userApi";

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
        state.status = "loading";
        state.user = action.payload;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "loading";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrdersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "loading";
        state.userOrders = action.payload;
      });
  },
});

export const selectUser = (state) => state.user.userDetails;
export const selectUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
