const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Helper function to format date and time
const getFormattedDateTime = () => {
  const now = new Date();
  const date = now
    .toLocaleDateString("en-GB")
    .split("/")
    .map((part) => part.padStart(2, "0"))
    .join("/"); // Formats dd/mm/yy

  const time = now
    .toLocaleTimeString("en-GB", {
      hour12: false,
    })
    .padStart(8, "0"); // Formats hh:mm:ss

  return { date, time };
};

// ✅ Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, number, password } = req.body;
  console.log("Incoming Registration Data:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("Checking if user exists:", existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Get formatted date and time
    const { date, time } = getFormattedDateTime();
    console.log(`Date: ${date}, ⏰ Time: ${time}`);

    // Create a new user
    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
      createdAtDate: date,
      createdAtTime: time,
    });
    console.log("New User Object Created:", newUser);

    await newUser.save();
    console.log("User registered successfully!");
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Incoming Login Data:", req.body);

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log("Found User:", user);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("JWT Token Generated Successfully");

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};