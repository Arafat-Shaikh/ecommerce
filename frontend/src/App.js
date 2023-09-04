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
import Checkout from "./pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/products",
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
    element: <Checkout />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartByUserAsync());
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
