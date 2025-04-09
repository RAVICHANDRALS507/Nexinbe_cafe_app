const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const multer = require('multer');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Add new menu item
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, quantity, unit, isFeatured } = req.body; // Include isFeatured

    // Convert image buffer to base64 string
    const imageBase64 = req.file.buffer.toString('base64');
    const imageString = `data:${req.file.mimetype};base64,${imageBase64}`;

    const newMenuItem = new MenuItem({
      name,
      description,
      category,
      price: Number(price),
      quantity: Number(quantity),
      unit,
      image: imageString,
      isFeatured: isFeatured === 'true' // Convert string to boolean if needed
    });

    await newMenuItem.save();
    res.status(201).json({ message: 'Menu item added successfully', item: newMenuItem });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ message: 'Failed to add menu item' });
  }
});

// Update menu item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, quantity, unit, isFeatured } = req.body; // Include isFeatured

    const updateData = {
      name,
      description,
      category,
      price: Number(price),
      quantity: Number(quantity),
      unit,
      isFeatured: isFeatured === 'true' // Convert string to boolean if needed
    };

    // Only update image if new one is provided
    if (req.file) {
      const imageBase64 = req.file.buffer.toString('base64');
      updateData.image = `data:${req.file.mimetype};base64,${imageBase64}`;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item updated successfully', item: updatedItem });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Failed to update menu item' });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Failed to delete menu item' });
  }
});

module.exports = router;