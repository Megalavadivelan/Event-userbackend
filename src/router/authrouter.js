const express = require("express");

const router = express.Router();

const {
  signup,
  selectRole,
  login,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authmiddleware");


// Signup
router.post("/signup", signup);


// Role selection
router.put(
  "/select-role",
  authMiddleware,
  selectRole
);


// Login
router.post("/login", login);


module.exports = router;