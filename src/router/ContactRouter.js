const express = require("express");

const router = express.Router();

const {
  sendContactMessage,getContacts,
} = require("../controller/ContactController");

router.post(
  "/send",
  sendContactMessage
);

router.get("/getcontacts", getContacts);

module.exports = router;