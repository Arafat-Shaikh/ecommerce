const express = require("express");
const { signupUser, loginUser, checkUser } = require("../controller/Auth");
const passport = require("passport");
const router = express.Router();

router
  .post("/signup", signupUser)

  .post("/login", passport.authenticate("local"), loginUser) // added passport authentication to use local strategy.
  .get("/check", passport.authenticate("jwt"), checkUser); // added passport authentication to use jwt strategy.

exports.router = router;
