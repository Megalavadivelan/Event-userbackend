const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");
router.post("/login",AdminController.adminLogin);
module.exports = router;