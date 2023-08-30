const express = require("express");
const {
  addToCart,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
} = require("../controller/Cart");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", getCartByUserId)
  .patch("/:id", updateCartItem)
  .delete("/:id", deleteCartItem);

exports.router = router;
