const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const db = require("./src/database/config");


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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ========================================
// PROFILE IMAGE STATIC FOLDER
// ========================================

// Allows frontend to access:
// http://localhost:2005/uploads/profiles/filename.jpg

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ========================================
// ROUTES
// ========================================

// Signup
app.use(
  "/signup",
  SignupRouter
);

// Login
app.use(
  "/login",
  LoginRouter
);

// Admin
app.use(
  "/admin",
  AdminRouter
);

// Events
app.use(
  "/events",
  EventRouter
);

// Profile
app.use(
  "/profile",
  ProfileRouter
);

app.use("/contact", ContactRouter);
// ========================================
// HOME / TEST ROUTE
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Event Management Backend is running",
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
// DATABASE CONNECTION
// ========================================

db.once("open", () => {
  console.log("Database Connected");

  app.listen(2005, () => {
    console.log(
      "Server running on port 2005"
    );
  });
});

db.on("error", (err) => {
  console.log(
    "Database Error:",
    err
  );
});

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


  module.exports = app;