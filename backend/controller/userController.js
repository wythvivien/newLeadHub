import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Authenticate user or Set Token
// route    POST /api/users/auth
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  // Extracting the email and password of data submitted
  const { email, password } = req.body;
  // Search for the submitted email in the database
  const user = await User.findOne({ email });

  // Checking if the user exists and the password match to login
  if (user && (await user.matchPassword(password))) {
    // Generating a token
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register New User
// route    POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  // Extracting the name, email and password of data submitted
  const { name, email, company, password } = req.body;
  // Search for the submitted email in the database
  const userExist = await User.findOne({ email });

  // Checking if the user already exist
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // If not yet existing, create a new record into the database
  const user = await User.create({ name, email, company, password });

  // Generating token when created
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  // Removing the cookie from the browser
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  // Retrieving the user information
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    company: req.user.company
  };
  res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  // Finding the User in the Database
  const user = await User.findById(req.user._id);

  // Update user properties with values from request body
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.company = req.body.company || user.company;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      company: updatedUser.company
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
