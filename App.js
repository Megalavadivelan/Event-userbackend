const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const SignupRouter = require("./src/router/SignupRouter");
const LoginRouter = require("./src/router/LoginRouter");
const AdminRouter = require("./src/router/AdminRouter");
const EventRouter = require("./src/router/EventRouter");
const ProfileRouter = require("./src/router/ProfileRouter");
const ContactRouter = require("./src/router/ContactRouter");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ========================================
// STATIC FILES
// ========================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ========================================
// MONGODB CONNECTION FUNCTION
// ========================================

const connectDB = async () => {
  try {
    // Already connected
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error(
      "MongoDB connection error:",
      error.message
    );

    throw error;
  }
};

// ========================================
// DATABASE CONNECTION MIDDLEWARE
// ========================================

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ========================================
// ROUTES
// ========================================

app.use("/signup", SignupRouter);

app.use("/login", LoginRouter);

app.use("/admin", AdminRouter);

app.use("/events", EventRouter);

app.use("/profile", ProfileRouter);

app.use("/contact", ContactRouter);

// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event Management Backend is running",
  });
});

// ========================================
// 404 ROUTE
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ========================================
// LOCAL SERVER
// ========================================

if (require.main === module) {
  const PORT = process.env.PORT || 2005;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ========================================
// EXPORT FOR VERCEL
// ========================================

module.exports = app;