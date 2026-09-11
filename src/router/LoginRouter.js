const express = require("express");
const router = express.Router();
const {loginuser,getUsers, getIndividualUser} = require("../controller/LoginController");
router.post("/loginuser", loginuser);
router.get("/getusers", getUsers);
router.get("/getuser/:id", getIndividualUser);
module.exports = router;
