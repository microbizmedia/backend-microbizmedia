const express = require("express");
const { validationResult, checkSchema, matchedData } = require("express-validator");
const { createJobApplyValidationSchema } = require("../utils/validationSchemas.js");
const sendEmail = require("../utils/mailer.js");
const multer = require('multer');
const router = express.Router();

// ✅ Use memory storage (since we don't need to save files)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/apply", upload.single('resume'), async (req, res) => {
   await checkSchema(createJobApplyValidationSchema).run(req);
   const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json({ errors: result.array() }); // Send validation errors to the frontend
  
 
  const { positionName, candidateName, email, location, yearsOfExperience, message} = matchedData(req);
  const resumeFile = req.file; // ✅ Get file from Multer
  
  try {
    // const newMessage = new Contact({ positionName, candidateName, email, location, yearsOfExperience, message });
    // const savedMessage = await newMessage.save();
    // console.log("✅ Contact saved in MongoDB:", savedMessage); // Debugging line
    const emailSent = await sendEmail(
      "martinstojmenovskim@gmail.com", // Change to your email
      `Applicant from jop posting: ${positionName}`,
      `Full Name: ${candidateName}\nEmail Address: ${email}\nLocated: ${location}\nYears of experience: ${yearsOfExperience}\nMessage: ${message}`,
      resumeFile
    );
    if (!emailSent) return res.status(500).json({ error: "Failed to send email" });
    return res.status(201).json({ message: "Message saved & email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

});


module.exports = router;
