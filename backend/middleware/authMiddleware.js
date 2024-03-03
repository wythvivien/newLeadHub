import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Middleware to protect authentication routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Retrieve JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verification of JWT using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Retrieve user information from the database based on the decoded user ID
      req.user = await User.findById(decoded.userId).select("-password");
      next();

    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
