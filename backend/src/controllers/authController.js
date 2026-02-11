import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { sendOtpEmail } from "../services/emailService.js";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000
    });

    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/* VERIFY OTP */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isVerified)
      return res.status(400).json({ message: "User not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
