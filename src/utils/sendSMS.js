import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to
    });

    console.log(`📩 SMS sent to ${to}`);
    return true;
  } catch (error) {
    console.error('SMS error:', error.message);
    return false;
  }
};
