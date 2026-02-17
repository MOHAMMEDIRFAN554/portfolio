import nodemailer from 'nodemailer';
import { AppConfig } from '../config/environment';

let transporter: nodemailer.Transporter;

export function initializeMailer(config: AppConfig) {
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });
}

export async function sendContactNotification(
  contactEmail: string,
  name: string,
  message: string,
  adminEmail: string
): Promise<void> {
  if (!transporter) {
    console.warn('Mailer not initialized');
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: adminEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
