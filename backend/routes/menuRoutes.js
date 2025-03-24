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


const express = require("express");
const multer = require("multer");
const MenuItem = require("../models/MenuItem");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Memory storage for images

// Route to fetch all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Fetching all items from MongoDB
    console.log("Fetched menu items from DB:", menuItems); // Log to check if the database is being queried
    res.json(menuItems); // Sending data as JSON response
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to add a menu item (for admin use)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category || !req.file) {
      return res.status(400).json({ message: "All fields including an image are required" });
    }

    // Create a new menu item with the provided data
    const newItem = new MenuItem({
      name,
      price: parseFloat(price),
      description,
      category,
      image: `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`, // Handle image as base64
    });

    // Save the new item to MongoDB
    await newItem.save();
    res.status(201).json({ message: "Menu item added successfully!" });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update an existing menu item (for admin use)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const image = req.file ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}` : undefined;

    const updatedItem = await MenuItem.findByIdAndUpdate(id, {
      name,
      price: parseFloat(price),
      description,
      category,
      image: image || undefined, // Only update image if provided
    }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item updated successfully!" });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete a menu item by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id); // Delete the item from MongoDB

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" }); // Item not found
    }

    res.status(200).json({ message: "Menu item deleted successfully!" }); // Successfully deleted
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router; // Export the router
