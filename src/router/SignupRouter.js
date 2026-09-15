const express = require("express");

const router = express.Router();

const {
  signupuser,
  getSignupUsers,
} = require("../controller/SignupController");

// CREATE SIGNUP
router.post("/create", signupuser);

// GET ALL SIGNUP USERS
router.get("/get", getSignupUsers);

module.exports = router;