const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

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
      // உங்கள் deployed frontend URL இங்கே add பண்ணலாம்
    ],
    credentials: true,
  })
);

// ========================================
// PROFILE IMAGE STATIC FOLDER
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
// MONGODB CONNECTION
// ========================================

// Option A: Directly paste your MongoDB Atlas URL here
const MONGO_URI =
  "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/event_mngmt?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ========================================
// START SERVER (LOCAL ONLY)
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