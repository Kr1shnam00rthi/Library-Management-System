/* Module to handle sending mail */

const nodemailer = require("nodemailer");
require("dotenv").config();

// Function to send an email
async function sendMail(recipientEmail, subject, message) {
    try {
        let senderMail = process.env.sender_email;
        let password = process.env.email_app_password;
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderMail,
                pass: password,
            },
        });

        let mailOptions = {
            from: senderMail,
            to: recipientEmail,
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}

module.exports = { sendMail };