const {
  sendContactMessageData,
} = require("../service/ContactServices");

const sendContactMessage = async (req, res) => {
  try {
    const result = await sendContactMessageData(req.body);

    if (result.success) {
      return res.status(201).json(result);
    }

    return res.status(400).json(result);

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