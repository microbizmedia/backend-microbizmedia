const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

dotenv.config();
// connectDB();    
const app = express();






// Allowed origin for production
const allowedOrigins = ["https://micro-chi-neon.vercel.app"];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // allow cookies if needed
}));











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
