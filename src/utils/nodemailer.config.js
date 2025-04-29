const nodemailer = require('nodemailer');
const { Verification_Email_Template } = require('./emailTemplate');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'yahoo', 'outlook', etc.
    auth: {

        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

const sendEmail = async (to, username, code) => {
    try {
        const mailOptions = {
            from: `"BLOG-API" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify your email",
            text: `Your verification code is ${code} `,
            html: Verification_Email_Template.replace("{verificationCode}", code).replace("{username}", username),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

module.exports = { transporter, sendEmail };

