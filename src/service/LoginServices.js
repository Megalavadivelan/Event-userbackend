const SignupModel = require("../model/SignupModel");

// const LoginHistoryModel = require("../model/LoginHistoryModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ===============================
// LOGIN USER
// ===============================

const loginUserdata = async (body) => {
  try {
    const {
      email,
      password,
    } = body;

    // Check fields
    if (!email || !password) {
      return {
        success: false,
        message: "email and Password are required",
      };
    }

    // Find user
    const user = await SignupModel.findOne({
      email: email,
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Compare password
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


    // ==================================
    // LOGIN SUCCESSFUL
    // SAVE LOGIN HISTORY
    // ==================================

    // await LoginHistoryModel.create({
    //   userId: user._id,
    //   email: user.email,
    //   loginTime: new Date(),
    //   status: "Active",
    // });


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


    // Return login response
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



// ===============================
// GET ALL USERS
// ===============================

const getUsersData = async () => {
  try {

    const users = await SignupModel.find({})
      .select("-password");

    return {
      success: true,
      message: "Users fetched successfully",
      users: users,
    };

  } catch (error) {

    return {
      success: false,
      message: error.message,
    };

  }
};



// ===============================
// GET INDIVIDUAL USER
// ===============================

const getIndividualUserData = async (id) => {
  try {

    const user = await SignupModel
      .findById(id)
      .select("-password");

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User details fetched successfully",
      user: user,
    };

  } catch (error) {

    return {
      success: false,
      message: error.message,
    };

  }
};



// ===============================
// EXPORT
// ===============================

module.exports = {
  loginUserdata,
  getUsersData,
  getIndividualUserData,
};

