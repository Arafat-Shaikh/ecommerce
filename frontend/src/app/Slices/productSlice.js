import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../Api/productApi";

const initialState = {
  products: "",
  status: "idle",
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const selectProducts = (state) => state.product.products;
export default productSlice.reducer;
