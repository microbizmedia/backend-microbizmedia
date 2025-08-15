'use strict';

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// -----------------------------
// CORS Configuration
// -----------------------------
const corsOptions = {
  origin: [
    "https://micro-chi-neon.vercel.app", // Your Vercel frontend
    "http://localhost:3000"               // For local development
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};

// Apply CORS globally
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// Routes
// -----------------------------
app.get("/check-cors", (req, res) => {
  res.json({
    originHeader: req.headers.origin || null,
    message: "CORS is applied globally",
  });
});

// Main routes
app.use("/", require("./routes/jobApplyRoute"));
app.use("/", require("./routes/contactRoute"));

// Optional root route
app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

// -----------------------------
// Error handling
// -----------------------------
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
});

// -----------------------------
// Local development
// -----------------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Local server running at http://localhost:${PORT}`);
  });
}

// -----------------------------
// Export for Vercel
// -----------------------------
module.exports = app;
