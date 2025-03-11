const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();    

const app = express();
// ✅ Allow requests from your frontend
app.use(cors({
  origin: [ "http://localhost:5173", "https://micro-biz-backend-microbizmedia-microbizmedias-projects.vercel.app/" ], // Change this to your frontend URL in production
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));
app.use(bodyParser.json());
app.use(express.static('uploads')); // Ensure uploaded files are accessible


const PORT = process.env.PORT || 3000;
// Route handler for the root path
app.use("/", require("./routes/jobApplyRoute"));
app.use("/", require("./routes/contactRoute"));



app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

// Do NOT use app.listen()
// Instead, export the app for Vercel
module.exports = app;
