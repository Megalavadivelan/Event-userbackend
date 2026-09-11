const express = require("express");
const router = express.Router();
const {loginuser,getUsers} = require("../controller/LoginController");
router.post("/loginuser", loginuser);
router.get("/getusers", getUsers);
module.exports = router;
