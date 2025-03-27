// const express = require("express");
// const { adminLogin, getUserStats } = require("../controllers/adminController");

// const router = express.Router();

// // ✅ Admin Login
// router.post("/login", adminLogin);

// // ✅ Get User & Admin Stats
// router.get("/dashboard", getUserStats);

// module.exports = router;

const express = require('express');
const Admin = require('../models/Admin');
const { adminLogin, getUserStats } = require("../controllers/adminController");
const router = express.Router();

// ✅ Admin Login
router.post("/login", adminLogin);

// ✅ Get User & Admin Stats
router.get("/dashboard", getUserStats);

// ✅ Route to add a new admin
router.post('/add', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create a new admin
    const newAdmin = new Admin({
      name,
      password,
    });

    await newAdmin.save();

    return res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error adding admin:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route to get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find(); // Fetch all admins from the database
    res.status(200).json(admins); // Return the list of admins
  } catch (error) {
    console.error('Error fetching admins:', error);
    return res.status(500).json({ message: 'Failed to load admins.' });
  }
});

module.exports = router;
