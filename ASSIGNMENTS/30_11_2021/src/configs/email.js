
const nodemailer = require('nodemailer');


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "3687ee50a55e5c",
      pass: "fa727c108ba113",
    },
  });