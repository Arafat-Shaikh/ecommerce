import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  fetchFilteredProducts,
  fetchProductById,
  fetchProductFilters,
  updateProductApi,
} from "../Api/productApi";

const initialState = {
  products: [],
  totalProductCount: null,
  productsForFilter: "",
  status: "idle",
  productById: null,
};

export const fetchFilteredProductsAsync = createAsyncThunk(
  "product/fetchFilteredProductsAsync",
  async ({ pagination, sorting, selectFilters }) => {
    console.log(pagination, sorting, selectFilters);
    const response = await fetchFilteredProducts({
      pagination,
      sorting,
      selectFilters,
    });
    return response;
  }
);

export const fetchProductFiltersAsync = createAsyncThunk(
  "product/fetchProductFiltersAsync",
  async () => {
    const response = await fetchProductFilters();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductByIdAsync",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProductsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.totalProductCount = action.payload.totalCount;
      })
      .addCase(fetchProductFiltersAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductFiltersAsync.fulfilled, (state, action) => {
        state.productsForFilter = action.payload;
        state.status = "Idle";
      })
      .addCase(fetchProductByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.productById = action.payload;
        state.status = "idle";
      });
  },
});

export const selectProducts = (state) => state.product.products;
export const selectTotalProducts = (state) => state.product.totalProductCount;
export const selectProductsForFilter = (state) =>
  state.product.productsForFilter;
export const selectProductById = (state) => state.product.productById;
export default productSlice.reducer;
