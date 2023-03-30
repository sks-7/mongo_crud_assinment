const express = require('express');
const emailControler = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: false,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

emailControler.post('/post', async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.SMPT_HOST,
      to: process.env.SMPT_TO,
      subject: 'Sending row data',
      text: JSON.stringify(req.body),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent and task information saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

module.exports = { emailControler };
