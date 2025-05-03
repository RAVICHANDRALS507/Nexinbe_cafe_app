import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import UserNavbar from "./UserNavbar";
import { FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ Backend API URL
// const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Order = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchOrders(token);
    }
  }, []);

  const fetchOrders = async (token) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoggedIn ? <UserNavbar /> : <Navbar />}

      <motion.div
        className="max-w-2xl mx-auto p-6 pt-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* <h1 className="text-3xl font-bold mb-6 text-center">Order Tracking</h1> */}

        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">Loading...</div>
        ) : orders.length === 0 ? (
          <motion.div
            className="text-center mt-20 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaBoxOpen className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="text-xl font-semibold">No Orders Found</p>
            <p className="text-sm mt-2">You haven't placed any orders yet. Start exploring our menu!</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                className="bg-white rounded-xl shadow p-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-semibold text-gray-800">
                      Order #{order.orderId}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.date}{" "}
                      {order.time &&
                        new Date(`1970-01-01T${order.time}`).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <ul className="mb-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {item.name} x {item.quantity} - ₹{item.price}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-orange-500">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Order;
