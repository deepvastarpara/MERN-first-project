import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp, type = "verify") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const subject =
    type === "reset" ? "Password Reset OTP" : "Email Verification OTP";


  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`
  });
};
