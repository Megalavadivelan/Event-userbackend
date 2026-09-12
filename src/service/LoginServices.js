const SignupModel = require("../model/SignupModel");
const LoginHistoryModel = require("../model/LoginHistoryModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const user = await SignupModel.findOne({
      email: email,
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

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

    // =====================================================
    // SAVE LOGIN HISTORY AFTER SUCCESSFUL LOGIN
    // =====================================================

    await LoginHistoryModel.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      loginTime: new Date(),
      logoutTime: null,
      status: "Active",
    });

    // =====================================================

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


// =====================================================
// GET ALL USERS
// =====================================================

const getUsersData = async () => {
  try {
    const users = await SignupModel.find({})
      .select("-password")
      .lean();

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


// =====================================================
// GET INDIVIDUAL USER
// =====================================================

const getIndividualUserData = async (id) => {
  try {
    const user = await SignupModel
      .findById(id)
      .select("-password")
      .lean();

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


module.exports = {
  loginUserdata,
  getUsersData,
  getIndividualUserData,
};