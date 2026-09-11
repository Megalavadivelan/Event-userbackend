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
const OrganizereqRouter = require("./src/router/OrganizereqRouter");

const app = express();

// =====================================================
// CORS
// =====================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://eventuser-two.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (Thunder Client, Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================================================
// STATIC FILES
// =====================================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =====================================================
// MONGODB CONNECTION
// =====================================================

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

// =====================================================
// DATABASE CONNECTION MIDDLEWARE
// =====================================================

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

// =====================================================
// ROUTES
// =====================================================

app.use("/signup", SignupRouter);

app.use("/login", LoginRouter);

app.use("/admin", AdminRouter);

app.use("/events", EventRouter);

app.use("/profile", ProfileRouter);

app.use("/contact", ContactRouter);

app.use(
  "/organizer-requests",
  OrganizereqRouter
);

// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event Management Backend is running",
  });
});

// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================================================
// LOCAL SERVER
// =====================================================

if (require.main === module) {
  const PORT = process.env.PORT || 2005;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// =====================================================
// VERCEL EXPORT
// =====================================================

module.exports = app;