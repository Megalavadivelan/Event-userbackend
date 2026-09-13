const mongoose = require("mongoose");

// =====================================================
// ATTENDEE SCHEMA
// =====================================================

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

// =====================================================
// BOOKING SCHEMA
// =====================================================

const BookTicketSchema = new mongoose.Schema(
  {
    // =================================================
    // USER DETAILS
    // =================================================

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

    // =================================================
    // EVENT DETAILS
    // =================================================

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

    eventTime: {
      type: String,
      default: "",
      trim: true,
    },

    eventLocation: {
      type: String,
      default: "",
      trim: true,
    },

    eventCategory: {
      type: String,
      default: "Event",
      trim: true,
    },

    // =================================================
    // TICKET DETAILS
    // =================================================

    ticketPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    numberOfTickets: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    // =================================================
    // ATTENDEES
    // =================================================

    attendees: {
      type: [AttendeeSchema],
      required: true,

      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length >= 1 &&
            value.length <= 4 &&
            value.length === Number(this.numberOfTickets)
          );
        },

        message:
          "Attendee count must match number of tickets.",
      },
    },

    // =================================================
    // TOTAL
    // =================================================

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // =================================================
    // BOOKING DATE
    // =================================================

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    // =================================================
    // STATUS
    // =================================================

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