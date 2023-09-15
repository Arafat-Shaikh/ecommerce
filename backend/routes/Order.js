const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  fetchOrdersByFilter,
  updateOrder,
  deleteOrder,
} = require("../controller/Order");
const router = express.Router();

router
  .post("/", createOrder)
  .get("/user", fetchOrdersByUser)
  .get("/", fetchOrdersByFilter)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
