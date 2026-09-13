const OrganizereqModel = require("../model/OrganizereqModel");

// =====================================================
// POST ORGANIZER REQUEST
// =====================================================

const createOrganizerRequestData = async (body) => {
  try {
    const {
      organizerName,
      email,
      phone,
      eventName,
      description,
      date,
      location,
      expectedParticipants,
      category,
      budget,
    } = body;

    if (
      !organizerName ||
      !email ||
      !phone ||
      !eventName ||
      !description ||
      !date ||
      !location ||
      !expectedParticipants ||
      !category ||
      !budget
    ) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const request = await OrganizereqModel.create({
      organizerName,
      email,
      phone,
      eventName,
      description,
      date,
      location,
      expectedParticipants,
      category,
      budget,
    });

    return {
      success: true,
      message: "Organizer request submitted successfully",
      request,
    };

  } catch (error) {
    console.error(
      "ORGANIZER REQUEST POST ERROR:",
      error
    );

    return {
      success: false,
      message: error.message,
    };
  }
};


// =====================================================
// GET ALL ORGANIZER REQUESTS
// =====================================================

const getOrganizerRequestsData = async () => {
  try {
    const requests =
      await OrganizereqModel.find({})
        .sort({ createdAt: -1 })
        .lean();

    return {
      success: true,
      message: "Organizer requests fetched successfully",
      requests: requests,
    };

  } catch (error) {
    console.error(
      "GET ORGANIZER REQUESTS ERROR:",
      error
    );

    return {
      success: false,
      message: error.message,
    };
  }
};


// =====================================================
// GET INDIVIDUAL ORGANIZER REQUEST
// =====================================================

const getIndividualOrganizerRequestData = async (id) => {
  try {
    const request =
      await OrganizereqModel
        .findById(id)
        .lean();

    if (!request) {
      return {
        success: false,
        message: "Organizer request not found",
      };
    }

    return {
      success: true,
      message: "Organizer request fetched successfully",
      request: request,
    };

  } catch (error) {
    console.error(
      "GET INDIVIDUAL ORGANIZER REQUEST ERROR:",
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
  createOrganizerRequestData,
  getOrganizerRequestsData,
  getIndividualOrganizerRequestData,
};