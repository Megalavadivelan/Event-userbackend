const SignupModel = require("../model/SignupModel");
const fs = require("fs");
const path = require("path");

// ========================================
// GET PROFILE
// ========================================

const getProfile = async (req, res) => {
  try {
    const user =
      await SignupModel.findById(req.userId)
        .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        phone: user.phone || "",
        profileImage:
          user.profileImage || "",
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.log(
      "GET PROFILE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// UPDATE PROFILE
// ========================================

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const user =
      await SignupModel.findById(
        req.userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name.trim();

    user.phone =
      phone ? phone.trim() : "";

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        phone: user.phone || "",
        profileImage:
          user.profileImage || "",
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.log(
      "UPDATE PROFILE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// UPLOAD PROFILE IMAGE
// ========================================

const uploadProfileImage = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const user =
      await SignupModel.findById(
        req.userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old image
    if (user.profileImage) {
      const oldImagePath =
        path.join(
          __dirname,
          "../../",
          user.profileImage
        );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const imagePath =
      `/uploads/profile/${req.file.filename}`;

    user.profileImage = imagePath;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile picture updated successfully",

      profileImage: imagePath,
    });

  } catch (error) {
    console.log(
      "UPLOAD IMAGE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// DELETE PROFILE IMAGE
// ========================================

const deleteProfileImage = async (
  req,
  res
) => {
  try {
    const user =
      await SignupModel.findById(
        req.userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.profileImage) {
      const imagePath =
        path.join(
          __dirname,
          "../../",
          user.profileImage
        );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    user.profileImage = "";

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile picture removed successfully",
    });

  } catch (error) {
    console.log(
      "DELETE IMAGE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
};