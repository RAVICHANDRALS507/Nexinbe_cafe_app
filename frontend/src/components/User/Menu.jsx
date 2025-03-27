import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import Skeleton component

const API_BASE_URL = "http://localhost:5000"; // Backend URL

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
        const response = await axios.get(`${API_BASE_URL}/api/menu`);
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
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-4 sm:p-6"
      style={{
        backgroundImage:
          "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
      }}
    >
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Content with Menu Grid */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-5 text-center">
          <span className="text-indigo-500">Select</span>{" "}
          <span className="text-orange-500">Menu</span>
        </h1>

        {/* Error message if fetching fails */}
        {message.error && <p className="text-red-500 text-center">{message.error}</p>}

        {/* ✅ Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // ✅ Skeleton loader for loading state
            Array(8)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-lg flex flex-col items-center bg-white"
                >
                  <Skeleton height={200} width="100%" className="rounded-md mb-4" />
                  <Skeleton width="70%" height={20} className="mb-2" />
                  <Skeleton width="90%" height={15} className="mb-2" />
                  <Skeleton width="50%" height={20} className="mb-2" />
                </div>
              ))
          ) : menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow-lg flex flex-col items-center bg-white"
              >
                {/* ✅ Show Menu Image */}
                {item.image ? (
                  <img
                    src={item.image.startsWith("data:image/jpeg;base64,") ? item.image : "/default-image.jpg"}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
                  />
                ) : (
                  <img
                    src="/default-image.jpg"
                    alt="Default"
                    className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
                  />
                )}

                {/* ✅ Item Details */}
                <h2 className="text-lg font-semibold mt-2 text-center">{item.name}</h2>
                <p className="text-gray-600 text-sm text-center">{item.description}</p>
                <p className="text-xl font-bold mt-2">₹{item.price}</p>

                {/* ✅ Quantity Selector */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    className="bg-gray-300 px-3 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4">{cartQuantities[item._id] || 1}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="bg-gray-300 px-3 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>

                {/* ✅ Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-3 w-full text-center"
                >
                  Add to Cart
                </button>

                {/* ✅ Order Now Button */}
                <button
                  onClick={() => handleOrderNow(item)}
                  className="bg-blue-500 text-white py-2 px-6 rounded-full mt-4 text-center w-full"
                >
                  Order Now
                </button>

                {/* ✅ Success Message */}
                {message[item._id] && (
                  <p className="text-green-700 mt-2 text-sm text-center">{message[item._id]}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full col-span-4">No menu items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
