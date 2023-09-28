import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  updateProductApi,
} from "../api/adminProductApi";

const initialState = {
  products: [],
  totalProductCount: null,
  status: "idle",
};

export const createProductApiAsync = createAsyncThunk(
  "product/createProductApiAsync",
  async (product) => {
    const response = await createProductApi(product);
    return response.data;
  }
);

export const deleteProductApiAsync = createAsyncThunk(
  "product/deleteProductApiAsync",
  async (product) => {
    const response = await deleteProductApi(product);
    return response.data;
  }
);

export const updateProductApiAsync = createAsyncThunk(
  "product/updateProductApiAsync",
  async () => {
    const response = await updateProductApi();
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createProductApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createProductApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(deleteProductApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProductApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products.splice(index, 1);
      })
      .addCase(updateProductApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProductApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products.splice(index, 1, action.payload);
      });
  },
});

export const selectAdminProduct = (state) => state.adminProduct.products;
export default adminProductSlice.reducer;
