const OrganizerService = require("../service/OrganizereqService");


// =====================================================
// POST ORGANIZER REQUEST
// =====================================================

const createOrganizerRequest = async (req, res) => {
  try {
    const result =
      await OrganizerService.createOrganizerRequestData(
        req.body
      );

    if (result.success) {
      return res.status(201).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    console.error(
      "ORGANIZER REQUEST CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL ORGANIZER REQUESTS
// =====================================================

const getOrganizerRequests = async (req, res) => {
  try {
    const result =
      await OrganizerService.getOrganizerRequestsData();

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    console.error(
      "GET ORGANIZER REQUESTS CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET INDIVIDUAL ORGANIZER REQUEST
// =====================================================

const getIndividualOrganizerRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const result =
      await OrganizerService.getIndividualOrganizerRequestData(
        id
      );

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(404).json(result);

  } catch (error) {
    console.error(
      "GET INDIVIDUAL ORGANIZER REQUEST CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createOrganizerRequest,
  getOrganizerRequests,
  getIndividualOrganizerRequest,
};