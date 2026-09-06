const OrganizerRequest = require(
  "../model/OrganizereqModel"
);


const createOrganizerRequest = async (req, res) => {
  try {

    console.log(
      "Organizer Request Body:",
      req.body
    );

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


    const newRequest =
      await OrganizerRequest.create({
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
          estimatedBudget || null,
      });


    return res.status(201).json({
      success: true,
      message:
        "Event request sent successfully",
      data: newRequest,
    });

  } catch (error) {

    console.error(
      "ORGANIZER REQUEST ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to send organizer request",
    });

  }
};


module.exports = {
  createOrganizerRequest,
};