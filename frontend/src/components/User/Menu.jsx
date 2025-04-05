// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/Cartslice";
// import axios from "axios";
// import Skeleton from "react-loading-skeleton"; // Import Skeleton component
// import Navbar from "./Navbar"; // Add this import

// const BACKEND_URL = "http://localhost:5000";
// //const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

// const Menu = () => {
//   const dispatch = useDispatch();
//   const [menuItems, setMenuItems] = useState([]);
//   const [message, setMessage] = useState({});
//   const [cartQuantities, setCartQuantities] = useState({});
//   const [loading, setLoading] = useState(true); // Track loading state

//   // ✅ Fetch menu items on component mount
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_URL}/api/menu`);
//         console.log("Fetched menu items:", response.data);
//         setMenuItems(response.data); // Update state with menu items
//         setLoading(false); // Set loading to false after fetching data
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setMessage({ error: "Failed to load menu items" });
//         setLoading(false);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   // ✅ Add item to cart
//   const handleAddToCart = (item) => {
//     dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
//     setMessage({ ...message, [item._id]: `${item.name} has been added to your cart!` });
//     setTimeout(() => {
//       setMessage((prev) => ({ ...prev, [item._id]: "" }));
//     }, 3000);
//   };

//   // ✅ Increment quantity
//   const incrementQuantity = (id) => {
//     setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
//   };

//   // ✅ Decrement quantity
//   const decrementQuantity = (id) => {
//     setCartQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
//   };

//   // ✅ Handle "Order Now" button click
//   const handleOrderNow = (item) => {
//     alert(`${item.name} has been ordered! Proceeding to checkout.`);
//     // Add navigation to checkout or order confirmation page here
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         className="relative min-h-screen bg-cover bg-center p-4 sm:p-8"
//         style={{
//           backgroundImage:
//             "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
//           paddingTop: '5rem',
//         }}
//       >
//         {/* Enhanced overlay with gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

//         {/* Main Content */}
//         <div className="relative container mx-auto">
//           {/* Improved Header Section */}
//           <div className="text-center mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Our <span className="text-orange-500">Menu</span>
//             </h1>
//             <p className="text-gray-200 text-lg max-w-2xl mx-auto">
//               Discover our delicious selection of food and beverages
//             </p>
//           </div>

//           {/* Error message with improved styling */}
//           {message.error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//               <p>{message.error}</p>
//             </div>
//           )}

//           {/* Menu Grid with improved card design */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {loading ? (
//               // Enhanced skeleton loader
//               Array(8).fill().map((_, index) => (
//                 <div key={index} className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
//                   <Skeleton height={200} width="100%" className="rounded-xl mb-4" />
//                   <Skeleton width="70%" height={24} className="mb-3" />
//                   <Skeleton width="90%" height={18} count={2} className="mb-3" />
//                   <Skeleton width="50%" height={24} className="mb-4" />
//                   <Skeleton height={40} className="rounded-full mb-2" />
//                   <Skeleton height={40} className="rounded-full" />
//                 </div>
//               ))
//             ) : menuItems.length > 0 ? (
//               menuItems.map((item) => (
//                 <div key={item._id} 
//                      className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
//                   {/* Item Image with improved presentation */}
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={item.image.startsWith("data:image") ? item.image : "/default-image.jpg"}
//                       alt={item.name}
//                       className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                     <p className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
//                       ₹{item.price}
//                     </p>
//                   </div>

//                   {/* Item Details with improved layout */}
//                   <div className="p-4">
//                     <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

//                     {/* Quantity Selector with improved styling */}
//                     <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-lg p-2">
//                       <button
//                         onClick={() => decrementQuantity(item._id)}
//                         className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
//                       >
//                         -
//                       </button>
//                       <span className="font-medium text-gray-700">{cartQuantities[item._id] || 1}</span>
//                       <button
//                         onClick={() => incrementQuantity(item._id)}
//                         className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
//                       >
//                         +
//                       </button>
//                     </div>

//                     {/* Action Buttons with improved design */}
//                     <div className="space-y-2">
//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
//                       >
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={() => handleOrderNow(item)}
//                         className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
//                       >
//                         Order Now
//                       </button>
//                     </div>

//                     {/* Success Message with animation */}
//                     {message[item._id] && (
//                       <div className="mt-3 text-center animate-fade-in">
//                         <p className="text-green-600 text-sm bg-green-100 py-2 px-3 rounded-lg">
//                           {message[item._id]}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <p className="text-2xl text-white">No menu items available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Menu;



// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/Cartslice";
// import axios from "axios";
// import Skeleton from "react-loading-skeleton";
// import Navbar from "./Navbar";

// const BACKEND_URL = "http://localhost:5000";
// //const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

// const Menu = () => {
//   const dispatch = useDispatch();
//   const [menuItems, setMenuItems] = useState([]);
//   const [message, setMessage] = useState({});
//   const [cartQuantities, setCartQuantities] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("All");

//   // ✅ Fetch menu items on component mount
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_URL}/api/menu`);
//         console.log("Fetched menu items:", response.data);
//         setMenuItems(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setMessage({ error: "Failed to load menu items" });
//         setLoading(false);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   // ✅ Add item to cart
//   const handleAddToCart = (item) => {
//     dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
//     setMessage({ ...message, [item._id]: `${item.name} has been added to your cart!` });
//     setTimeout(() => {
//       setMessage((prev) => ({ ...prev, [item._id]: "" }));
//     }, 3000);
//   };

//   // ✅ Increment quantity
//   const incrementQuantity = (id) => {
//     setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
//   };

//   // ✅ Decrement quantity
//   const decrementQuantity = (id) => {
//     setCartQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
//   };

//   // ✅ Handle "Order Now" button click
//   const handleOrderNow = (item) => {
//     alert(`${item.name} has been ordered! Proceeding to checkout.`);
//   };

//   // ✅ Filter menu items by category
//   const filteredItems = activeCategory === "All" 
//     ? menuItems 
//     : menuItems.filter(item => item.category === activeCategory);

//   // ✅ Get unique categories
//   const categories = ["All", ...new Set(menuItems.map(item => item.category))];

//   return (
//     <>
//       <Navbar />
//       <div
//         className="relative min-h-screen bg-cover bg-center p-4 sm:p-8"
//         style={{
//           backgroundImage:
//             "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
//           paddingTop: '5rem',
//         }}
//       >
//         {/* Enhanced overlay with gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

//         {/* Main Content */}
//         <div className="relative container mx-auto">
//           {/* Improved Header Section */}
//           <div className="text-center mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Our <span className="text-orange-500">Menu</span>
//             </h1>
//             <p className="text-gray-200 text-lg max-w-2xl mx-auto">
//               Discover our delicious selection of food and beverages
//             </p>
//           </div>

//           {/* Category Tabs */}
//           <div className="flex flex-wrap justify-center gap-2 mb-8">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
//                   activeCategory === category
//                     ? "bg-orange-500 text-white"
//                     : "bg-white/10 text-white hover:bg-white/20"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Error message with improved styling */}
//           {message.error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//               <p>{message.error}</p>
//             </div>
//           )}

//           {/* Menu Grid with improved card design */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {loading ? (
//               // Enhanced skeleton loader
//               Array(8).fill().map((_, index) => (
//                 <div key={index} className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
//                   <Skeleton height={200} width="100%" className="rounded-xl mb-4" />
//                   <Skeleton width="70%" height={24} className="mb-3" />
//                   <Skeleton width="90%" height={18} count={2} className="mb-3" />
//                   <Skeleton width="50%" height={24} className="mb-4" />
//                   <Skeleton height={40} className="rounded-full mb-2" />
//                   <Skeleton height={40} className="rounded-full" />
//                 </div>
//               ))
//             ) : filteredItems.length > 0 ? (
//               filteredItems.map((item) => (
//                 <div key={item._id} 
//                      className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
//                   {/* Item Image with improved presentation */}
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={item.image.startsWith("data:image") ? item.image : "/default-image.jpg"}
//                       alt={item.name}
//                       className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                     <p className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
//                       ₹{item.price}
//                     </p>
//                   </div>

//                   {/* Item Details with improved layout */}
//                   <div className="p-4">
//                     <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

//                     {/* Quantity Selector with improved styling */}
//                     <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-lg p-2">
//                       <button
//                         onClick={() => decrementQuantity(item._id)}
//                         className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
//                       >
//                         -
//                       </button>
//                       <span className="font-medium text-gray-700">{cartQuantities[item._id] || 1}</span>
//                       <button
//                         onClick={() => incrementQuantity(item._id)}
//                         className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
//                       >
//                         +
//                       </button>
//                     </div>

//                     {/* Action Buttons with improved design */}
//                     <div className="space-y-2">
//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
//                       >
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={() => handleOrderNow(item)}
//                         className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors duration-300"
//                       >
//                         Order Now
//                       </button>
//                     </div>

//                     {/* Success Message with animation */}
//                     {message[item._id] && (
//                       <div className="mt-3 text-center animate-fade-in">
//                         <p className="text-green-600 text-sm bg-green-100 py-2 px-3 rounded-lg">
//                           {message[item._id]}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <p className="text-2xl text-white">No menu items available in this category</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Menu;





// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/Cartslice";
// import axios from "axios";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Navbar from "./Navbar";

// const BACKEND_URL = "http://localhost:5000";

// const Menu = () => {
//   const dispatch = useDispatch();
//   const [menuItems, setMenuItems] = useState([]);
//   const [message, setMessage] = useState({});
//   const [cartQuantities, setCartQuantities] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("All");

//   // ✅ Fetch menu items on component mount
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_URL}/api/menu`);
//         console.log("Fetched menu items:", response.data);
//         // Simulate loading for smoother transition
//         setTimeout(() => {
//           setMenuItems(response.data);
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setMessage({ error: "Failed to load menu items" });
//         setLoading(false);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   // ✅ Add item to cart
//   const handleAddToCart = (item) => {
//     dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
//     setMessage({ ...message, [item._id]: `${item.name} has been added to your cart!` });
//     setTimeout(() => {
//       setMessage((prev) => ({ ...prev, [item._id]: "" }));
//     }, 3000);
//   };

//   // ✅ Filter menu items by category
//   const filteredItems = activeCategory === "All" 
//     ? menuItems 
//     : menuItems.filter(item => item.category === activeCategory);

//   // ✅ Get unique categories
//   const categories = ["All", ...new Set(menuItems.map(item => item.category))];

//   // Custom Skeleton Component
//   const MenuItemSkeleton = () => (
//     <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-pulse transform transition-all duration-300">
//       <div className="relative h-48">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
//       </div>
//       <div className="p-4 space-y-4">
//         <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
//         <div className="space-y-2">
//           <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
//           <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
//         </div>
//         <div className="flex items-center justify-between h-8 bg-gray-100 rounded-lg px-2">
//           <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
//           <div className="h-6 w-8 bg-gray-200 rounded-md"></div>
//           <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
//         </div>
//         <div className="space-y-2">
//           <div className="h-10 bg-green-100 rounded-lg animate-pulse"></div>
//           <div className="h-10 bg-blue-100 rounded-lg animate-pulse"></div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Navbar />
//       <div
//         className="relative min-h-screen bg-cover bg-center p-4 sm:p-8 bg-fixed"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
//           paddingTop: '5rem',
//         }}
//       >
//         {/* Enhanced overlay with multiple gradients for depth */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm"></div>

//         {/* Main Content */}
//         <div className="relative container mx-auto">
//           {/* Improved Header Section */}
//           <div className="text-center mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
//               Our <span className="text-orange-500">Menu</span>
//             </h1>
//             <p className="text-gray-200 text-lg max-w-2xl mx-auto">
//               Discover our delicious selection of food and beverages
//             </p>
//           </div>

//           {/* Category Tabs with Enhanced Styling */}
//           <div className="flex flex-wrap justify-center gap-3 mb-8">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 
//                           ${activeCategory === category
//                             ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
//                             : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
//                           }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Error message with improved styling */}
//           {message.error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded backdrop-blur-sm">
//               <p>{message.error}</p>
//             </div>
//           )}

//           {/* Menu Grid with improved card design */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {loading ? (
//               // Enhanced skeleton loader with animation
//               Array(8).fill().map((_, index) => (
//                 <div key={index} style={{ animationDelay: `${index * 150}ms` }}>
//                   <MenuItemSkeleton />
//                 </div>
//               ))
//             ) : filteredItems.length > 0 ? (
//               filteredItems.map((item) => (
//                 <div key={item._id} 
//                      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
//                   {/* Item Image with improved presentation */}
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={item.image.startsWith("data:image") ? item.image : "/default-image.jpg"}
//                       alt={item.name}
//                       className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
//                     <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
//                       ₹{item.price}
//                     </div>
//                     <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {item.category}
//                     </div>
//                   </div>

//                   {/* Item Details with improved layout */}
//                   <div className="p-4">
//                     <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

//                     {/* Quantity Selector with improved styling */}
//                     <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-2">
//                       <button
//                         onClick={() => decrementQuantity(item._id)}
//                         className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white flex items-center justify-center text-gray-600 transition-all duration-300"
//                       >
//                         -
//                       </button>
//                       <span className="font-medium text-gray-700">{cartQuantities[item._id] || 1}</span>
//                       <button
//                         onClick={() => incrementQuantity(item._id)}
//                         className="w-8 h-8 rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white flex items-center justify-center text-gray-600 transition-all duration-300"
//                       >
//                         +
//                       </button>
//                     </div>

//                     {/* Action Buttons with improved design */}
//                     <div className="space-y-2">
//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//                       >
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={() => handleOrderNow(item)}
//                         className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//                       >
//                         Order Now
//                       </button>
//                     </div>

//                     {/* Success Message with enhanced animation */}
//                     {message[item._id] && (
//                       <div className="mt-3 text-center">
//                         <p className="text-green-600 text-sm bg-green-100 py-2 px-3 rounded-lg transform animate-bounce">
//                           {message[item._id]}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <p className="text-2xl text-white">No menu items available in this category</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Menu;



import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "./Navbar";

//const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const Menu = () => {
  const dispatch = useDispatch();
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
    dispatch(addToCart({ ...item, quantity: cartQuantities[item._id] || 1 }));
    setMessage({ ...message, [item._id]: `${item.name} added to cart!` });
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

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const MenuItemSkeleton = () => (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-pulse transition-all duration-300">
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
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
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

                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => alert("Order feature coming soon!")}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-300"
                      >
                        Order Now
                      </button>
                    </div>

                    {message[item._id] && (
                      <div className="mt-3 text-center">
                        <p className="text-green-600 text-sm bg-green-100 py-2 px-3 rounded-lg animate-bounce">
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
