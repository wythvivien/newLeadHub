import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating a structure of data => User model (OOP)
const userSchema = new mongoose.Schema(
  // Data Structure
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    company: {
      type: String,
    },
    
    password: {
      type: String,
      required: true,
    },
  },
  // Timestamp for createdAt and updatedAt
  {
    timestamps: true,
  }
);

// Pre-save hook middleware function for hashing the password
userSchema.pre(
  "save", async function (next) {
    // Checks if the password is modified
    if (!this.isModified("password")) {
      // Proceed with save
      return next();
    }

    // Generates salt for hashing password (encryption)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  });

// Comparing the entered password with the stored password
userSchema.methods.matchPassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Model Creation
const User = mongoose.model("User", userSchema);

export default User;
