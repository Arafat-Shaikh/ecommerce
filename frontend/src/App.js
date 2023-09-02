import React from "react";
import Product from "./app/Components/Products";
import Navbar from "./app/navbar/Navbar";
import ProductListPage from "./pages/ProductListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductInfo from "./app/Components/ProductInfo";
import ProductInfoPage from "./pages/ProductInfoPage";
import CartPage from "./pages/CartPage";

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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
