const express = require("express");
const {
  updateUser,
  deleteUser,
  fetchUserById,
  fetchAllUsersInfo,
} = require("../controller/User");
const router = express.Router();

router
  .patch("/", updateUser)
  .delete("/", deleteUser)
  .get("/info", fetchUserById)
  .get("/", fetchAllUsersInfo);

exports.router = router;
