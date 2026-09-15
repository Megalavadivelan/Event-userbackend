const SignupModel = require("../model/SignupModel");
const bcrypt = require("bcryptjs");

// ============================================================
// CREATE SIGNUP USER
// ============================================================

const signupUserdata = async (body) => {
  try {
    // GET SIGNUP DATA
    const {
      name,
      email,
      password,
      phone,
    } = body;

    // CHECK REQUIRED FIELDS
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Name, Email and Password are required",
      };
    }

    // CHECK EXISTING USER
    const existingUser = await SignupModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREATE USER
    const newUser = await SignupModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || "",
    });

    // SUCCESS RESPONSE
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


// ============================================================
// GET ALL SIGNUP USERS
// ============================================================

const getSignupUserdata = async () => {
  try {
    const users = await SignupModel.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return {
      success: true,
      message: "Signup users fetched successfully",

      count: users.length,

      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
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
  getSignupUserdata,
};