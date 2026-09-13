const BookTicketModel = require("../model/BookTicketModel");

// =====================================================
// CREATE BOOKING
// =====================================================

const createBookingData = async (body) => {
  try {
    const {
      userId,
      userName,
      userEmail,

      eventId,
      eventName,
      eventDate,

      ticketPrice,
      numberOfTickets,

      attendees,
    } = body;

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (
      !userId ||
      !userName ||
      !userEmail ||
      !eventId ||
      !eventName ||
      numberOfTickets === undefined ||
      !attendees
    ) {
      return {
        success: false,
        message:
          "Required booking details are missing",
      };
    }

    // =================================================
    // TICKET COUNT VALIDATION
    // =================================================

    const ticketCount =
      Number(numberOfTickets);

    if (
      !Number.isInteger(ticketCount) ||
      ticketCount < 1 ||
      ticketCount > 4
    ) {
      return {
        success: false,
        message:
          "You can book maximum 4 tickets",
      };
    }

    // =================================================
    // ATTENDEE VALIDATION
    // =================================================

    if (
      !Array.isArray(attendees) ||
      attendees.length !== ticketCount
    ) {
      return {
        success: false,
        message:
          "Attendee details must match the number of tickets",
      };
    }

    // =================================================
    // EACH ATTENDEE VALIDATION
    // =================================================

    for (const attendee of attendees) {
      if (
        !attendee.name ||
        !attendee.email ||
        !attendee.phone
      ) {
        return {
          success: false,
          message:
            "Name, email and phone are required for every attendee",
        };
      }
    }

    // =================================================
    // PRICE
    // =================================================

    const price =
      Number(ticketPrice) || 0;

    const totalAmount =
      price * ticketCount;

    // =================================================
    // CREATE BOOKING
    // =================================================

    const booking =
      await BookTicketModel.create({
        userId,

        userName,

        userEmail,

        eventId,

        eventName,

        eventDate: eventDate
          ? new Date(eventDate)
          : undefined,

        ticketPrice: price,

        numberOfTickets:
          ticketCount,

        attendees,

        totalAmount,
      });

    // =================================================
    // SUCCESS RESPONSE
    // =================================================

    return {
      success: true,

      message:
        "Ticket booked successfully",

      booking,
    };
  } catch (error) {
    console.error(
      "BOOKING SERVICE ERROR:",
      error
    );

    return {
      success: false,
      message: error.message,
    };
  }
};

// =====================================================
// GET ALL BOOKINGS
// =====================================================

const getBookingsData = async () => {
  try {
    const bookings =
      await BookTicketModel.find({})
        .sort({ createdAt: -1 })
        .lean();

    return {
      success: true,

      message:
        "Bookings fetched successfully",

      bookings,
    };
  } catch (error) {
    console.error(
      "GET BOOKINGS ERROR:",
      error
    );

    return {
      success: false,
      message: error.message,
    };
  }
};

// =====================================================
// GET INDIVIDUAL BOOKING
// =====================================================

const getIndividualBookingData =
  async (id) => {
    try {
      const booking =
        await BookTicketModel.findById(id)
          .lean();

      if (!booking) {
        return {
          success: false,
          message:
            "Booking not found",
        };
      }

      return {
        success: true,

        message:
          "Booking fetched successfully",

        booking,
      };
    } catch (error) {
      console.error(
        "GET INDIVIDUAL BOOKING ERROR:",
        error
      );

      return {
        success: false,
        message: error.message,
      };
    }
  };

// =====================================================
// GET BOOKINGS OF ONE USER
// =====================================================

const getUserBookingsData =
  async (userId) => {
    try {
      const bookings =
        await BookTicketModel.find({
          userId,
        })
          .sort({ createdAt: -1 })
          .lean();

      return {
        success: true,

        message:
          "User bookings fetched successfully",

        bookings,
      };
    } catch (error) {
      console.error(
        "GET USER BOOKINGS ERROR:",
        error
      );

      return {
        success: false,
        message: error.message,
      };
    }
  };

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createBookingData,

  getBookingsData,

  getIndividualBookingData,

  getUserBookingsData,
};