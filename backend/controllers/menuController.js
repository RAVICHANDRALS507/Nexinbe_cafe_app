// const path = require("path");
// const MenuItem = require("../models/MenuItem");

// exports.addMenuItem = async (req, res) => {
//   try {
//     const { name, description, category, price, availability } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const newMenuItem = new MenuItem({
//       name,
//       description,
//       category,
//       price,
//       availability,
//       image,
//     });

//     await newMenuItem.save();
//     res.status(201).json({ message: "Menu item added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add menu item" });
//   }
// };


const MenuItem = require("../models/MenuItem");

const addMenuItem = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Log the request body

    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required." });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return res.status(400).json({ error: "Price must be a number." });
    }

    const newItem = new MenuItem({ name, price: numericPrice });
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully!", newItem });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addMenuItem };
