const express = require("express");

const router = express.Router();

const {
  logoutUser,
  getLoginHistory,
} = require("../controller/LoginHistoryController");

router.post("/logout", logoutUser);

router.get("/history", getLoginHistory);

module.exports = router;