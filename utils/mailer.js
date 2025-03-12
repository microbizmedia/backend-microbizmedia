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
const sendEmail = async (to, subject, text, file) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      attachments: file
        ? [
            {
              filename: file.originalname, // Correct filename
              content: file.buffer, // ✅ Pass the file buffer instead of a path
              encoding: "base64", // Ensure correct encoding
            },
          ]
        : [],
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
