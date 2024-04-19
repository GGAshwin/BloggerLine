const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true // Or unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true // Or unique: false
    }
  }, { timestamps: true });

module.exports = mongoose.model("Notifications", NotificationSchema);
