import twilio from 'twilio';

/**
 * Initialize Twilio client
 * ------------------------
 * Uses Account SID + Auth Token from environment variables.
 * This client is reused for all SMS sends.
 */
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * sendSMS
 * -------
 * Sends an SMS message using Twilio.
 *
 * @param {string} to - Recipient phone number (E.164 format, e.g. +15551234567)
 * @param {string} message - SMS body text
 *
 * @returns {boolean} true if SMS sent successfully, false otherwise
 *
 * Used in:
 * - Cron job (auto medication reminders)
 * - Manual reminder creation (optional)
 */
export const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE, // your Twilio phone number
      to
    });

    console.log(`📩 SMS sent to ${to}`);
    return true;
  } catch (error) {
    console.error('SMS error:', error.message);
    return false;
  }
};
