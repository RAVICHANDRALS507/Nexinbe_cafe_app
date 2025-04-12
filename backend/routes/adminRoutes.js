const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const router = express.Router();
const { adminLogin, getUserStats } = require("../controllers/adminController");

// Admin Login
router.post("/login", adminLogin);

// Get User & Admin Stats
router.get("/dashboard", getUserStats);

// Add New Admin
router.post("/add", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Admin
router.put("/update/:id", async (req, res) => {
  const { name, password } = req.body;
  const updateData = { name };
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Admin
router.delete("/delete/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the existing admins route to include _id
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find().select('_id name createdAtDate createdAtTime');
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Failed to load admins.' });
  }
});

// Add this new route for password verification
router.post('/verify-password', async (req, res) => {
  try {
    const { adminId, currentPassword } = req.body;
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isValid = await admin.comparePassword(currentPassword);
    res.json({ isValid });
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).json({ message: 'Failed to verify password' });
  }
});

module.exports = router;