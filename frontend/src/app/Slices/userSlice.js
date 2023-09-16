import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  fetchAllUsers,
  fetchCurrentUser,
  fetchUserDetails,
  fetchUserOrders,
  updateUser,
} from "../Api/userApi";

const initialState = {
  userDetails: "",
  userOrders: [],
  status: "idle",
  allUsers: [],
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

export const fetchAllUsersAsync = createAsyncThunk(
  "user/fetchAllUsersAsync",
  async () => {
    const response = await fetchAllUsers();
    console.log(response.data);
    return response.data;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (user) => {
    const response = await deleteUser(user);
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
        if (action.payload.id) {
          state.userDetails = action.payload;
        } else {
          let role = action.payload.role;
          let email = action.payload.email;
          const updatedUser = state.allUsers.find((u) => u.email === email);
          updatedUser.email = email;
          updatedUser.role = role;
          const index = state.allUsers.findIndex((u) => u.email === email);
          state.allUsers.splice(index, 1, updatedUser);
        }
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
      })
      .addCase(fetchAllUsersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = action.payload;
      })
      .addCase(deleteUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.id) {
          state.userDetails = "";
        } else {
          let email = action.payload.email;
          const index = state.allUsers.findIndex(
            (user) => user.email === email
          );
          state.allUsers.splice(index, 1);
        }
      });
  },
});

export const selectUserDetails = (state) => state.user.userDetails;
export const selectUserOrders = (state) => state.user.userOrders;
export const selectAllUser = (state) => state.user.allUsers;
export default userSlice.reducer;
