const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    // image: {
    //   type: String,
    //   required: true
    // },

    price: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);