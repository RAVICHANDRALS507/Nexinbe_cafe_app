require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const upload = multer(); // Initialize Multer

// Enable CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://nexinbe-cafe-app-8gyx.vercel.app',
      'https://nexinbe-cafe-app.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Middleware (Correct Order)
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(express.json()); // Handles JSON data

// Route Setup
app.use("/api/auth", userRoutes); // For authentication routes
app.use("/api/admin", adminRoutes); // For admin routes
app.use("/api/menu", menuRoutes); // For menu routes

// Add an error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Export the Express app as a Vercel serverless function
module.exports = app;
