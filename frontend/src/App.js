import React, { useEffect } from "react";
import ProductListPage from "./pages/ProductListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductInfoPage from "./pages/ProductInfoPage";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUserAsync } from "./app/Slices/CartSlice";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import {
  selectUserToken,
  verifyUserSessionAsync,
} from "./app/Slices/authSlice";
import ProfilePage from "./pages/ProfilePage";
import UserOrdersPage from "./pages/UserOrdersPage";
import OrderPlaced from "./pages/OrderPlaced";
import AdminProductPage from "./pages/AdminProductPage";
import LogoutPage from "./pages/LogoutPage";
import { fetchAllOrdersAdminApiAsync } from "./app/admin/slices/adminOrderSlice";
import OrderList from "./app/Components/OrderList";
import OrderCheck from "./pages/OrderCheck";
import { StatusContext } from "./app/Context/UseColor";
import { DiscountContext } from "./app/Context/UseDiscount";
import Auth from "./app/auth/Auth";
import AdminAuth from "./app/auth/AdminAuth";

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
    element: (
      <Auth>
        <CartPage />
      </Auth>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Auth>
        <CheckoutPage />
      </Auth>
    ),
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
    element: (
      <Auth>
        <ProfilePage />
      </Auth>
    ),
  },
  {
    path: "/user/orders",
    element: (
      <Auth>
        <UserOrdersPage />
      </Auth>
    ),
  },
  {
    path: "/order/placed",
    element: (
      <Auth>
        <OrderPlaced />
      </Auth>
    ),
  },
  {
    path: "/admin/productList",
    element: (
      <AdminAuth>
        <AdminProductPage />
      </AdminAuth>
    ),
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/order-list/:id",
    element: <OrderList />,
  },
  {
    path: "/order-check",
    element: <OrderCheck />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);

  // useEffect(() => {
  //   dispatch(verifyUserSessionAsync());
  // }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAllOrdersAdminApiAsync());
      dispatch(fetchCartByUserAsync());
    }

    console.log("hello");
  }, [userToken, dispatch]);

  function handleDisplayColor(status) {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-100/60";
      case "Processing":
        return "text-emerald-500 bg-emerald-100/60";
      case "Shipped":
        return "text-blue-500 bg-blue-100/60";
      case "Delivered":
        return "text-purple-500 bg-purple-100/60";
      case "Refunded":
        return "text-gray-500 bg-gray-100/60";
      case "Cancelled":
        return "text-red-500 bg-red-100/60";
    }
  }

  function countDiscount(price, discount) {
    const discountPrice = (price - (price * discount) / 100).toFixed(0);
    return discountPrice;
  }

  return (
    <>
      <StatusContext.Provider value={handleDisplayColor}>
        <DiscountContext.Provider value={countDiscount}>
          <RouterProvider router={router} />
        </DiscountContext.Provider>
      </StatusContext.Provider>
    </>
  );
}

export default App;
