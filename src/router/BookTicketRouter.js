const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getIndividualBooking,
  getUserBookings,
} = require("../controller/BookTicketController");

// =====================================================
// CREATE BOOKING
// =====================================================

router.post(
  "/create",
  createBooking
);

// =====================================================
// GET ALL BOOKINGS
// =====================================================

router.get(
  "/getbookings",
  getBookings
);

// =====================================================
// GET INDIVIDUAL BOOKING
// =====================================================

router.get(
  "/getbooking/:id",
  getIndividualBooking
);

// =====================================================
// GET BOOKINGS OF ONE USER
// =====================================================

router.get(
  "/user/:userId",
  getUserBookings
);

module.exports = router;