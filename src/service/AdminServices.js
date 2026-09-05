const AdminModel = require("../model/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =========================
// ADMIN LOGIN
// =========================

const adminLogin = async (body) => {
  try {

    const { email, password } = body;


    // Check fields
    if (!email || !password) {
      return {
        success: false,
        message: "Email and Password are required",
      };
    }


    // Find admin by email
    const admin = await AdminModel.findOne({
      email: email.toLowerCase().trim(),
    });


    // Admin not found
    if (!admin) {
      return {
        success: false,
        message: "Invalid admin credentials",
      };
    }


    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );


    // Wrong password
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid admin credentials",
      };
    }


    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },

      "XH1KSP_VDM",

      {
        expiresIn: "12h",
      }
    );


    // Successful login
    return {
      success: true,

      message: "Admin Login Successful",

      token: token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
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
  adminLogin,
};