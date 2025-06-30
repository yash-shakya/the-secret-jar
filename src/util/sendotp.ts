import nodemailer from 'nodemailer'


export async function sendotp(email: string, username: string, otp: string) {
  const html = `<div>
      <h1>Welcome, ${username}! </h1>
      <div>
        <h4>Your OTP is ${otp}</h4>
      </div>
    </div>`

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
  auth: {
    type: "OAuth2",
    user: "thesecretjar40@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
    });

    const info = await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Your OTP",
      text: `Hello ${username}! Your OTP is ${otp}.`,
      html,
    });
    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error;
  }
}
