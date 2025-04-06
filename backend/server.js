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

//app.use(cors({ origin: "*",  methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(cors({
  origin: [
    'https://nexinbe-cafe-app-s1a1.vercel.app','http://localhost:5173',
    'https://nexinbe-cafe-app-drab.vercel.app',
    'https://nexinbe-cafe-app-8gyx.vercel.app',
    'https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app',
    'https://nexinbe-cafe-app-8gyx-git-main-ravichandra-l-ss-projects.vercel.app/home',
    'https://nexinbe-cafe-app-8gyx-rjqb07r9q-ravichandra-l-ss-projects.vercel.app/home',
  ],
  methods: 'GET, POST, PUT, DELETE, OPTIONS',  // Explicitly allow OPTIONS
  credentials: true,
}));

// Optional: Handle OPTIONS request explicitly (for complex cases)
app.options('*', cors());

// 🔹 Middleware (Correct Order)
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(express.json()); // Handles JSON data

// 🔹 Route Setup
app.use("/api/admin", adminRoutes);  
app.use("/api/auth", userRoutes);  // No multer here, handle in routes
// app.use("/api/stock", stockRoutes);  // No multer here, handle in routes
app.use("/api/menu", menuRoutes);  // No multer here, handle in routes
//app.use('/api/menuitems', menuItemsRouter);

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