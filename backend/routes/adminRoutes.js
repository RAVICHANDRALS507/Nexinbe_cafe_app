const express = require('express');
const bcrypt = require('bcryptjs'); // Add this import
const Admin = require('../models/Admin');
const { adminLogin, getUserStats } = require("../controllers/adminController");
const router = express.Router();

//  Admin Login
router.post("/login", adminLogin);

//  Get User & Admin Stats
router.get("/dashboard", getUserStats);

//  Route to add a new admin
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

// Update the existing update route to handle password updates
router.put('/update/:id', async (req, res) => {
  try {
    const { name, password } = req.body;
    let updateData = { name };

    // Only update password if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Failed to update admin' });
  }
});

// Delete admin route
router.delete('/delete/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Failed to delete admin' });
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