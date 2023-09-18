import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import cartReducer from "./Slices/CartSlice";
import orderReducer from "./Slices/orderSlice";
import userReducer from "./Slices/userSlice";
import authReducer from "./Slices/authSlice";
import adminOrderReducer from "./admin/slices/adminOrderSlice";
import adminUserReducer from "./admin/slices/adminUserSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    auth: authReducer,
    adminOrder: adminOrderReducer,
    adminUser: adminUserReducer,
  },
});
