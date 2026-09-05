const express = require("express");
const router = express.Router();
const { loginuser } = require("../controller/LoginController");
router.post("/loginuser",loginuser );
module.exports = router;