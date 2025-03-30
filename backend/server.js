// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// // Middleware for JSON parsing
// app.use(express.json());

// // Configure CORS for local development and GitHub Pages
// const corsOptions = {
//   origin: ["https://ravichandrals507.github.io/Nexinbe_cafe_app"], // Allow local and GitHub Pages frontend
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true, // Allow cookies and authorization headers
// };
// app.use(cors(corsOptions));

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
//app.use(cors({ origin: "https://nexinbe-cafe-app-s1a1.vercel.app/",  methods: "GET,POST,PUT,DELETE", credentials: true }));


//app.use(cors({ origin: "*",  methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(cors({ origin: ['https://nexinbe-cafe-app-8gyx.vercel.app/home'],  methods: "GET,POST,PUT,DELETE", credentials: true }));
//app.use(cors({ origin: ['https://nexinbe-cafe-app-8gyx.vercel.app/home'],  methods: "GET,POST,PUT,DELETE", credentials: true }));


// 🔹 Middleware (Correct Order)
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(express.json()); // Handles JSON data

// 🔹 Route Setup
app.use("/api/admin", adminRoutes);  
app.use("/api/auth",userRoutes);  // No multer here, handle in routes
//app.use("/api/stock",stockRoutes);  // No multer here, handle in routes
app.use("/api/menu", menuRoutes);  // No multer here, handle in routes

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





// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const adminRoutes = require("./routes/adminRoutes"); // Admin routes
// const menuRoutes = require("./routes/menuRoutes"); // Menu routes

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Use routes
// app.use("/api/admin", adminRoutes); // Admin endpoints
// app.use("/api", menuRoutes); // Menu endpoints

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
//   .catch((error) => console.log(error));
