const mongoose = require("mongoose");

const organizerRequestSchema = new mongoose.Schema(
{
organizerName: {
type: String,
required: true,
},
email: {
type: String,
required: true,
},
phone: {
type: String,
required: true,
},
eventName: {
type: String,
required: true,
},
description: {
type: String,
required: true,
},
eventDate: {
type: Date,
required: true,
},
location: {
type: String,
required: true,
},
expectedParticipants: {
type: Number,
required: true,
},
category: {
type: String,
required: true,
},
ticketFee: {
type: Number,
required: true,
},
estimatedBudget: {
type: Number,
default: null,
},
status: {
type: String,
default: "Pending",
},
},
{
timestamps: true,
}
);

module.exports = mongoose.model(
"OrganizerRequest",
organizerRequestSchema
);
