const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

dotenv.config();
// connectDB();    

const app = express();
// ✅ Allow requests from your frontend
app.use(cors({
  origin: [ "http://localhost:3000", "https://microbizmedia.github.io","https://micro-chi-neon.vercel.app" ], // Change this to your frontend URL in production
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization", // Allow headers
  credentials: true, // Allow cookies if needed
}));
// ✅ Handle Preflight Requests Manually
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://microbizmedia.github.io");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(200);
});
// app.use(bodyParser.json());
// app.use(express.static('uploads')); // Ensure uploaded files are accessible
// ✅ Ensure JSON parsing and multipart data handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running locally on http://localhost:${PORT}`);
});
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
