const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
});

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
