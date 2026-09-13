const ContactService = require("../service/ContactService");

// =====================================================
// POST CONTACT MESSAGE
// =====================================================

const sendContactMessage = async (req, res) => {
  try {
    const result = await ContactService.sendContactMessageData(
      req.body
    );

    if (result.success) {
      return res.status(201).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    console.error("CONTACT POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL CONTACT MESSAGES
// =====================================================

const getContacts = async (req, res) => {
  try {
    const result =
      await ContactService.getContactsData();

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    console.error("CONTACT GET ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getIndividualContact = async (req, res) => {
  try {
    const { id } = req.params;

    const result =
      await ContactService.getIndividualContactData(id);

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(404).json(result);

  } catch (error) {
    console.error(
      "GET INDIVIDUAL CONTACT CONTROLLER ERROR:",
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
  sendContactMessage,
  getContacts,
  getIndividualContact,
};