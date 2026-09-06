const OrganizerRequest = require(
"../model/OrganizereqModel.js"
);

const createOrganizerRequest = async (req, res) => {
try {
const {
organizerName,
email,
phone,
eventName,
description,
eventDate,
location,
expectedParticipants,
category,
ticketFee,
estimatedBudget,
} = req.body;


const newRequest = await OrganizerRequest.create({
  organizerName,
  email,
  phone,
  eventName,
  description,
  eventDate,
  location,
  expectedParticipants,
  category,
  ticketFee,
  estimatedBudget:
    estimatedBudget === ""
      ? null
      : estimatedBudget,
});

return res.status(201).json({
  success: true,
  message:
    "Event organization request sent successfully!",
  data: newRequest,
});


} catch (error) {
console.error(
"ORGANIZER REQUEST ERROR:",
error
);


return res.status(500).json({
  success: false,
  message: error.message,
});


}
};

module.exports = {
createOrganizerRequest,
};
