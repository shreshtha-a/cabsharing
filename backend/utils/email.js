const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from:    `"Hopin 🚗" <${process.env.EMAIL_USER}>`,
      to, subject, html, text,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Email error:", err.message);
    // Don't throw — email failure shouldn't crash the request
  }
};
