const SignupModel = require("../model/SignupModel");

const bcrypt = require("bcryptjs");

const signupUserdata = async (body) => {
  try {
    // =========================
    // GET SIGNUP DATA
    // =========================

    const { name, email, password, phone } = body;

    // =========================
    // CHECK REQUIRED FIELDS
    // =========================

    if (!name || !email || !password) {
      return {
        success: false,
        message: "Name, Email and Password are required",
      };
    }

    // =========================
    // CHECK EXISTING USER
    // =========================

    const existingUser = await SignupModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // CREATE USER
    // =========================

    const newUser = await SignupModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || "",
    });

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return {
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
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
  signupUserdata,
};