const axios = require('axios');

const sendOtpEmail = async (email, otp) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  const senderEmail = process.env.SENDGRID_FROM_EMAIL || "harishharish20060601@gmail.com";

  // For development/testing: log the OTP so we can see it even if email fails
  console.log(`\n================================`);
  console.log(`DEV MODE OTP for ${email}: ${otp}`);
  console.log(`================================\n`);

  if (!apiKey) {
    console.warn("SendGrid API key is missing. Email not sent.");
    return;
  }

  const url = "https://api.sendgrid.com/v3/mail/send";

  const data = {
    personalizations: [
      {
        to: [{ email: email }],
        subject: "TutorBridge OTP Verification"
      }
    ],
    from: { email: senderEmail, name: "TutorBridge" },
    content: [
      {
        type: "text/html",
        value: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
      }
    ]
  };

  try {
    await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("OTP email sent successfully via SendGrid to", email);
    return true;
  } catch (error) {
    console.error("SendGrid API error:", error.response?.data || error.message);
    return false;
  }
};

module.exports = { sendOtpEmail };
