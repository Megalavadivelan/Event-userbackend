const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose")

// const db = require("./src/database/config");

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
    origin: [
      "http://localhost:5173",
      // Add your deployed frontend URL here
    ],
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
// DATABASE EVENTS
// ========================================
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
// db.once("open", () => {
//   console.log("Database Connected");
// });

// db.on("error", (err) => {
//   console.error("Database Error:", err);
// });

// ========================================
// START SERVER ONLY FOR LOCAL DEVELOPMENT
// ========================================

// if (require.main === module) {
//   const PORT = process.env.PORT || 2005;

  // app.listen(5000, () => {
  //   console.log(`Server running on port 5000`);
  // });
// }

// ========================================
// EXPORT FOR VERCEL
// ========================================

module.exports = app;