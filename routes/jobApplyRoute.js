const express = require("express");
const { validationResult, checkSchema, matchedData } = require("express-validator");
const { createJobApplyValidationSchema } = require("../utils/validationSchemas.js");
const sendEmail = require("../utils/mailer.js");
const multer = require('multer');
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save files in an "uploads" directory
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/apply", upload.single('resume'), checkSchema(createJobApplyValidationSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ errors: result.array() }); // Send validation errors to the frontend
  
 
  const { positionName, candidateName, email, location, yearsOfExperience, message, resumePath} = matchedData(req);
  // const resumePath = req.file ? req.file.path : null;
  try {
    // const newMessage = new Contact({ positionName, candidateName, email, location, yearsOfExperience, message });
    // const savedMessage = await newMessage.save();
    // console.log("✅ Contact saved in MongoDB:", savedMessage); // Debugging line
   
    // console.log("Received Data:", { positionName, candidateName, email, message, resumePath });

    const emailSent = await sendEmail(
      "martinstojmenovskim@gmail.com", // Change to your email
      `Applicant from jop posting: ${positionName}`,
      `Full Name: ${candidateName}\nEmail Address: ${email}\nLocated: ${location}\nYears of experience: ${yearsOfExperience}\nMessage: ${message}`,
      resumePath
    );
    if (!emailSent) return res.status(500).json({ error: "Failed to send email" });
    return res.status(201).json({ message: "Message saved & email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

});


module.exports = router;
