const express = require("express");
const multer = require("multer");
const MenuItem = require("../models/MenuItem"); // Ensure correct model import

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Adjust storage as needed

// POST: Add new menu item
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    
    // Validate all required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({
      name,
      price,
      description,
      category,
      image: req.file ? req.file.buffer.toString("base64") : "", // Adjust image handling
    });

    await newItem.save();
    res.status(201).json({ message: "Menu item added successfully!" });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
