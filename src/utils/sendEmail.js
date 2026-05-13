import nodemailer from 'nodemailer';

/**
 * sendEmail
 * ---------
 * Sends an email using Nodemailer with SMTP credentials.
 *
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} html - HTML content of the email
 *
 * @returns {boolean} true if email sent successfully, false otherwise
 *
 * How it works:
 * - Creates a reusable SMTP transporter using environment variables
 * - Sends an email with HTML content
 * - Logs success or failure
 *
 * Used in:
 * - Cron job (auto medication reminders)
 * - Manual reminder creation (optional)
 */
export const sendEmail = async (to, subject, html) => {
  try {
    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,   // e.g., smtp.gmail.com
      port: process.env.EMAIL_PORT,   // e.g., 587
      secure: false,                  // false for TLS (587), true for SSL (465)
      auth: {
        user: process.env.EMAIL_USER, // email address
        pass: process.env.EMAIL_PASS  // app password or SMTP password
      }
    });

    // Send the email
    await transporter.sendMail({
      from: `"Medication Assistant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log(`📧 Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Email error:', error.message);
    return false;
  }
};
