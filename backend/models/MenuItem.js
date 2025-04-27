const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['NonVeg', 'Drinks', 'Food', 'Desserts', 'Others'] // 👈 updated here
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'liters', 'units', 'pcs', 'others']
  },
  image: {
    type: String,  // Store base64 string
    required: true
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
