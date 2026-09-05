const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://Megala:megala21@cluster0.nrxk7pd.mongodb.net/?appName=Cluster0"

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;