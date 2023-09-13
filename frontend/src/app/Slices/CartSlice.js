import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCartApi,
  deleteCartItemApi,
  emptyCart,
  fetchCartByUser,
  updateCartItem,
} from "../Api/cartApi";

const initialState = {
  cartProducts: [],
  status: "idle",
};

export const addToCartApiAsync = createAsyncThunk(
  "cart/addToCartApiAsync",
  async (product) => {
    const response = await addToCartApi(product);
    console.log(response.data);
    return response.data;
  }
);

export const fetchCartByUserAsync = createAsyncThunk(
  "cart/fetchCartByUserAsync",
  async () => {
    console.log("request sent");
    const response = await fetchCartByUser();
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartAsync",
  async (item) => {
    const response = await updateCartItem(item);
    return response.data;
  }
);

export const deleteItemApiAsync = createAsyncThunk(
  "cart/deleteItemApiAsync",
  async (itemId) => {
    const response = await deleteCartItemApi(itemId);
    return response.data;
  }
);

export const emptyCartAsync = createAsyncThunk(
  "cart/emptyCartAsync",
  async () => {
    const response = await emptyCart();
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addToCartApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartProducts.push(action.payload);
      })
      .addCase(fetchCartByUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartProducts = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartProducts.findIndex(
          (p) => p.id === action.payload.id
        );
        state.cartProducts.splice(index, 1, action.payload);
      })
      .addCase(deleteItemApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteItemApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartProducts.findIndex(
          (p) => p.id === action.payload.id
        );
        state.cartProducts.splice(index, 1);
      })
      .addCase(emptyCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(emptyCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartProducts = [];
      });
  },
});

export const selectCart = (state) => state.cart.cartProducts;
export default cartSlice.reducer;
