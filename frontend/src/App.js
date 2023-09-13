import React, { useEffect } from "react";
import Product from "./app/Components/Products";
import Navbar from "./app/navbar/Navbar";
import ProductListPage from "./pages/ProductListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductInfo from "./app/Components/ProductInfo";
import ProductInfoPage from "./pages/ProductInfoPage";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUserAsync, selectCart } from "./app/Slices/CartSlice";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { selectUserToken } from "./app/Slices/authSlice";
import ProfilePage from "./pages/ProfilePage";
import UserOrdersPage from "./pages/UserOrdersPage";
import {
  fetchCurrentUserAsync,
  fetchUserDetailsAsync,
} from "./app/Slices/userSlice";
import OrderPlaced from "./pages/OrderPlaced";
import AdminProductPage from "./pages/AdminProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListPage />,
  },
  {
    path: "/product/detail/:id",
    element: <ProductInfoPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/user/orders",
    element: <UserOrdersPage />,
  },
  {
    path: "/order/placed",
    element: <OrderPlaced />,
  },
  {
    path: "/admin/productList",
    element: <AdminProductPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);

  useEffect(() => {
    dispatch(fetchCartByUserAsync());

    console.log("hello");
    console.log(userToken);
  }, [dispatch, userToken]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
