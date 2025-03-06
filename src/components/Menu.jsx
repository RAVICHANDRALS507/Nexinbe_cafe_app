import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import { useState } from "react";

const initialMenuItems = [
  { id: 1, name: "Espresso", price: 120, description: "A strong and bold coffee shot." },
  { id: 2, name: "Cheeseburger", price: 200, description: "Juicy beef patty with melted cheese." },
  { id: 3, name: "Caesar Salad", price: 180, description: "Crisp romaine lettuce with Caesar dressing." },
  { id: 4, name: "Margherita Pizza", price: 250, description: "Classic pizza with fresh mozzarella and basil." },
  { id: 5, name: "Chocolate Cake", price: 150, description: "Rich and moist chocolate cake with frosting." },
];

const Menu = () => {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [message, setMessage] = useState("");

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setMessage(`${item.name} has been added successfully!`);

    // Optionally, you can add a new item to the menu
    const newItem = { id: menuItems.length + 1, name: `${item.name} (New)`, price: item.price + 50 };
    setMenuItems((prevItems) => [...prevItems, newItem]);

    // Clear the message after a few seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Menu</h1>
      {message && <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {menuItems.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
            <button onClick={() => handleAddToCart(item)} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;