// const Stock = require("../models/Stock");

// // ✅ Get All Stock Items
// exports.getAllStock = async (req, res) => {
//   try {
//     const stock = await Stock.find().sort({ lastUpdated: -1 });
//     res.status(200).json(stock);
//   } catch (error) {
//     console.error("❌ Error fetching stock:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // ✅ Add New Stock Item
// exports.addStockItem = async (req, res) => {
//   const { itemName, quantity, unit, pricePerUnit } = req.body;

//   try {
//     const newStock = new Stock({
//       itemName,
//       quantity,
//       unit,
//       pricePerUnit,
//     });

//     await newStock.save();
//     res.status(201).json({ message: "Stock item added successfully!" });
//   } catch (error) {
//     console.error("❌ Error adding stock item:", error);
//     res.status(500).json({ error: "Failed to add stock item" });
//   }
// };

// // ✅ Update Stock Item
// exports.updateStockItem = async (req, res) => {
//   const { id } = req.params;
//   const { itemName, quantity, unit, pricePerUnit } = req.body;

//   try {
//     const updatedStock = await Stock.findByIdAndUpdate(
//       id,
//       { itemName, quantity, unit, pricePerUnit, lastUpdated: Date.now() },
//       { new: true }
//     );

//     if (!updatedStock) {
//       return res.status(404).json({ error: "Stock item not found" });
//     }

//     res.status(200).json({ message: "Stock updated successfully!" });
//   } catch (error) {
//     console.error("❌ Error updating stock:", error);
//     res.status(500).json({ error: "Failed to update stock" });
//   }
// };

// // ✅ Delete Stock Item
// exports.deleteStockItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedStock = await Stock.findByIdAndDelete(id);
//     if (!deletedStock) {
//       return res.status(404).json({ error: "Stock item not found" });
//     }

//     res.status(200).json({ message: "Stock item deleted successfully!" });
//   } catch (error) {
//     console.error("❌ Error deleting stock:", error);
//     res.status(500).json({ error: "Failed to delete stock item" });
//   }
// };
