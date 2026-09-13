const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// =====================================================
// ROUTERS
// =====================================================

const SignupRouter = require("./src/router/SignupRouter");
const LoginRouter = require("./src/router/LoginRouter");
const LoginHistoryRouter = require("./src/router/LoginHistoryRouter")
const AdminRouter = require("./src/router/AdminRouter");
const EventRouter = require("./src/router/EventRouter");
const ProfileRouter = require("./src/router/ProfileRouter");
const ContactRouter = require("./src/router/ContactRouter");
const OrganizereqRouter = require("./src/router/OrganizereqRouter");
const BookingRouter = require("./src/router/BookingsRouter");
const BookTicketRouter = require("./src/router/BookTicketRouter")

const app = express();

// =====================================================
// CORS
// =====================================================

const allowedOrigins = [
  "https://event-user-one.vercel.app",
  "https://eventuser-two.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Thunder Client, Postman and server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
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
    console.error(
      "Database middleware error:",
      error.message
    );

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

app.use("/loginhistory", LoginHistoryRouter);

app.use("/admin", AdminRouter);

app.use("/events", EventRouter);

app.use("/profile", ProfileRouter);

app.use("/contact", ContactRouter);

app.use(
  "/organizer-requests",
  OrganizereqRouter
);

app.use("/booking", BookingRouter);

app.use(
  "/bookticket",
  BookTicketRouter
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


app.get("/test-contact", (req, res) => {
  res.json({
    success: true,
    message: "Contact route is working"
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
    console.log(
      `Server running on port ${PORT}`
    );
  });
}

// =====================================================
// VERCEL EXPORT
// =====================================================

module.exports = app;