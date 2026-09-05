const SignupModel = require("../model/SignupModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUserdata = async (body) => {
  try {

    // Get name and password from frontend
    const { email, password } = body;

    // Check fields
    if (!email || !password) {
      return {
        success: false,
        message: "email and Password are required",
      };
    }

    // Find user by name
    const user = await SignupModel.findOne({ email: email });

    // User not found
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    // Wrong password
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "XH1KSP_VDM",
      {
        expiresIn: "12h",
      }
    );

    // Login successful
    return {
      success: true,
      message: "Login Successful",

      token: token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

  } catch (error) {

    return {
      success: false,
      message: error.message,
    };

  }
};

module.exports = {
  loginUserdata,
};
