const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Vous pouvez utiliser d'autres services de messagerie
        auth: {
            user: process.env.EMAIL, // Votre email
            pass: process.env.EMAIL_PASSWORD, // Votre mot de passe
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL, // Votre email pour recevoir les messages
        subject: `Contact form submission from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending message');
    }
});

module.exports = router;
