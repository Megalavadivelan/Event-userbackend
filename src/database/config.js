
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/event_mngmt")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err, "DB not connected");
  });

module.exports = mongoose.connection;