const ContactModel = require("../model/ContactModel");

const sendContactMessageData = async (body) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      userId,
    } = body;

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

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
      contact,
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
// GET CONTACTS
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
      "GET CONTACTS SERVICE ERROR:",
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