const e = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const sendEmails = async (req, res) => {
  const { emails, subject, message } = req.body;
  const resume = req.file;

  const emailList = emails.split(",").map((email) => email.trim());
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (let to of emailList) {
    const mailOptions = {
      to,
      subject,
      attachments: [
        {
          filename: resume.originalname,
          content: resume.buffer,
          contentType: resume.mimetype,
        },
      ],
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to: ${to}`);
    } catch (error) {
      console.error(`Error sending to ${to}:`, error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  res.status(200).json({ success: true, message: 'Emails sent' });
};

module.exports = { sendEmails };