const Booking = require("../model/BookingsModel");

// =====================================================
// CREATE BOOKING
// =====================================================

const createBooking = async (bookingData) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      eventId,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      ticketPrice,
      ticketsCount,
    } = bookingData;

    // ---------------------------------------------
    // CHECK DUPLICATE BOOKING
    // ---------------------------------------------

    const existingBooking = await Booking.findOne({
      userId,
      eventId,
      status: "Confirmed",
    });

    if (existingBooking) {
      return {
        success: false,
        message: "You have already booked this event.",
      };
    }

    // ---------------------------------------------
    // CALCULATE TOTAL
    // ---------------------------------------------

    const price = Number(ticketPrice) || 0;
    const count = Number(ticketsCount) || 1;

    const totalAmount = price * count;

    // ---------------------------------------------
    // CREATE BOOKING
    // ---------------------------------------------

    const booking = new Booking({
      userId,
      userName,
      userEmail,
      eventId,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      ticketPrice: price,
      ticketsCount: count,
      totalAmount,
    });

    const savedBooking = await booking.save();

    return {
      success: true,
      message: "Event booked successfully.",
      booking: savedBooking,
    };
  } catch (error) {
    console.error("CREATE BOOKING SERVICE ERROR:", error);

    return {
      success: false,
      message: "Failed to create booking.",
      error: error.message,
    };
  }
};

// =====================================================
// GET MY BOOKINGS
// =====================================================

const getMyBookings = async (userId) => {
  try {
    const bookings = await Booking.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return {
      success: true,
      count: bookings.length,
      bookings,
    };
  } catch (error) {
    console.error("GET MY BOOKINGS ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    };
  }
};

// =====================================================
// CANCEL BOOKING
// =====================================================

const cancelBooking = async (bookingId, userId) => {
  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      userId,
    });

    if (!booking) {
      return {
        success: false,
        message: "Booking not found.",
      };
    }

    if (booking.status === "Cancelled") {
      return {
        success: false,
        message: "Booking is already cancelled.",
      };
    }

    booking.status = "Cancelled";

    await booking.save();

    return {
      success: true,
      message: "Booking cancelled successfully.",
      booking,
    };
  } catch (error) {
    console.error("CANCEL BOOKING ERROR:", error);

    return {
      success: false,
      message: "Failed to cancel booking.",
      error: error.message,
    };
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};