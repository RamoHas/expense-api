import nodemailer from "nodemailer";
import 'dotenv/config';


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });



  export const sendEMail = async(to, subject, text, _html) => {
    const send =await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: subject,
      text: text,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Message</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">

    <!-- Welcome container -->
    <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); text-align: center; max-width: 400px; width: 100%;">

        <!-- Decorative icon -->
        <div style="font-size: 3rem; color: #007bff; margin-bottom: 20px;">👋</div>

        <!-- Welcome heading -->
        <h1 style="color: #333333; font-size: 2.5rem; margin-bottom: 10px;">
            Welcome, <span style="color: #007bff; font-weight: bold;">from OMAR's EXPENSE APP</span>!
        </h1>

        <!-- Welcome message -->
        <p style="color: #666666; font-size: 1.2rem; line-height: 1.6;">
            We're thrilled to have you here. Enjoy your stay and explore everything we have to offer!
        </p>
    </div>

</body>
</html>`
    })

    console.log('email sent', send)
  }