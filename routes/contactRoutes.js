const express = require("express");
const Contact = require("../models/contact.js");
const { validationResult, checkSchema, matchedData } = require("express-validator");
const { createUserValidationSchema } = require("../utils/validationSchemas.js");
const sendEmail = require("../utils/mailer");

const router = express.Router();

router.post("/", checkSchema(createUserValidationSchema), async (req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const { clientName, email, message } = matchedData(req);
  try {
    const newMessage = new Contact({ clientName, email, message });
    const savedMessage = await newMessage.save();
    // console.log("✅ Contact saved in MongoDB:", savedMessage); // Debugging line

    const emailSent = await sendEmail(
      "martinstojmenovskim@gmail.com", // Change to your email
      `New message form portfolio submission from: ${clientName}`,
      `Name: ${clientName}\nEmail: ${email}\nMessage: ${message}`
    );
    if (!emailSent) return res.status(500).json({ error: "Failed to send email" });

    return res.status(201).json({ message: "Message saved & email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  





});

module.exports = router;
