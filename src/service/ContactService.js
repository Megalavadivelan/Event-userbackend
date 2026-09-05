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

    // Validate fields
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Save contact message
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

    throw error;
  }
};

module.exports = {
  sendContactMessageData,
};