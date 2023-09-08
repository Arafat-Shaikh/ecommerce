const express = require("express");
const { updateUser, deleteUser, fetchUserById } = require("../controller/User");
const router = express.Router();

router
  .patch("/", updateUser)
  .delete("/", deleteUser)
  .get("/info", fetchUserById);

exports.router = router;
