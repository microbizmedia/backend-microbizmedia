const express = require("express");
const { validationResult, checkSchema, matchedData } = require("express-validator");
const { createContactValidationSchema } = require("../utils/validationSchemas.js");
const sendEmail = require("../utils/mailer.js");
const router = express.Router();


router.post("/contact",  checkSchema(createContactValidationSchema), async (req, res) => {
  const result = validationResult(req);
 
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() }); 
  }// Send validation errors to the frontend
  
  const { clientName, phone, email, budget,  message} = matchedData(req);
  console.log("Validated Data:", { clientName, phone, email, budget, message }); // Debugging line
  try {
    // const newMessage = new Contact({ positionName, candidateName, email, location, yearsOfExperience, message });
    // const savedMessage = await newMessage.save();
    // console.log("✅ Contact saved in MongoDB:", savedMessage); // Debugging line
    // console.log("Received Data:", { positionName, candidateName, email, message, resumePath });
    const emailSent = await sendEmail(
        "martinstojmenovskim@gmail.com", // Change to your email
        `New Client Inquiry: ${clientName}`,
        `
          Client Details:
          - Name: ${clientName}
          - Email: ${email}
          - Phone: ${phone || "Not provided"}
          - Budget: ${budget || "Not provided"}
          - Message: ${message}
        `,
    );
    if (!emailSent) return res.status(500).json({ error: "Failed to send email" });
    return res.status(201).json({ message: "Message saved & email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
