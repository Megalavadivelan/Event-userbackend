const express = require("express");

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../service/BookingsService");

// =====================================================
// CREATE BOOKING
// POST /bookings/create
// =====================================================

router.post("/create", async (req, res) => {
  try {
    const result = await createBooking(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("CREATE BOOKING ROUTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// =====================================================
// GET MY BOOKINGS
// GET /bookings/my-bookings
// =====================================================

router.get("/my-bookings", async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required.",
      });
    }

    const result = await getMyBookings(userId);

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("MY BOOKINGS ROUTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// =====================================================
// CANCEL BOOKING
// PATCH /bookings/cancel/:id
// =====================================================

router.patch("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required.",
      });
    }

    const result = await cancelBooking(id, userId);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("CANCEL BOOKING ROUTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;