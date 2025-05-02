const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Validate environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay credentials are not properly configured in environment variables");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Route to create an order
router.post("/checkout", async (req, res) => {
  try {
    const { amount } = req.body;

    // Input validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required"
      });
    }

    // Convert amount to paisa and ensure it's an integer
    const amountInPaisa = Math.round(parseFloat(amount) * 100);

    const options = {
      amount: amountInPaisa,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1 // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      throw new Error("Failed to create order: Invalid response from Razorpay");
    }

    return res.status(200).json({
      success: true,
      order,
      message: "Order created successfully"
    });

  } catch (error) {
    console.error("Razorpay Checkout Error:", error);

    // Handle specific Razorpay errors
    if (error.error && error.error.description) {
      return res.status(400).json({
        success: false,
        message: error.error.description,
        error: error.error
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message
    });
  }
});

// Route to verify payment signature
router.post("/paymentVerification", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, totalAmount, userId } = req.body;

    // Input validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !cartItems || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment verification parameters"
      });
    }

    // Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature, payment verification failed"
      });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (!payment || payment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: "Payment not captured or invalid"
      });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString("en-GB").split("/").map((part) => part.padStart(2, "0")).join("/");
    const time = now.toLocaleTimeString("en-GB", { hour12: false }).padStart(8, "0");

    // Save order in DB
    const order = new Order({
      user: user._id,
      userName: user.name,
      orderId: razorpay_order_id,
      paymentStatus: "Paid",
      paymentId: razorpay_payment_id,
      date,
      time,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalAmount,
      orderStatus: "Processing"
    });
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and order saved successfully!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      orderDbId: order._id
    });

  } catch (error) {
    console.error("Payment Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error during payment verification",
      error: error.message
    });
  }
});

module.exports = router;
