const express = require("express");
const {
  updateUser,
  deleteUser,
  fetchUserById,
  fetchAllUsersInfo,
  updateAdminUser,
  adminDeleteUser,
} = require("../controller/User");
const router = express.Router();

router
  .patch("/", updateUser)
  .get("/info", fetchUserById)
  .get("/", fetchAllUsersInfo)
  .patch("/admin", updateAdminUser)
  .delete("/admin/", adminDeleteUser);

exports.router = router;
