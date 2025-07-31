import "dotenv/config";
import nodemailer from "nodemailer";
export const sendMail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"AI Ticket Assistant" <from@example.com>',
      to: email,
      subject: subject,
      text: message,
    });
    console.log("Message Sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("This is the Mail error ", error);
    throw error;
  }
};
