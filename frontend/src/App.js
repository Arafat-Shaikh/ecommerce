import React from "react";
import Product from "./app/Components/Products";
import Navbar from "./app/navbar/Navbar";
import ProductListPage from "./pages/ProductListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductListPage />,
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
