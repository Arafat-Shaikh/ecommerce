import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderApi, fetchOrderByUser } from "../Api/orderApi";

const initialState = {
  status: "idle",
  userOrders: [],
  receivedOrderId: null,
};

export const createOrderApiAsync = createAsyncThunk(
  "order/createOrderApiAsync",
  async (order) => {
    const response = await createOrderApi(order);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetReceivedOrderId(state, action) {
      state.receivedOrderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrderApiAsync.fulfilled, (state, action) => {
        state.userOrders.push(action.payload);
        state.receivedOrderId = action.payload.id;
        state.status = "idle";
      })

      .addCase(fetchUserOrdersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectOrders = (state) => state.order.orders;
export const selectUserOrders = (state) => state.order.userOrders;
export const selectReceivedOrder = (state) => state.order.receivedOrderId;
export const { resetReceivedOrderId } = orderSlice.actions;
export default orderSlice.reducer;
