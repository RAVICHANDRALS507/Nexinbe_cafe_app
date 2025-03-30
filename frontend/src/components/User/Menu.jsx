import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import Skeleton component
import Navbar from "./Navbar"; // Add this import

// const REACT_APP_BACKEND_URL = "http://localhost:5000";
//const REACT_APP_BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

const Menu = () => {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state

  // ✅ Fetch menu items on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/menu`);
        console.log("Fetched menu items:", response.data);
        setMenuItems(response.data); // Update state with menu items
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setMessage({ error: "Failed to load menu items" });
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // ✅ Add item to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
    setMessage({ ...message, [item._id]: `${item.name} has been added to your cart!` });
    setTimeout(() => {
      setMessage((prev) => ({ ...prev, [item._id]: "" }));
    }, 3000);
  };

  // ✅ Increment quantity
  const incrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  // ✅ Decrement quantity
  const decrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
  };

  // ✅ Handle "Order Now" button click
  const handleOrderNow = (item) => {
    alert(`${item.name} has been ordered! Proceeding to checkout.`);
    // Add navigation to checkout or order confirmation page here
  };

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center p-4 sm:p-8"
        style={{
          backgroundImage:
            "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
          paddingTop: '5rem',
        }}
      >
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

        {/* Main Content */}
        <div className="relative container mx-auto">
          {/* Improved Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-orange-500">Menu</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Discover our delicious selection of food and beverages
            </p>
          </div>

          {/* Error message with improved styling */}
          {message.error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{message.error}</p>
            </div>
          )}

          {/* Menu Grid with improved card design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {loading ? (
              // Enhanced skeleton loader
              Array(8).fill().map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <Skeleton height={200} width="100%" className="rounded-xl mb-4" />
                  <Skeleton width="70%" height={24} className="mb-3" />
                  <Skeleton width="90%" height={18} count={2} className="mb-3" />
                  <Skeleton width="50%" height={24} className="mb-4" />
                  <Skeleton height={40} className="rounded-full mb-2" />
                  <Skeleton height={40} className="rounded-full" />
                </div>
              ))
            ) : menuItems.length > 0 ? (
              menuItems.map((item) => (
                <div key={item._id} 
                     className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  {/* Item Image with improved presentation */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image.startsWith("data:image") ? item.image : "/default-image.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Item Details with improved layout */}
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                    {/* Quantity Selector with improved styling */}
                    <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                      >
                        -
                      </button>
                      <span className="font-medium text-gray-700">{cartQuantities[item._id] || 1}</span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    {/* Action Buttons with improved design */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleOrderNow(item)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
                      >
                        Order Now
                      </button>
                    </div>

                    {/* Success Message with animation */}
                    {message[item._id] && (
                      <div className="mt-3 text-center animate-fade-in">
                        <p className="text-green-600 text-sm bg-green-100 py-2 px-3 rounded-lg">
                          {message[item._id]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-2xl text-white">No menu items available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
