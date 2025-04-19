import { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from "react-redux"; 
import { removeFromCart, clearCart, updateQuantity } from "../../redux/Cartslice"; 
import { Link, useNavigate } from "react-router-dom"; 
import Navbar from "../Navbar"; 
import UserNavbar from "./UserNavbar"; 
import { motion, AnimatePresence } from "framer-motion"; 
const Cart = () => { 
const navigate = useNavigate(); 
const dispatch = useDispatch(); 
const cartItems = useSelector((state) => state.cart.cartItems); 
const [isLoggedIn, setIsLoggedIn] = useState(false); 
const [selectedCategory, setSelectedCategory] = useState("all"); 
useEffect(() => { 
const token = localStorage.getItem("token"); 
setIsLoggedIn(!!token); 
}, []); 
// Get unique categories 
const categories = ["all", ...new Set(cartItems.map(item => item.category))]; 
// Filter items by category 
const filteredItems = selectedCategory === "all"  
? cartItems  
    : cartItems.filter(item => item.category === selectedCategory); 
 
  const total = cartItems.reduce( 
    (sum, item) => sum + item.price * item.quantity, 
    0 
  ); 
 
  const handleRemove = (itemId) => { 
    dispatch(removeFromCart(itemId)); 
  }; 
 
  const handleQuantityChange = (itemId, newQuantity) => { 
    if (newQuantity >= 1) { 
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity })); 
    } 
  }; 
 
  const handlePayment = () => { 
    navigate('/payment', { state: { amount: total } }); 
  }; 
 
  return ( 
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-0"> 
      {isLoggedIn ? <UserNavbar /> : <Navbar />} 
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-16"> 
        {/* Header with Back Button */} 
        <div className="flex items-center justify-between mb-6"> 
          <Link 
            to="/menu" 
            className="flex items-center text-gray-600 hover:text-orange-500 transition
colors" 
          > 
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
            > 
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              /> 
            </svg> 
            Back to Menu 
          </Link> 
          <h1 className="text-2xl font-bold"> 
            Your <span className="text-orange-500">Cart</span> 
          </h1> 
        </div> 
 
        {cartItems.length === 0 ? ( 
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center"> 
            <img 
              src="https://illustrations.popsy.co/amber/taking-notes.svg" 
              alt="Empty cart" 
              className="w-48 h-48 mx-auto mb-4" 
            /> 
            <h2 className="text-xl font-semibold text-gray-800 mb-3"> 
              Your cart is empty 
            </h2> 
            <p className="text-gray-600 mb-6"> 
              Looks like you haven't added anything yet. 
            </p> 
            <Link 
              to="/menu" 
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full 
font-semibold hover:bg-orange-600 transition-all duration-300" 
            > 
              Browse Menu 
            </Link> 
          </div> 
        ) : ( 
          <div className="flex flex-col lg:flex-row gap-8"> 
            {/* Main Content - Cart Items */} 
            <div className="flex-1"> 
              {/* Category Tabs - Horizontal Scrollable on Mobile */} 
              <div className="mb-4 -mx-4 px-4 overflow-x-auto sticky top-16 bg-gray-50 
py-2 z-10"> 
                <div className="flex space-x-2 min-w-max"> 
                  {categories.map((category) => ( 
                    <button 
                      key={category} 
                      onClick={() => setSelectedCategory(category)} 
                      className={`px-4 py-2 rounded-full text-sm font-medium transition
colors whitespace-nowrap 
                        ${selectedCategory === category 
                          ? "bg-orange-500 text-white" 
                          : "bg-white text-gray-600 hover:bg-orange-100" 
                        }`} 
                    > 
                      {category.charAt(0).toUpperCase() + category.slice(1)} 
                    </button> 
                  ))} 
                </div> 
              </div> 
 
              <div className="space-y-4"> 
                <AnimatePresence> 
                  {filteredItems.map((item) => ( 
                    <motion.div 
                      key={item._id} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, x: -100 }} 
                      className="bg-white rounded-xl shadow-sm overflow-hidden" 
                    > 
                      <div className="flex flex-row items-center"> 
                        {/* Image */} 
                        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0"> 
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          /> 
                        </div> 
 
                        {/* Content */} 
                        <div className="flex-grow p-3 md:p-4"> 
                          <div className="flex justify-between items-start"> 
                            <div> 
                              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1"> 
                                {item.name} 
                              </h3> 
                              <p className="text-xs md:text-sm text-gray-600 line-clamp-2"> 
                                {item.description} 
                              </p> 
                            </div> 
                            <button 
                              onClick={() => handleRemove(item._id)} 
                              className="text-red-500 hover:text-red-600 p-2" 
                            > 
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                              > 
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995
1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                /> 
                              </svg> 
                            </button> 
                          </div> 
 
                          <div className="flex justify-between items-center mt-2 md:mt-3"> 
                            <div className="flex items-center space-x-2 md:space-x-3"> 
                              <button 
                                onClick={() => 
                                  handleQuantityChange(item._id, item.quantity - 1) 
                                } 
                                className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-100 
hover:bg-orange-500 hover:text-white flex items-center justify-center" 
                              > 
                                - 
                              </button> 
                              <span className="font-medium text-gray-800 w-4 text-center"> 
                                {item.quantity} 
                              </span> 
                              <button 
                                onClick={() => 
                                  handleQuantityChange(item._id, item.quantity + 1) 
                                } 
                                className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-100 
hover:bg-orange-500 hover:text-white flex items-center justify-center" 
                              > 
                                + 
                              </button> 
                            </div> 
                            <div className="text-base md:text-lg font-bold text-orange-500"> 
                              ₹{(item.price * item.quantity).toFixed(2)} 
                            </div> 
                          </div> 
                        </div> 
                      </div> 
                    </motion.div> 
                  ))} 
                </AnimatePresence> 
              </div> 
            </div> 
 
            {/* Desktop Order Summary */} 
            <div className="hidden lg:block w-96"> 
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"> 
                <h2 className="text-xl font-bold mb-4">Order Summary</h2> 
                <div className="space-y-3"> 
                  <div className="flex justify-between text-gray-600"> 
                    <span>Subtotal</span> 
                    <span>₹{total.toFixed(2)}</span> 
                  </div> 
                  <div className="border-t pt-3"> 
                    <div className="flex justify-between text-lg font-bold"> 
                      <span>Total</span> 
                      <span className="text-orange-500">₹{total.toFixed(2)}</span> 
                    </div> 
                  </div> 
                </div> 
                <button 
                  onClick={handlePayment} 
                  className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font
semibold hover:bg-orange-600 transition-colors" 
                > 
                  Proceed to Pay 
                </button> 
              </div> 
            </div> 
 
            {/* Mobile Order Summary */} 
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 
lg:hidden"> 
              <div className="flex justify-between items-center mb-3"> 
                <span className="text-gray-600">Total Amount</span> 
                <span className="text-xl font-bold text-orange
500">₹{total.toFixed(2)}</span> 
              </div> 
              <button 
                onClick={handlePayment} 
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold 
hover:bg-orange-600 transition-colors" 
              > 
                Proceed to Pay 
              </button> 
            </div> 
          </div> 
        )} 
      </div> 
</div> 
); 
}; 
export default Cart;