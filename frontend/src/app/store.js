import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import cartReducer from "./Slices/CartSlice";
import orderReducer from "./Slices/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
