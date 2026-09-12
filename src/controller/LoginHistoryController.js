const LoginHistoryModel = require("../model/LoginHistoryModel");

const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const history = await LoginHistoryModel.findOneAndUpdate(
      {
        userId: userId,
        status: "Active",
      },
      {
        logoutTime: new Date(),
        status: "Logged Out",
      },
      {
        sort: { loginTime: -1 },
        new: true,
      }
    );

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Active login session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout recorded successfully",
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  logoutUser,
};