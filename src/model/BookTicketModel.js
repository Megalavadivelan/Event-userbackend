const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: true,
  }
);

const BookTicketSchema = new mongoose.Schema(
  {
    // =========================================
    // USER DETAILS
    // =========================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // =========================================
    // EVENT DETAILS
    // =========================================

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    eventDate: {
      type: Date,
      required: false,
    },

    // =========================================
    // TICKET DETAILS
    // =========================================

    ticketPrice: {
      type: Number,
      default: 0,
    },

    numberOfTickets: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    // =========================================
    // ATTENDEE DETAILS
    // =========================================

    attendees: {
      type: [AttendeeSchema],
      required: true,

      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length >= 1 &&
            value.length <= 4 &&
            value.length ===
              Number(this.numberOfTickets)
          );
        },

        message:
          "Attendee count must match number of tickets and cannot exceed 4",
      },
    },

    // =========================================
    // PAYMENT / TOTAL
    // =========================================

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    // =========================================
    // BOOKING DATE
    // =========================================

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    // =========================================
    // STATUS
    // =========================================

    status: {
      type: String,

      enum: [
        "Confirmed",
        "Cancelled",
      ],

      default: "Confirmed",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BookTicket",
  BookTicketSchema
);