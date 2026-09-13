const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getIndividualBooking,
  getUserBookings,
} = require(
  "../controller/BookTicketController"
);

// =====================================================
// CREATE BOOKING
// POST /booking/create
// =====================================================

router.post(
  "/create",
  createBooking
);

// =====================================================
// GET ALL BOOKINGS
// GET /booking/getbookings
// =====================================================

router.get(
  "/getbookings",
  getBookings
);

// =====================================================
// GET ONE BOOKING
// GET /booking/getbooking/:id
// =====================================================

router.get(
  "/getbooking/:id",
  getIndividualBooking
);

// =====================================================
// GET USER BOOKINGS
// GET /booking/user/:userId
// =====================================================

router.get(
  "/user/:userId",
  getUserBookings
);

module.exports = router;