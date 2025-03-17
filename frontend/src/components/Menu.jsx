import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import { useState } from "react";

const initialMenuItems = [
  { id: 1, name: "Espresso", price: 120, image: "/images/espresso.jpg", description: "A strong and bold coffee shot." },
  { id: 2, name: "Cheeseburger", price: 200, image: "/images/cheeseburger.jpg", description: "Juicy beef patty with melted cheese." },
  { id: 3, name: "Caesar Salad", price: 180, image: "/images/caesar_salad.jpg", description: "Crisp romaine lettuce with Caesar dressing." },
  { id: 4, name: "Margherita Pizza", price: 250, image: "/images/margherita_pizza.jpg", description: "Classic pizza with fresh mozzarella and basil." },
  { id: 5, name: "Chocolate Cake", price: 150, image: "/images/chocolate_cake.jpg", description: "Rich and moist chocolate cake with frosting." },
];

const Menu = () => {
  const dispatch = useDispatch();
  const [menuItems] = useState(initialMenuItems);
  const [message, setMessage] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: cartQuantities[item.id] || 1 }));
    setMessage({ ...message, [item.id]: `${item.name} has been added successfully!` });

    setTimeout(() => {
      setMessage((prev) => ({ ...prev, [item.id]: "" }));
    }, 3000);
  };

  const incrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrementQuantity = (id) => {
    setCartQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-5 text-center">Menu</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow-lg flex flex-col items-center bg-white">
            {/* Image */}
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md" />

            {/* Name & Description */}
            <h2 className="text-lg font-semibold mt-2 text-center">{item.name}</h2>
            <p className="text-gray-600 text-sm text-center">{item.description}</p>
            <p className="text-xl font-bold mt-2">₹{item.price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center mt-2">
              <button onClick={() => decrementQuantity(item.id)} className="bg-gray-300 px-3 py-1 rounded-l">
                -
              </button>
              <span className="px-4">{cartQuantities[item.id] || 1}</span>
              <button onClick={() => incrementQuantity(item.id)} className="bg-gray-300 px-3 py-1 rounded-r">
                +
              </button>
            </div>

            {/* Buttons */}
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-3 w-full text-center"
            >
              Add to Cart
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full text-center">
              Order Now
            </button>

            {/* Success Message */}
            {message[item.id] && <p className="text-green-700 mt-2 text-sm text-center">{message[item.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
