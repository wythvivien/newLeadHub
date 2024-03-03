import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },

    due: {
        type: Date(),
        required: true
    }
})