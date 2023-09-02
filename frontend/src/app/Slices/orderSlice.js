import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrderApi,
  deleteOrderApi,
  fetchAllOrdersAdmin,
  fetchOrderByUser,
  updateOrderAdmin,
} from "../Api/orderApi";

const initialState = {
  orders: [],
  status: "idle",
};

export const createOrderApiAsync = createAsyncThunk(
  "order/createOrderApiAsync",
  async (order) => {
    const response = await createOrderApi(order);
    return response.data;
  }
);

export const fetchAllOrdersAdminApiAsync = createAsyncThunk(
  "order/fetchAllOrdersApiAsync",
  async (order) => {
    const response = await fetchAllOrdersAdmin(order);
    return response.data;
  }
);

export const fetchUserOrdersAsync = createAsyncThunk(
  "order/fetchUserOrdersAsync",
  async () => {
    const response = await fetchOrderByUser();
    return response.data;
  }
);

export const updateOrderAdminAsync = createAsyncThunk(
  "order/updateOrderAdminAsync",
  async () => {
    const response = await updateOrderAdmin();
    return response.data;
  }
);

export const deleteOrderAsync = createAsyncThunk(
  "order/deleteOrderAsync",
  async () => {
    const response = await deleteOrderApi();
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrderApiAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.status = "idle";
      })
      .addCase(fetchAllOrdersAdminApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAdminApiAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "idle";
      })
      .addCase(updateOrderAdminAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateOrderAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders.splice(index, 1, action.payload.id);
      })
      .addCase(deleteOrderAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders.splice(index, 1);
      });
  },
});

export const selectOrders = (state) => state.order.orders;
export default orderSlice.reducer;
