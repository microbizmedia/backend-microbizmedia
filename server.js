const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

dotenv.config();
// connectDB();    
const app = express();



// Simplified CORS configuration
const corsOptions = {
  origin: [
    "https://micro-chi-neon.vercel.app", // Your Vercel frontend
    "http://localhost:3000"              // For local development
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes





// app.use(bodyParser.json());
// app.use(express.static('uploads')); // Ensure uploaded files are accessible
// ✅ Ensure JSON parsing and multipart data handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route handler for the root path
app.use("/", require("./routes/jobApplyRoute"));
app.use("/", require("./routes/contactRoute"));

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
});

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

// Do NOT use app.listen()
// Instead, export the app for Vercel
module.exports = app;
