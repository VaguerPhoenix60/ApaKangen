const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'YOUR_EMAIL_SERVICE',
    auth: {
        user: 'YOUR_EMAIL',
        pass: 'YOUR_EMAIL_PASSWORD'
    }
});

const mailOptions = {
    from: 'YOUR_EMAIL',
    to: 'USER_EMAIL',
    subject: 'PDF file',
    text: 'Please find attached the PDF file',
    attachments: [{
        filename: 'file.pdf',
        path: 'path/to/file.pdf'
    }]
};

app.post('/send-email', (req, res) => {
    const email = req.body.email;
    mailOptions.to = email;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendFile(__dirname + '/public/success.html');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
