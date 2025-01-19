const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("Setting up the mail transporter...");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kumarharshit2314@gmail.com", // Replace with your email
        pass: "lnnq sewn qkyk uvco", // Replace with your email password or app password
    },
});

console.log("Mailer transporter set up successfully.");

app.post("/send-mail", (req, res) => {
    console.log("Received request to send mail.");
    
    const { name, email, subject, message } = req.body;

    // Logging received data to verify the input
    console.log("Request data:", { name, email, subject, message });

    if (!name || !email || !subject || !message) {
        console.log("Missing required fields in the request.");
        return res.status(400).json({ message: "All fields are required." });
    }

    const mailOptions = {
        from: "kumarharshit@gmail.com",
        to: "kumarharshit2314@gmail.com",
        subject: `Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    console.log("Mail options prepared:", mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending mail:", error);
            return res.status(500).json({ message: "Failed to send email. Please try again." });
        } else {
            console.log("Email sent successfully:", info);
            return res.status(200).json({ message: "Your message has been sent successfully!" });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
