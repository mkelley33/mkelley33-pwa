import nodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodeMailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_SMTP,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
} as SMTPTransport.Options);

export default transporter;
