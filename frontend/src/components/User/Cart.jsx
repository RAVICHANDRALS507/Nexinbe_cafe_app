import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/Cartslice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Add this import

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">Cart</h1>
        {cart.length === 0 ? (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6">
              {cart.map((item) => (
                <div key={item.id} className="p-4 border rounded shadow-lg flex flex-col items-center bg-white">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded" />
                  <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                  <p className="text-gray-600 text-sm text-center">{item.description}</p>
                  <p className="text-xl font-bold mt-2">₹{item.price * item.quantity}</p>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-4 p-4 border rounded text-center">
              <h2 className="text-lg font-semibold">Total Amount: ₹{totalAmount}</h2>
            </div>
          </>
        )}

        {/* Proceed to Payment */}
        <Link to="/payment" className="block bg-blue-500 text-white px-4 py-2 rounded mt-5 text-center">
          Proceed to Payment
        </Link>
      </div>
    </>
  );
};

export default Cart;
