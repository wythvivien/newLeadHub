import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Configuration
const app = express();
const port = process.env.PORT || 8000;
dotenv.config();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/leads", protect, leadRoutes);

// Middleware for Handling Errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server ${port} Running`));
