import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import cartReducer from "./Slices/CartSlice";
import orderReducer from "./Slices/orderSlice";
import userReducer from "./Slices/userSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    auth: authReducer,
  },
});
