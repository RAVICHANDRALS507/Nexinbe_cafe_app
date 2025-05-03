// src/components/User/Bill.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import QRCode from "react-qr-code";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";

// ✅ Backend API URL
// const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Bill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const billRef = useRef();
  const dispatch = useDispatch();

  const [order, setOrder]       = useState(null);
  const [userName, setUserName] = useState("");

  // Load or create the order (persisting so refresh doesn’t change ID)
  useEffect(() => {
    if (location.state?.cartItems) {
      const newOrder = {
        _id: location.state.orderDbId || `ORD-${Date.now()}`,
        orderId: location.state.orderId || "",
        status: "Paid",
        paymentId: location.state.paymentId || "",
        createdAt: new Date().toISOString(),
        totalAmount: location.state.totalAmount || 0,
        items: location.state.cartItems,
      };
      setOrder(newOrder);
      localStorage.setItem("lastOrder", JSON.stringify(newOrder));
      return;
    }
    // Otherwise, fallback to lastOrder in localStorage
    const stored = localStorage.getItem("lastOrder");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, [location.state]);

  // Fetch logged-in user’s name
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${BACKEND_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUserName(res.data.name))
      .catch(() => setUserName(""));
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("lastOrder");
  };

  const handleDownload = async () => {
    if (!billRef.current) return;
    const clone = billRef.current.cloneNode(true);
    clone.classList.add("print-safe");
    document.body.appendChild(clone);
    try {
      const canvas = await html2canvas(clone, { useCORS: true, scale: 3 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "nexinbe-order-bill.png";
      link.click();
    } finally {
      document.body.removeChild(clone);
    }
  };

  const handleReorder = () => {
    order.items.forEach(item =>
      dispatch(addToCart({ ...item, id: item.id || item._id }))
    );
    navigate("/cart");
  };

  const handleBackToHome = () => {
    clearCart();
    navigate("/");
  };

  const handleTrackOrder = () => navigate("/order-tracking");

  if (!order) {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        No bill data found. Please check your order history.
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Data-rich QR payload now includes paymentId & createdAt
  const qrData = JSON.stringify({
    orderId:   order._id,
    paymentId: order.paymentId,
    date:      order.createdAt,
    total:     order.totalAmount,
    items:     order.items.map(i => ({ name: i.name, qty: i.quantity }))
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-100 px-4 font-mono">
      {/* Bill Card */}
      <div
        ref={billRef}
        className="p-4 sm:p-6 w-full max-w-md mx-auto bg-white shadow-xl rounded border border-gray-300"
      >
        <h2 className="text-xl font-bold text-center mb-1">Nexinbe Cafe</h2>
        <p className="text-center text-sm mb-4">
          🙏 Thank you
          {userName && <> , <span className="font-semibold">{userName}</span></>}
          !
        </p>

        <div className="space-y-1 text-sm border-b border-gray-300 pb-2">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment ID:</strong> {order.paymentId}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="mt-4 border-b border-gray-300 pb-2">
          <div className="grid grid-cols-3 font-semibold border-b mb-1">
            <p>Item</p><p className="text-center">Qty</p><p className="text-right">Price</p>
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 text-sm py-1">
              <p className="capitalize">{item.name}</p>
              <p className="text-center">{item.quantity}</p>
              <p className="text-right">₹{item.price}</p>
            </div>
          ))}
        </div>

        <p className="text-right font-bold text-lg mt-2">
          Total: ₹{order.totalAmount.toFixed(2)}
        </p>

        {/* Clickable, Data-Rich QR */}
        <div className="mt-6 flex justify-center">
          <a href={`/order-tracking?orderId=${order._id}`} target="_blank" rel="noopener noreferrer">
            <QRCode value={qrData} size={128} level="H" />
          </a>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          This is a computer-generated receipt.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        <button onClick={handleDownload} className="bg-orange-500 text-white px-4 py-2 rounded-lg">📥 Download PNG</button>
        <button onClick={handleReorder} className="bg-orange-400 text-white px-4 py-2 rounded-lg">🔄 Reorder</button>
        <button onClick={handleTrackOrder} className="bg-orange-300 text-white px-4 py-2 rounded-lg">🚚 Track Order</button>
        <button onClick={handleBackToHome} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">🏠 Back to Home</button>
      </div>
    </div>
  );
};

export default Bill;
