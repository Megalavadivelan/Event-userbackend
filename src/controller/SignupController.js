const { signupUserdata } = require("../service/SignupServices");

const signupuser = async (req, res) => {
  try {
    const result = await signupUserdata(req.body);

    if (result.success) {
      return res.status(201).json(result);
    }

    return res.status(400).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  signupuser,
};