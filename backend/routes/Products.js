const express = require("express");
const {
  createNewProduct,
  fetchFilteredProducts,
  fetchProductById,
  fetchAllProducts,
} = require("../controller/Product");
const router = express.Router();

router
  .get("/", fetchFilteredProducts)
  .post("/", createNewProduct)
  .get("/product/:id", fetchProductById)
  .get("/filter", fetchAllProducts);

exports.router = router;
