
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

// =====================================================
// ROUTERS
// =====================================================

const GoogleAuthRouter = require("./src/router/GoogleAuthRouter");
const SignupRouter = require("./src/router/SignupRouter");
const LoginRouter = require("./src/router/LoginRouter");
const LoginHistoryRouter = require("./src/router/LoginHistoryRouter");
const AdminRouter = require("./src/router/AdminRouter");
const EventRouter = require("./src/router/EventRouter");
const ProfileRouter = require("./src/router/ProfileRouter");
const ContactRouter = require("./src/router/ContactRouter");
const OrganizereqRouter = require("./src/router/OrganizereqRouter");
const BookTicketRouter = require("./src/router/BookTicketRouter");

const app = express();

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  "https://event-user-one.vercel.app",
  "https://eventuser-two.vercel.app",
  "https://event-admin-one.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://userapi-alpha-nine.vercel.app/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS blocked origin:", origin);

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

// CORS must execute before all routes and database middleware.
app.use(cors(corsOptions));

// Explicitly handle preflight requests.
app.options(/.*/, cors(corsOptions));

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
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
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB connected successfully");
};

// =====================================================
// DATABASE MIDDLEWARE
// =====================================================

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// =====================================================
// ROUTES
// =====================================================

app.use("/auth", GoogleAuthRouter);

app.use("/signup", SignupRouter);
app.use("/login", LoginRouter);
app.use("/loginhistory", LoginHistoryRouter);
app.use("/admin", AdminRouter);
app.use("/events", EventRouter);
app.use("/profile", ProfileRouter);
app.use("/contact", ContactRouter);
app.use("/organizer-requests", OrganizereqRouter);
app.use("/booking", BookTicketRouter);

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event Management Backend is running.",
  });
});

// =====================================================
// TEST ROUTES
// =====================================================

app.get("/test-booking", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking route is working.",
  });
});

app.get("/test-contact", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Contact route is working.",
  });
});

// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
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
// VERCEL
// =====================================================

module.exports = app;
