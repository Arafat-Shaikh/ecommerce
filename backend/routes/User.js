const express = require("express");
const { updateUser, deleteUser } = require("../controller/User");
const router = express.Router();

router.patch("/", updateUser).delete("/", deleteUser);

exports.router = router;
