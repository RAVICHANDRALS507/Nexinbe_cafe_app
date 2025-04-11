import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../../redux/Cartslice"; // Ensure `clearCart` is imported
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import UserNavbar from "./UserNavbar"; // Import the UserNavbar
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  // Check login status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if token exists in localStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle remove item
  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart()); // Clear cart after order is placed
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditionally render UserNavbar if logged in, else render Navbar */}
      {isLoggedIn ? <UserNavbar /> : <Navbar />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12"> {/* Add mt-12 here to add margin-top */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-8">
              Your <span className="text-orange-500">Cart</span>
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <img
                  src="https://illustrations.popsy.co/amber/taking-notes.svg"
                  alt="Empty cart"
                  className="w-64 h-64 mx-auto mb-6"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/menu"
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="relative w-full sm:w-48 h-48">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {item.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4">
                                {item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="text-red-500 hover:text-red-600 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all duration-300"
                              >
                                -
                              </button>
                              <span className="font-medium text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all duration-300"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-xl font-bold text-orange-500">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          {cartItems.length > 0 && (
            <div className="w-full md:w-96">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-orange-500">
                        ₹{total.toFixed(2)} {/* Removed delivery fee */}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105  
                    ${isCheckingOut ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"}`}
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Success Modal */}
        {orderPlaced && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for your order. Your food will be delivered soon!
              </p>
              <Link
                to="/menu"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                onClick={() => setOrderPlaced(false)}
              >
                Back to Menu
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
