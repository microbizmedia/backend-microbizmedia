const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();    

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')); // Ensure uploaded files are accessible

// Route handler for the root path
app.get('/', (req, res) => { res.send('Server is running...'); });
app.use("/", require("./routes/jobApplyRoute"));
app.use("/", require("./routes/contactRoute"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
