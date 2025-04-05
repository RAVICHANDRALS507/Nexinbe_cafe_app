// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart } from "../../redux/Cartslice";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar"; // Add this import

// const Cart = () => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   // Calculate total amount
//   const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <>
//       <Navbar />
//       <div className="p-10">
//         <h1 className="text-3xl font-bold mb-5">Cart</h1>
//         {cart.length === 0 ? (
//           <p className="text-lg text-gray-500">Your cart is empty.</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 gap-6">
//               {cart.map((item) => (
//                 <div key={item.id} className="p-4 border rounded shadow-lg flex flex-col items-center bg-white">
//                   <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded" />
//                   <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
//                   <p className="text-gray-600 text-sm text-center">{item.description}</p>
//                   <p className="text-xl font-bold mt-2">₹{item.price * item.quantity}</p>
//                   <button onClick={() => dispatch(removeFromCart(item.id))} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Total Amount */}
//             <div className="mt-4 p-4 border rounded text-center">
//               <h2 className="text-lg font-semibold">Total Amount: ₹{totalAmount}</h2>
//             </div>
//           </>
//         )}

//         {/* Proceed to Payment */}
//         <Link to="/payment" className="block bg-blue-500 text-white px-4 py-2 rounded mt-5 text-center">
//           Proceed to Payment
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Cart;

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/Cartslice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Total Amount Calculation
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 px-4 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-center mb-10">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="flex items-center justify-center text-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329138.png"
                alt="Empty Cart"
                className="w-32 h-32 opacity-80"
              />
              <p className="text-xl text-gray-600">Your cart is empty.</p>
              <Link
                to="/menu"
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-lg shadow-md text-center flex flex-col items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <h2 className="text-lg font-semibold mt-3">{item.name}</h2>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-xl font-bold mt-2">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-3 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-10 bg-white shadow-md p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-3">Total: ₹{totalAmount}</h2>
              <Link
                to="/payment"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition"
              >
                Proceed to Payment
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
