import jwt from "jsonwebtoken";

// Generate a token and set it as cookie
const generateToken = (res, userId) => {
  // Create a JWT 
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set the JWT as a cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
