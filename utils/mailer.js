const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Create transporter (Use your email provider settings)
const transporter = nodemailer.createTransport({
  service: "gmail", // Example: "gmail", "outlook", or SMTP settings
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password (Not your actual email password)
  },
});

// Function to send email
const sendEmail = async (to, subject, text, resumePath = null) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: resumePath ? [{ path: resumePath }] : [], // Correctly attach file
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendEmail;
