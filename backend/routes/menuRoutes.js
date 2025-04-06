// const express = require("express");
// const multer = require("multer");
// const MenuItem = require("../models/MenuItem"); // Ensure correct model import

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() }); // Adjust storage as needed

// // POST: Add new menu item
// router.post("/add", upload.single("image"), async (req, res) => {
//   try {
//     const { name, price, description, category } = req.body;
    
//     // Validate all required fields
//     if (!name || !price || !description || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newItem = new MenuItem({
//       name,
//       price,
//       description,
//       category,
//       image: req.file ? req.file.buffer.toString("base64") : "", // Adjust image handling
//     });

//     await newItem.save();
//     res.status(201).json({ message: "Menu item added successfully!" });
//   } catch (error) {
//     console.error("Error adding menu item:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;











// const express = require("express");
// const MenuItem = require("../models/MenuItem");

// const router = express.Router();

// // ✅ GET: Fetch all menu items
// router.get("/", async (req, res) => {
//   try {
//     const menuItems = await MenuItem.find();
//     res.json(menuItems);
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // ✅ POST: Add new menu item
// router.post("/add", async (req, res) => {
//   try {
//     const { name, price, description, category, image } = req.body;
    
//     if (!name || !price || !description || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newItem = new MenuItem({
//       name,
//       price,
//       description,
//       category,
//       image,
//     });

//     await newItem.save();
//     res.status(201).json({ message: "Menu item added successfully!" });
//   } catch (error) {
//     console.error("Error adding menu item:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;




















// const express = require('express');
// const router = express.Router();
// const MenuItem = require('../models/MenuItem');
// const multer = require('multer');

// // Configure multer for memory storage
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Add new menu item
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { name, description, category, price, quantity, unit } = req.body;
    
//     // Convert image buffer to base64 string
//     const imageBase64 = req.file.buffer.toString('base64');
//     const imageString = `data:${req.file.mimetype};base64,${imageBase64}`;

//     const newMenuItem = new MenuItem({
//       name,
//       description,
//       category,
//       price: Number(price),
//       quantity: Number(quantity),
//       unit,
//       image: imageString
//     });

//     await newMenuItem.save();
//     res.status(201).json({ message: 'Menu item added successfully', item: newMenuItem });
//   } catch (error) {
//     console.error('Error adding menu item:', error);
//     res.status(500).json({ message: 'Failed to add menu item' });
//   }
// });

// // Update menu item
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { name, description, category, price, quantity, unit } = req.body;
    
//     const updateData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       quantity: Number(quantity),
//       unit
//     };

//     // Only update image if new one is provided
//     if (req.file) {
//       const imageBase64 = req.file.buffer.toString('base64');
//       updateData.image = `data:${req.file.mimetype};base64,${imageBase64}`;
//     }

//     const updatedItem = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ message: 'Menu item not found' });
//     }

//     res.json({ message: 'Menu item updated successfully', item: updatedItem });
//   } catch (error) {
//     console.error('Error updating menu item:', error);
//     res.status(500).json({ message: 'Failed to update menu item' });
//   }
// });

// // Get all menu items
// router.get('/', async (req, res) => {
//   try {
//     const items = await MenuItem.find().sort({ createdAt: -1 });
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching menu items:', error);
//     res.status(500).json({ message: 'Failed to fetch menu items' });
//   }
// });

// // Delete menu item
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
//     if (!deletedItem) {
//       return res.status(404).json({ message: 'Menu item not found' });
//     }
//     res.json({ message: 'Menu item deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting menu item:', error);
//     res.status(500).json({ message: 'Failed to delete menu item' });
//   }
// });

// module.exports = router;















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