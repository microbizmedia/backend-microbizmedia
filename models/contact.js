const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  clientName: String,
  email: String,
  message: String,
}, { timestamps: true });

// Set TTL index on `createdAt` field (e.g., expires after 24 hours)
contactSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 86400 seconds = 24 hours

module.exports = mongoose.model("Contact", contactSchema);
