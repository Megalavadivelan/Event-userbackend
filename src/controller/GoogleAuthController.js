
const { OAuth2Client } = require("google-auth-library");
const SignupModel = require("../model/SignupModel");
const LoginHistoryModel = require("../model/LoginHistoryModel");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Google authentication configuration is missing",
      });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.email_verified) {
      return res.status(401).json({
        success: false,
        message: "Google account verification failed",
      });
    }

    const { sub: googleId, name, email, picture } = payload;
    const normalizedEmail = email.toLowerCase();

    // Find existing account
    let user = await SignupModel.findOne({
      email: normalizedEmail,
    });

    // Create account if it does not exist
    if (!user) {
      user = await SignupModel.create({
        name: name || "Google User",
        email: normalizedEmail,
        password: null,
        googleId,
        role: "user",
      });
    } else if (!user.googleId) {
      // Link Google account to an existing verified email
      user.googleId = googleId;
      await user.save();
    } else if (user.googleId !== googleId) {
      return res.status(409).json({
        success: false,
        message: "This email is linked to another Google account",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    // Save login history
    await LoginHistoryModel.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      loginTime: new Date(),
      logoutTime: null,
      status: "Active",
    });

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: picture || "",
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);

    return res.status(401).json({
      success: false,
      message: "Google login failed. Please try again.",
    });
  }
};

module.exports = { googleLogin };
