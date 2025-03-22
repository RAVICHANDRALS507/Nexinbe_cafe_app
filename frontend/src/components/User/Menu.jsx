// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/Cartslice";
// import { useState } from "react";

// const initialMenuItems = [
//   { id: 1, name: "Espresso", price: 120, image: "/images/espresso.jpg", description: "A strong and bold coffee shot." },
//   { id: 2, name: "Cheeseburger", price: 200, image: "/images/cheeseburger.jpg", description: "Juicy beef patty with melted cheese." },
//   { id: 3, name: "Caesar Salad", price: 180, image: "/images/caesar_salad.jpg", description: "Crisp romaine lettuce with Caesar dressing." },
//   { id: 4, name: "Margherita Pizza", price: 250, image: "/images/margherita_pizza.jpg", description: "Classic pizza with fresh mozzarella and basil." },
//   { id: 5, name: "Chocolate Cake", price: 150, image: "/images/chocolate_cake.jpg", description: "Rich and moist chocolate cake with frosting." },
// ];

// const Menu = () => {
//   const dispatch = useDispatch();
//   const [menuItems] = useState(initialMenuItems);
//   const [message, setMessage] = useState({});
//   const [cartQuantities, setCartQuantities] = useState({});

//   const handleAddToCart = (item) => {
//     dispatch(addToCart({ ...item, quantity: cartQuantities[item.id] || 1 }));
//     setMessage({ ...message, [item.id]: `${item.name} has been added successfully!` });

//     setTimeout(() => {
//       setMessage((prev) => ({ ...prev, [item.id]: "" }));
//     }, 3000);
//   };

//   const incrementQuantity = (id) => {
//     setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
//   };

//   const decrementQuantity = (id) => {
//     setCartQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
//   };

//   return (
//     <div className="p-4 sm:p-6">
//       <h1 className="text-3xl font-bold mb-5 text-center">Menu</h1>

//       {/* Responsive Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {menuItems.map((item) => (
//           <div key={item.id} className="p-4 border rounded-lg shadow-lg flex flex-col items-center bg-white">
//             {/* Image */}
//             <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md" />

//             {/* Name & Description */}
//             <h2 className="text-lg font-semibold mt-2 text-center">{item.name}</h2>
//             <p className="text-gray-600 text-sm text-center">{item.description}</p>
//             <p className="text-xl font-bold mt-2">₹{item.price}</p>

//             {/* Quantity Selector */}
//             <div className="flex items-center mt-2">
//               <button onClick={() => decrementQuantity(item.id)} className="bg-gray-300 px-3 py-1 rounded-l">
//                 -
//               </button>
//               <span className="px-4">{cartQuantities[item.id] || 1}</span>
//               <button onClick={() => incrementQuantity(item.id)} className="bg-gray-300 px-3 py-1 rounded-r">
//                 +
//               </button>
//             </div>

//             {/* Buttons */}
//             <button
//               onClick={() => handleAddToCart(item)}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-3 w-full text-center"
//             >
//               Add to Cart
//             </button>

//             <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full text-center">
//               Order Now
//             </button>

//             {/* Success Message */}
//             {message[item.id] && <p className="text-green-700 mt-2 text-sm text-center">{message[item.id]}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Menu;




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

  // Fetch menu items on component mount
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

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
    setMessage({ ...message, [item._id]: `${item.name} has been added to your cart!` });
    setTimeout(() => {
      setMessage((prev) => ({ ...prev, [item._id]: "" }));
    }, 3000);
  };

  const incrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
  };

  // Handle "Order Now" button click for each item
  const handleOrderNow = (item) => {
    // Implement the logic when the "Order Now" button is clicked for that particular item
    alert(`${item.name} has been ordered! Proceeding to checkout.`);
    // You can add more logic here, like navigating to a checkout page or confirming the order
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-5 text-center">
        <span className="text-indigo-500">Select</span>{" "}
        <span className="text-orange-500">Menu</span>
      </h1>

      {message.error && <p className="text-red-500 text-center">{message.error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Skeleton loader similar to YouTube's animation
          Array(8) // Adjust number of skeleton items based on your layout
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-lg flex flex-col items-center bg-white"
              >
                {/* Thumbnail Skeleton */}
                <Skeleton height={200} width="100%" className="rounded-md mb-4" />

                {/* Title Skeleton */}
                <Skeleton width="70%" height={20} className="mb-2" />

                {/* Description Skeleton */}
                <Skeleton width="90%" height={15} className="mb-2" />

                {/* Price Skeleton */}
                <Skeleton width="50%" height={20} className="mb-2" />
              </div>
            ))
        ) : menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg shadow-lg flex flex-col items-center bg-white"
            >
              {/* Check if the image is available and valid */}
              {item.image ? (
                item.image.startsWith("data:image/jpeg;base64,") ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
                  />
                ) : (
                  <img
                    src="/default-image.jpg" // Fallback if image format is invalid
                    alt="Default"
                    className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
                  />
                )
              ) : (
                <img
                  src="/default-image.jpg" // Default image when no image is provided
                  alt="Default"
                  className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
                />
              )}
              <h2 className="text-lg font-semibold mt-2 text-center">{item.name}</h2>
              <p className="text-gray-600 text-sm text-center">{item.description}</p>
              <p className="text-xl font-bold mt-2">₹{item.price}</p>
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
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-3 w-full text-center"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleOrderNow(item)} // Order Now Button for each menu item
                className="bg-blue-500 text-white py-2 px-6 rounded-full mt-4 text-center w-full"
              >
                Order Now
              </button>
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
  );
};

export default Menu;
