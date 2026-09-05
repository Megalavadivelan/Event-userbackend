const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AdminModel = require("./src/model/AdminModel");

const MONGO_URL = "mongodb://localhost:27017/event_mngmt";

const createAdmin = async () => {
  try {

    // Connect MongoDB
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected");


    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({
      email: "admin@event.com"
    });

    if (existingAdmin) {

      console.log("Admin already exists");

      process.exit(0);
    }


    // Hash password
    const hashedPassword =
      await bcrypt.hash("Admin@123", 10);


    // Create admin
    const admin = new AdminModel({

      name: "Administrator",

      email: "admin@event.com",

      password: hashedPassword,

      role: "admin",

    });


    // Save admin
    await admin.save();


    console.log("Admin created successfully");

    console.log("Email: admin@event.com");

    console.log("Password: Admin@123");


    process.exit(0);

  } catch (error) {

    console.log(
      "Error creating admin:",
      error
    );

    process.exit(1);

  }
};


createAdmin();