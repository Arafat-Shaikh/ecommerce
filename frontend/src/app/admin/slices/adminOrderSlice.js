import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteOrderApi,
  fetchAllOrdersAdmin,
  fetchUserOrdersByAdmin,
  updateOrderAdmin,
} from "../api/adminOrderApi";

const initialState = {
  allOrders: [],
  userOrders: [],
  status: "idle",
};

export const fetchAllOrdersAdminApiAsync = createAsyncThunk(
  "order/fetchAllOrdersApiAsync",
  async (order) => {
    const response = await fetchAllOrdersAdmin(order);
    return response.data;
  }
);
export const updateOrderAdminAsync = createAsyncThunk(
  "order/updateOrderAdminAsync",
  async (updateOrder) => {
    const response = await updateOrderAdmin(updateOrder);
    return response.data;
  }
);
export const deleteOrderAsync = createAsyncThunk(
  "order/deleteOrderAsync",
  async (orderId) => {
    const response = await deleteOrderApi(orderId);
    return response.data;
  }
);

export const fetchUserOrdersByAdminAsync = createAsyncThunk(
  "order/fetchUserOrdersByAdminAsync",
  async (userId) => {
    const response = await fetchUserOrdersByAdmin(userId);
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  initialState,
  name: "adminOrder",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersAdminApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAdminApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allOrders = action.payload;
      })
      .addCase(updateOrderAdminAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateOrderAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.allOrders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.allOrders.splice(index, 1, action.payload);
      })
      .addCase(deleteOrderAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.allOrders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.allOrders.splice(index, 1);
      })
      .addCase(fetchUserOrdersByAdminAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersByAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectAllOrders = (state) => state.adminOrder.allOrders;
export const selectUserOrderByAdmin = (state) => state.adminOrder.userOrders;
export default adminOrderSlice.reducer;
