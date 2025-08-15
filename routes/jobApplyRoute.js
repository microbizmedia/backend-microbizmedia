const express = require("express");
const { validationResult, checkSchema, matchedData } = require("express-validator");
const { createJobApplyValidationSchema } = require("../utils/validationSchemas.js");
const sendEmail = require("../utils/mailer.js");
const multer = require('multer');
const router = express.Router();

// ✅ Use memory storage (since we don't need to save files)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.options("/apply", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://micro-chi-neon.vercel.app");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(200);
});

// ✅ Apply CORS on `/contact` route before processing
router.use("/apply", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://micro-chi-neon.vercel.app");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.post("/apply", upload.single('resume'), async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "https://microbizmedia.github.io"); // ✅ Ensure CORS headers on response
   // ✅ Validate request body (including file)
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
