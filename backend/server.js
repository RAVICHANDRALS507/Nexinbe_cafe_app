require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Configure CORS for local development and GitHub Pages
const corsOptions = {
  origin: ["https://ravichandrals507.github.io/Nexinbe_cafe_app"], // Allow local and GitHub Pages frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));









// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// // Middleware for JSON parsing
// app.use(express.json());

// // Enable CORS globally (allowing access from any domain)
// app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE", credentials: true }));

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use("/api/admin", adminRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
