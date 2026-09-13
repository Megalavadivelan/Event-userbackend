const BookTicketModel = require("../model/BookTicketModel");

const createBookingData = async (body) => {
  try {
    const {
      userId,
      userEmail,
      eventId,
      eventName,
      ticketPrice,
      numberOfTickets,
      attendees,
    } = body;

    if (
      !userId ||
      !userEmail ||
      !eventId ||
      !eventName ||
      numberOfTickets === undefined ||
      !attendees
    ) {
      return {
        success: false,
        message: "Required booking details are missing",
      };
    }

    if (
      numberOfTickets < 1 ||
      numberOfTickets > 4
    ) {
      return {
        success: false,
        message: "You can book maximum 4 tickets",
      };
    }

    if (
      !Array.isArray(attendees) ||
      attendees.length !== Number(numberOfTickets)
    ) {
      return {
        success: false,
        message:
          "Attendee details must match the number of tickets",
      };
    }

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

    const price = Number(ticketPrice) || 0;

    const totalAmount =
      price * Number(numberOfTickets);

    const booking =
      await BookTicketModel.create({
        userId,
        userEmail,
        eventId,
        eventName,
        ticketPrice: price,
        numberOfTickets,
        attendees,
        totalAmount,
      });

    return {
      success: true,
      message: "Ticket booked successfully",
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


// GET ALL BOOKINGS

const getBookingsData = async () => {
  try {
    const bookings =
      await BookTicketModel.find({})
        .sort({ createdAt: -1 })
        .lean();

    return {
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};


// GET INDIVIDUAL BOOKING

const getIndividualBookingData = async (id) => {
  try {
    const booking =
      await BookTicketModel.findById(id)
        .lean();

    if (!booking) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    return {
      success: true,
      message: "Booking fetched successfully",
      booking,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};


// GET BOOKINGS OF ONE USER

const getUserBookingsData = async (userId) => {
  try {
    const bookings =
      await BookTicketModel.find({
        userId,
      })
        .sort({ createdAt: -1 })
        .lean();

    return {
      success: true,
      message: "User bookings fetched successfully",
      bookings,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};


module.exports = {
  createBookingData,
  getBookingsData,
  getIndividualBookingData,
  getUserBookingsData,
};