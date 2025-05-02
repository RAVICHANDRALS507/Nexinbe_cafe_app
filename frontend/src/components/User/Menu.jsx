import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";
import axios from "axios";
import Navbar from "../Navbar";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// ✅ Backend API URL
//const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/menu`);
        setTimeout(() => {
          setMenuItems(response.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setMessage({ error: "Failed to load menu items" });
        setLoading(false);
      }
    };
    fetchMenuItems();

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAddToCart = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
    setMessage((prev) => ({
      ...prev,
      [item._id]: `${cartQuantities[item._id] || 1}x ${item.name} added to cart!`,
    }));
    setTimeout(() => {
      setMessage((prev) => ({ ...prev, [item._id]: "" }));
    }, 3000);
  };

  const handleOrderNow = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please log in to place an order");
      navigate("/login");
      return;
    }
    toast.info(`${item.name} has been ordered! Proceeding to checkout.`);
    const quantity = cartQuantities[item._id] || 1;
    navigate('/payment', {
      state: {
        amount: item.price * quantity,
        cartItems: [
          {
            ...item,
            quantity,
          },
        ],
      },
    });
  };

  const incrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrementQuantity = (id) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

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
      {isLoggedIn ? <UserNavbar /> : <Navbar />}

      <div
        className="relative min-h-screen bg-cover bg-center px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-32 pb-1"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 container mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow">
              Explore Our <span className="text-orange-500">Menu</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              Enjoy a variety of delicious meals and beverages
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setLoading(true);
                  setActiveCategory(category);
                  setTimeout(() => setLoading(false), 400);
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

          {message.error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
              <p>{message.error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-1 mb-8">
            {loading ? (
              Array(10)
                .fill()
                .map((_, index) => <MenuItemSkeleton key={index} />)
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
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

                  <div className="p-2 sm:p-3 flex flex-col flex-grow">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1 mb-3">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white text-gray-700 text-xl font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">
                        {cartQuantities[item._id] || 1}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white text-gray-700 text-xl font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-2 mb-1">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-green-100 text-green-700 hover:bg-green-200 text-xs sm:text-sm font-semibold rounded-md py-1.5 px-3 transition-all duration-300 flex-1"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleOrderNow(item)}
                        className="bg-orange-500 text-white hover:bg-orange-600 text-xs sm:text-sm font-semibold rounded-md py-1.5 px-3 transition-all duration-300 flex-1"
                      >
                        Order Now
                      </button>
                    </div>

                    {message[item._id] && (
                      <div className="text-xs text-green-600 mt-1">
                        {message[item._id]}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center col-span-full">
                No menu items available in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
