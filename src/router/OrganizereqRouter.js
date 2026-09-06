const express = require("express");

const router = express.Router();

const {
  createOrganizerRequest,
} = require("../controller/OrganizereqController");


router.post(
  "/",
  createOrganizerRequest
);


module.exports = router;