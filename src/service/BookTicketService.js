const mongoose = require("mongoose");

const BookTicketModel = require(
  "../model/BookTicketModel"
);

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
      eventTime,
      eventLocation,
      eventCategory,

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
        message: "Required booking details are missing.",
      };
    }

    // =================================================
    // VALIDATE USER ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        success: false,
        message: "Invalid user ID.",
      };
    }

    // =================================================
    // VALIDATE EVENT ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return {
        success: false,
        message: "Invalid event ID.",
      };
    }

    // =================================================
    // TICKET COUNT
    // =================================================

    const ticketCount = Number(numberOfTickets);

    if (
      !Number.isInteger(ticketCount) ||
      ticketCount < 1 ||
      ticketCount > 4
    ) {
      return {
        success: false,
        message: "You can book maximum 4 tickets.",
      };
    }

    // =================================================
    // ATTENDEE ARRAY
    // =================================================

    if (
      !Array.isArray(attendees) ||
      attendees.length !== ticketCount
    ) {
      return {
        success: false,
        message:
          "Attendee details must match the number of tickets.",
      };
    }

    // =================================================
    // VALIDATE EACH ATTENDEE
    // =================================================

    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];

      if (
        !attendee ||
        !attendee.name ||
        !attendee.email ||
        !attendee.phone
      ) {
        return {
          success: false,
          message:
            `Name, email and phone are required for attendee ${
              i + 1
            }.`,
        };
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(attendee.email)) {
        return {
          success: false,
          message:
            `Invalid email for attendee ${i + 1}.`,
        };
      }

      const phonePattern = /^[6-9]\d{9}$/;

      if (!phonePattern.test(attendee.phone)) {
        return {
          success: false,
          message:
            `Invalid phone number for attendee ${
              i + 1
            }.`,
        };
      }
    }

    // =================================================
    // PRICE
    // =================================================

    const price = Number(ticketPrice) || 0;

    if (price < 0) {
      return {
        success: false,
        message: "Invalid ticket price.",
      };
    }

    // =================================================
    // TOTAL AMOUNT
    // =================================================

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

        eventTime:
          eventTime || "",

        eventLocation:
          eventLocation || "",

        eventCategory:
          eventCategory || "Event",

        ticketPrice: price,

        numberOfTickets:
          ticketCount,

        attendees,

        totalAmount,

        status: "Confirmed",
      });

    // =================================================
    // SUCCESS
    // =================================================

    return {
      success: true,
      message: "Ticket booked successfully.",
      booking,
    };
  } catch (error) {
    console.error(
      "CREATE BOOKING ERROR:",
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
        .sort({
          createdAt: -1,
        })
        .lean();

    return {
      success: true,
      message:
        "All bookings fetched successfully.",
      bookings,
    };
  } catch (error) {
    console.error(
      "GET ALL BOOKINGS ERROR:",
      error
    );

    return {
      success: false,
      message: error.message,
    };
  }
};

// =====================================================
// GET ONE BOOKING
// =====================================================

const getIndividualBookingData =
  async (id) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {
        return {
          success: false,
          message: "Invalid booking ID.",
        };
      }

      const booking =
        await BookTicketModel
          .findById(id)
          .lean();

      if (!booking) {
        return {
          success: false,
          message: "Booking not found.",
        };
      }

      return {
        success: true,
        message:
          "Booking fetched successfully.",
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
      // =================================================
      // VALIDATE USER ID
      // =================================================

      if (
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return {
          success: false,
          message: "Invalid user ID.",
        };
      }

      // =================================================
      // FIND BOOKINGS
      // =================================================

      const bookings =
        await BookTicketModel.find({
          userId,
        })
          .sort({
            createdAt: -1,
          })
          .lean();

      return {
        success: true,
        message:
          "User bookings fetched successfully.",
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