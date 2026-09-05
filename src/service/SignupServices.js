const SignupModel = require("../model/SignupModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const loginUserdata = async (body) => {
  try {
    // =========================
    // GET LOGIN DATA
    // =========================

    const { email, password } = body;

    // =========================
    // CHECK FIELDS
    // =========================

    if (!email || !password) {
      return {
        success: false,
        message: "Email and Password are required",
      };
    }

    // =========================
    // FIND USER
    // =========================

    const user = await SignupModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // =========================
    // CHECK PASSWORD
    // =========================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // =========================
    // CREATE JWT
    // =========================

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

    // =========================
    // LOGIN SUCCESS
    // =========================

    return {
      success: true,

      message: "Login Successful",

      token: token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        phone: user.phone || "",
        bio: user.bio || "",
        profileImage: user.profileImage || "",
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