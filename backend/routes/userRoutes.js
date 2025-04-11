const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const User = require("../models/User"); // Import your User model

// Register User Route
router.post("/register", registerUser);

// Login User Route
router.post("/login", loginUser);

router.get("/profile", async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the token payload

    // Fetch the user from the database
    const user = await User.findById(userId).select("name email"); // Fetch only the name and email fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's name
    res.json({ name: user.name });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
