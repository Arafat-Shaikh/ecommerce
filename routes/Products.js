const express = require("express");
const {
  createNewProduct,
  fetchFilteredProducts,
  fetchProductById,
} = require("../controller/Product");
const router = express.Router();

router
  .get("/", fetchFilteredProducts)
  .post("/", createNewProduct)
  .get("/:id", fetchProductById);

exports.router = router;
