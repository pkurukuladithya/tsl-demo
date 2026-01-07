import jwt from "jsonwebtoken";

const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

export const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

export const sendTokenCookie = (res, userId) => {
  const token = signToken(userId);
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: oneWeekMs
  });

  return token;
};
