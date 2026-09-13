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


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  sendContactMessage,
  getContacts,
};