const ContactModel = require("../model/ContactModel");

const sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      userId,
    } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await ContactModel.create({
      userId: userId || null,
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });

  } catch (error) {
    console.error(
      "CONTACT CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = {
  sendContactMessage,
};