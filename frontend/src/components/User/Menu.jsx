import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

//const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ssprojects.vercel.app";
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch all menu items on mount
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
  }, []);

  const handleAddToCart = (item) => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      //alert("Please log in to add items to cart");
      toast.warn("Please log in to add items to cart");
      
      navigate("/login");
      return;
    }

    // If logged in, add to cart with quantity
    dispatch(addToCart({
      ...item,
      quantity: cartQuantities[item._id] || 1
    }));

    // Set success message to display below the "Order Now" button
    setMessage({
      ...message,
      [item._id]: `${cartQuantities[item._id] || 1}x ${item.name} added to cart!`
    });
    setTimeout(() => {
      setMessage((prev) => ({ ...prev, [item._id]: "" }));
    }, 3000);
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

  const handleOrderNow = (item) => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    alert(`${item.name} has been ordered! Proceeding to checkout.`);
    // Add navigation to checkout or order confirmation page here
  };

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const MenuItemSkeleton = () => (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-pulse transition all duration-300">
      <div className="relative h-48 bg-gray-200"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex items-center justify-between h-8 bg-gray-100 rounded-lg px-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-8 bg-gray-200 rounded-md"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-green-100 rounded-lg"></div>
          <div className="h-10 bg-blue-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center p-4 sm:p-8 bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-15172481354674c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
          paddingTop: "5rem",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm"></div>

        <div className="relative container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Our <span className="text-orange-500">Menu</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Discover our delicious selection of food and beverages
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setLoading(true);
                  setActiveCategory(category);
                  setTimeout(() => {
                    setLoading(false);
                  }, 600); // Delay to show skeleton on category change
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                  ${activeCategory === category
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {message.error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded backdrop-blur-sm">
              <p>{message.error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {loading ? (
              Array(8)
                .fill()
                .map((_, index) => (
                  <div key={index} className="transition-opacity duration-300 ease-out">
                    <MenuItemSkeleton />
                  </div>
                ))
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        item.image.startsWith("data:image")
                          ? item.image
                          : "/default-image.jpg"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to transparent"></div>
                    <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      ₹{item.price}
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-2">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text white flex items-center justify-center text-gray-600"
                      >
                        -
                      </button>
                      <span className="font-medium text-gray-700">
                        {cartQuantities[item._id] || 1}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text white flex items-center justify-center text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleOrderNow(item)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font medium transition-all duration-300"
                      >
                        Order Now
                      </button>
                    </div>

                    {message[item._id] && (
                      <div className="mt-3 text-center">
                        <p className="text-green-600 text-sm bg-green-100 py-2 px-3 rounded-lg animate bounce">
                          {message[item._id]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-2xl text-white">No items in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;