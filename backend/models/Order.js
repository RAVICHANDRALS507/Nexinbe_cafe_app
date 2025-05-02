const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, default: 'Paid' },
  paymentId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  total: { type: Number, required: true },
  orderStatus: { type: String, default: 'Processing' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);