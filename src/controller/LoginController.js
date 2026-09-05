const { loginUserdata } = require("../service/LoginServices");

const loginuser = async (req, res) => {
  try {
    const result = await loginUserdata(req.body);

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginuser,
};