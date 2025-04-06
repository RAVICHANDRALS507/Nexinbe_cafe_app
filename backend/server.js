require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes"); // Import stock routes

const app = express();
const upload = multer(); // Initialize Multer

// 🔹 Enable CORS

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://nexinbe-cafe-app-8gyx.vercel.app',
    'https://nexinbe-cafe-app.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add this line after CORS middleware
app.options('*', cors());

// // Add OPTIONS preflight handler
// app.options('*', cors());

// 🔹 Middleware (Correct Order)
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(express.json()); // Handles JSON data

// 🔹 Route Setup
app.use("/api/admin", adminRoutes);  
app.use("/api/auth", userRoutes);  // No multer here, handle in routes
// app.use("/api/stock", stockRoutes);  // No multer here, handle in routes
app.use("/api/menu", menuRoutes);  // No multer here, handle in routes
//app.use('/api/menuitems', menuItemsRouter);

// Add an error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔹 Default Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));