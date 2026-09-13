const express = require("express");

const router = express.Router();

const {
  sendContactMessage,getContacts,getIndividualContact,
} = require("../controller/ContactController");

router.post(
  "/send",
  sendContactMessage
);

router.get("/getcontacts", getContacts);

router.get(
  "/getcontact/:id",
  getIndividualContact
);

module.exports = router;