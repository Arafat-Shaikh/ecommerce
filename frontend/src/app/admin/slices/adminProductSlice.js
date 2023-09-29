import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductApi, deleteProductApi } from "../api/adminProductApi";

const initialState = {
  products: [],
  totalProductCount: null,
  status: "idle",
};

export const deleteProductApiAsync = createAsyncThunk(
  "product/deleteProductApiAsync",
  async (product) => {
    const response = await deleteProductApi(product);
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(deleteProductApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProductApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products.splice(index, 1);
      });
  },
});

export const selectAdminProduct = (state) => state.adminProduct.products;
export default adminProductSlice.reducer;
