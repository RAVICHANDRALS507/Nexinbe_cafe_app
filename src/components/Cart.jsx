import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/Cartslice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="p-4 border rounded flex justify-between">
              <p>{item.name} - ₹{item.price}</p>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 p-4 border rounded">
            <h2 className="text-lg font-semibold">Total Amount: ₹{totalAmount}</h2>
          </div>
        </>
      )}
      <Link to="/payment" className="block bg-blue-500 text-white px-4 py-2 rounded mt-5">
        Proceed to Payment
      </Link>
    </div>
  );
};

export default Cart;