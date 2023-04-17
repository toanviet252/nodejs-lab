import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodeMailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT || 2525,
  secure: false,
  auth: {
    user: process.env.MAILER_AUTH_USER,
    pass: process.env.MAILER_AUTH_PASS,
  },
});
