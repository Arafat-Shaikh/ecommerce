import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adminDeleteUser,
  adminUpdateUser,
  fetchAllUsers,
} from "../api/adminUserApi";

const initialState = {
  allUsers: [],
  status: "idle",
};

export const adminUpdateUserAsync = createAsyncThunk(
  "user/adminUpdateUserAsync",
  async (singleUser) => {
    const response = await adminUpdateUser(singleUser);
    console.log(response.data);
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

export const adminDeleteUserAsync = createAsyncThunk(
  "users/adminDeleteUserAsync",
  async (userId) => {
    const response = await adminDeleteUser(userId);
    return response.data;
  }
);

const adminUserSlice = createSlice({
  initialState,
  name: "adminUser",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminUpdateUserAsync.fulfilled, (state, action) => {
        const index = state.allUsers.findIndex(
          (u) => u.id === action.payload.id
        );
        state.allUsers.splice(index, 1, action.payload);
      })
      .addCase(fetchAllUsersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = action.payload;
      })
      .addCase(adminDeleteUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminDeleteUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        let id = action.payload.id;
        const index = state.allUsers.findIndex((user) => user.id === id);
        state.allUsers.splice(index, 1);
      });
  },
});

export const selectAllUser = (state) => state.adminUser.allUsers;
export default adminUserSlice.reducer;
