import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  adminUpdateUser,
  adminDeleteUser,
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

export const adminUpdateUserAsync = createAsyncThunk(
  "user/adminUpdateUserAsync",
  async (singleUser) => {
    const response = await adminUpdateUser(singleUser);
    console.log(response.data);
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

export const adminDeleteUserAsync = createAsyncThunk(
  "users/adminDeleteUserAsync",
  async (userId) => {
    const response = await adminDeleteUser(userId);
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
      .addCase(adminUpdateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminUpdateUserAsync.fulfilled, (state, action) => {
        const index = state.allUsers.findIndex(
          (u) => u.id === action.payload.id
        );
        state.allUsers.splice(index, 1, action.payload);
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

export const selectUserDetails = (state) => state.user.userDetails;
export const selectUserOrders = (state) => state.user.userOrders;
export const selectAllUser = (state) => state.user.allUsers;
export default userSlice.reducer;
