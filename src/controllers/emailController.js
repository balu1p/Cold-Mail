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
    // const mailOptions = {
    //   to,
    //   subject,
    //   attachments: [
    //     {
    //       filename: resume.originalname,
    //       content: resume.buffer,
    //       contentType: resume.mimetype,
    //     },
    //   ],
    // };
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            padding: 20px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p>Your Faithfully, <br/> Balu Patil <br/> 9373402288</p>
        </div>

      </body>
    </html>
  `,
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
  res.status(200).json({ success: true, message: "Emails sent" });
};

module.exports = { sendEmails };
