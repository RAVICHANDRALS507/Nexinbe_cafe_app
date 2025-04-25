
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Cartslice";

const Bill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const billRef = useRef();
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setOrder({
        _id: `ORD-${Math.floor(Math.random() * 10000)}`,
        status: "Paid",
        paymentId: "PAY123456789",
        createdAt: new Date().toISOString(),
        totalAmount: location.state.totalAmount || 0,
        items: location.state.cartItems || [],
      });
    } else {
      const storedOrder = localStorage.getItem("lastOrder");
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder));
        localStorage.removeItem("lastOrder");
      }
    }
  }, [location.state]);

  const clearCart = () => localStorage.removeItem("cartItems");

  const handleDownload = () => {
    if (!billRef.current) return;
  
    const clonedNode = billRef.current.cloneNode(true);
    clonedNode.classList.add("print-safe");
    document.body.appendChild(clonedNode); // temporarily attach it
  
    html2canvas(clonedNode, {
      logging: true,
      useCORS: true,
      scale: 2,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "order-bill.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating PNG:", error);
      })
      .finally(() => {
        document.body.removeChild(clonedNode); // cleanup
      });
  };
  
  
  

  const handleReorder = () => {
    if (order && order.items) {
      order.items.forEach((item) => {
        dispatch(
          addToCart({
            ...item,
            id: item.id || item._id,
          })
        );
      });
      navigate("/cart");
    }
  };

  const handleBackToHome = () => {
    clearCart();
    navigate("/");
  };

  const handleTrackOrder = () => navigate("/order");

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

  return (
    <div className="min-h-screen pt-20 bg-gray-100 px-4 font-mono">
      <div
        ref={billRef}
        className="p-4 sm:p-6 w-full max-w-md mx-auto bg-white shadow-xl rounded border border-gray-300"
      >
        {/* Header */}
        <h2 className="text-xl font-bold text-center mb-1">Nexinbe Cafe</h2>
        <p className="text-center text-sm mb-4">Thank you for your order!</p>

        {/* Order Info */}
        <div className="space-y-1 text-sm border-b border-gray-300 pb-2">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong>  {order.status}</p>
          <p><strong>Payment ID:</strong> {order.paymentId}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        {/* Items */}
        <div className="mt-4 border-b border-gray-300 pb-2">
          <div className="grid grid-cols-3 font-semibold border-b border-gray-300 mb-1">
            <p>Item</p>
            <p className="text-center">Qty</p>
            <p className="text-right">Price</p>
          </div>
          {order.items.map((item, i) => (
            <div key={i} className="grid grid-cols-3 text-sm py-1">
              <p className="capitalize">{item.name}</p>
              <p className="text-center">{item.quantity}</p>
              <p className="text-right">₹{item.price}</p>
            </div>
          ))}
        </div>

        {/* Total */}
        <p className="text-right font-bold text-lg mt-2">
          Total: ₹{order.totalAmount.toFixed(2)}
        </p>

        {/* Barcode */}
        <div className="mt-6 flex justify-center">
          <Barcode
            value={order._id}
            format="CODE128"
            height={60}
            displayValue={true}
            background="#ffffff"
            lineColor="#000000"
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          This is a computer-generated receipt.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-center px-4 font-sans">
        <button
          onClick={handleDownload}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full sm:w-auto shadow-md"
        >
          Download PNG
        </button>
        <button
          onClick={handleReorder}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition w-full sm:w-auto shadow-md"
        >
          Reorder
        </button>
        <button
          onClick={handleTrackOrder}
          className="bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition w-full sm:w-auto shadow-md"
        >
          Track Order
        </button>
        <button
          onClick={handleBackToHome}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto shadow-md"
        >
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
};

export default Bill;
