import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: false,
    },

    number: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Warm", "Cold", "Dead"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
