// const mongoose = require("mongoose");

// const stockSchema = new mongoose.Schema({
//   itemName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 0, // Prevents negative stock
//   },
//   unit: {
//     type: String,
//     required: true,
//     enum: ["kg", "liters", "units", "pcs"], // Define valid units
//   },
//   pricePerUnit: {
//     type: Number,
//     required: true,
//   },
//   lastUpdated: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Stock", stockSchema);
