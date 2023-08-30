const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  fetchOrdersByFilter,
  updateOrder,
} = require("../controller/Order");
const router = express.Router();

router
  .post("/", createOrder)
  .get("/user", fetchOrdersByUser)
  .get("/", fetchOrdersByFilter)
  .patch("/:id", updateOrder);

exports.router = router;
