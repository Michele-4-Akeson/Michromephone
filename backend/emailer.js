const nodemailer = require('nodemailer');
require("dotenv/config");


const email = process.env.EMAIL
const pass = process.env.GMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass
  }
});


async function sendServerEmail(toEmail, subject, text){
    const mailOptions = {
        from: email,
        to: toEmail,
        subject: subject,
        text: text
    };

    console.log(mailOptions)

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          return true;
        }
      });

}


module.exports = {sendServerEmail}
