const express = require("express");

const router = express.Router();

const {
  createOrganizerRequest,
  getOrganizerRequests,
  getIndividualOrganizerRequest,
} = require("../controller/OrganizereqController");


// =====================================================
// POST
// =====================================================

router.post(
  "/create",
  createOrganizerRequest
);


// =====================================================
// GET ALL
// =====================================================

router.get(
  "/getrequests",
  getOrganizerRequests
);


// =====================================================
// GET INDIVIDUAL
// =====================================================

router.get(
  "/getrequest/:id",
  getIndividualOrganizerRequest
);


module.exports = router;