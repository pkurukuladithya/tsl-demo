import User from "../models/User.js";
import { sendTokenCookie } from "../utils/token.js";

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  mobile: user.mobile
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = String(email).toLowerCase();
    const normalizedMobile = String(mobile).trim();
    const existing = await User.findOne({
      $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }]
    });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      mobile: normalizedMobile,
      password
    });

    sendTokenCookie(res, user._id);
    return res.status(201).json({ user: formatUser(user) });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { identifier, email, mobile, password } = req.body;
    const lookup = identifier || email || mobile;

    if (!lookup || !password) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    const normalizedLookup = String(lookup).toLowerCase();
    const user = await User.findOne({
      $or: [{ email: normalizedLookup }, { mobile: String(lookup).trim() }]
    }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    sendTokenCookie(res, user._id);
    return res.json({ user: formatUser(user) });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res) => {
  res.json({ user: formatUser(req.user) });
};

export const logoutUser = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: isProd ? "none" : "lax",
    secure: isProd
  });
  res.json({ message: "Logged out" });
};
