import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice"; // Redux action to add item to cart
import axios from "axios"; // For API requests
import Navbar from "../Navbar"; // Top navigation bar
import UserNavbar from "./UserNavbar"; // User Navbar
import { useNavigate } from "react-router-dom"; // For navigation after order confirmation
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

//const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States to manage menu items, messages, loading status, cart quantity, etc.
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All"); // For category filter
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  // Fetching menu items when component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/menu`);
        setTimeout(() => {
          setMenuItems(response.data); // Save fetched items to state
          setLoading(false);
        }, 1000); // Simulated loading delay
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setMessage({ error: "Failed to load menu items" });
        setLoading(false);
      }
    };
    fetchMenuItems();

    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // Handle Add to Cart button click
  const handleAddToCart = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
    setMessage((prev) => ({ ...prev, [item._id]: `${cartQuantities[item._id] || 1}x ${item.name} added to cart!` }));
    setTimeout(() => {
      setMessage((prev) => ({ ...prev, [item._id]: "" }));
    }, 3000);
  };

  // Handle Order Now button click
  const handleOrderNow = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please log in to place an order");
      navigate("/login");
      return;
    }
    toast.info(`${item.name} has been ordered! Proceeding to checkout.`);
    // Add navigation to checkout or order confirmation page here
  };

  // Quantity increment for cart
  const incrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  // Quantity decrement for cart (minimum 1)
  const decrementQuantity = (id) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // Filter items by category
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Create a list of categories from menu items
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  // Skeleton component while loading
  const MenuItemSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse transition-all duration-300">
      <div className="relative h-28 sm:h-36 bg-gray-200"></div>
      <div className="p-2 sm:p-3 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-8 bg-green-100 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <>
      {/* Conditionally render Navbar or UserNavbar */}
      {isLoggedIn ? <UserNavbar /> : <Navbar />}

      {/* Background and Page Header */}
      <div
        className="relative min-h-screen bg-cover bg-center px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-32 pb-1"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow">
              Explore Our <span className="text-orange-500">Menu</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              Enjoy a variety of delicious meals and beverages
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setLoading(true); // Show loader while changing category
                  setActiveCategory(category);
                  setTimeout(() => setLoading(false), 400); // Simulate loading
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm ${
                  activeCategory === category
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {message.error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
              <p>{message.error}</p>
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-1 mb-8">
            {/* Show loading skeletons */}
            {loading ? (
              Array(8)
                .fill()
                .map((_, index) => <MenuItemSkeleton key={index} />)
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Item Image */}
                  <div className="relative h-28 sm:h-36 overflow-hidden">
                    <img
                      src={
                        item.image?.startsWith("data:image")
                          ? item.image
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ₹{item.price}
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </div>
                  </div>

                  {/* Item Info and Buttons */}
                  <div className="p-2 sm:p-3 flex flex-col flex-grow">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1 mb-3">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white flex items-center justify-center text-gray-600"
                      >
                        -
                      </button>
                      <span className="font-medium text-gray-700">
                        {cartQuantities[item._id] || 1}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white flex items-center justify-center text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm py-2 rounded-lg font-medium transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleOrderNow(item)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm py-2 rounded-lg font-medium transition-all duration-300"
                      >
                        Order Now
                      </button>
                    </div>

                    {/* Confirmation Message */}
                    {message[item._id] && (
                      <p className="text-green-400 text-xs text-center mt-2 animate-bounce">
                        {message[item._id]}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-white text-lg">No items found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
