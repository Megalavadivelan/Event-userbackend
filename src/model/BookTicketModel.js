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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

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

    attendees: {
      type: [AttendeeSchema],
      required: true,
      validate: {
        validator: function (value) {
          return (
            value.length >= 1 &&
            value.length <= 4 &&
            value.length === this.numberOfTickets
          );
        },
        message:
          "Attendee count must match number of tickets and cannot exceed 4",
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
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