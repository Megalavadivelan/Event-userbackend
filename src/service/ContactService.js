const ContactModel = require("../model/ContactModel");


// =====================================================
// POST - SEND CONTACT MESSAGE
// =====================================================

const sendContactMessageData = async (body) => {
  try {

    const {
      name,
      email,
      subject,
      message,
      userId,
    } = body;


    // =================================================
    // VALIDATE FIELDS
    // =================================================

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required",
      };
    }


    // =================================================
    // SAVE CONTACT MESSAGE
    // =================================================

    const contact = await ContactModel.create({
      userId: userId || null,
      name,
      email,
      subject,
      message,
    });


    return {
      success: true,
      message: "Message sent successfully",
      contact: contact,
    };

  } catch (error) {

    console.error(
      "CONTACT SERVICE ERROR:",
      error
    );

    return {
      success: false,
      message: error.message,
    };
  }
};


// =====================================================
// GET - ALL CONTACT MESSAGES
// =====================================================

const getContactsData = async () => {
  try {

    const contacts = await ContactModel.find({})
      .sort({ createdAt: -1 })
      .lean();


    return {
      success: true,
      message: "Contact details fetched successfully",
      contacts: contacts,
    };

  } catch (error) {

    console.error(
      "GET CONTACT SERVICE ERROR:",
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
  sendContactMessageData,
  getContactsData,
};