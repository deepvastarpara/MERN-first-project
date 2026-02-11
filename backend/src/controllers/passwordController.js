import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendOtpEmail } from "../services/emailService.js";

/* SEND RESET OTP */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOtp = otp;
  user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendOtpEmail(email, otp, "reset");

  res.json({ message: "Reset OTP sent to email" });
};

/* VERIFY RESET OTP */
export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (
    user.resetOtp !== otp ||
    user.resetOtpExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified" });
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (
    user.resetOtp !== otp ||
    user.resetOtpExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOtp = null;
  user.resetOtpExpiry = null;

  await user.save();

  res.json({ message: "Password reset successfully" });
};
