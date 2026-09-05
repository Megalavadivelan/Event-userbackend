const express = require("express");
const router = express.Router();
const { signupuser } = require("../controller/SignupController");
router.post("/create", signupuser);
module.exports = router;