let client = null;

const getClient = () => {
  if (!client) {
    const twilio = require("twilio");
    client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  return client;
};

exports.sendSMS = async (to, body) => {
  try {
    const message = await getClient().messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("SMS sent:", message.sid);
    return message;
  } catch (err) {
    console.error("SMS error:", err.message);
  }
};