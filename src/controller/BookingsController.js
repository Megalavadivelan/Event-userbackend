const Booking = require("../model/BookingsModel");

// ==========================================
// GET MY BOOKINGS
// ==========================================

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const bookings = await Booking.find({
      userId: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings: bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE BOOKING
// ==========================================

const createBooking = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const {
      eventId,
      eventName,
      eventDate,
      eventTime,
      location,
      ticketPrice,
      quantity,
    } = req.body;

    if (!eventId || !eventName || !eventDate) {
      return res.status(400).json({
        success: false,
        message: "Event details are required",
      });
    }

    const ticketCount = Number(quantity) || 1;
    const price = Number(ticketPrice) || 0;

    const booking = await Booking.create({
      userId,
      eventId,
      eventName,
      eventDate,
      eventTime,
      location,
      ticketPrice: price,
      quantity: ticketCount,
      totalAmount: price * ticketCount,
      status: "Confirmed",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

module.exports = {
  getMyBookings,
  createBooking,
};