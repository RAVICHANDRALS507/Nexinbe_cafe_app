import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/Cartslice';

// ✅ Backend API URL
// const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const amount = location.state?.amount || 500;
  const tableNumber = location.state?.tableNumber || "N/A";

  const cartItems = useSelector((state) => state.cart.cartItems);

  // ✅ Load Razorpay script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // ✅ Create order on backend
      const { data } = await axios.post(`${BACKEND_URL}/api/razorpay/checkout`, {
        amount,
      });

      console.log("Order created:", data);

      const options = {
        key: "rzp_test_u7TfmRPwyrMobx",
        amount: data.order.amount,
        currency: "INR",
        name: "Nexinbe Cafe",
        description: "Order Payment",
        order_id: data.order.id,
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "",
        },
        handler: async function (response) {
          try {
            const token = localStorage.getItem("token");
            const userId = JSON.parse(atob(token.split('.')[1])).userId;

            console.log({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: location.state?.cartItems || cartItems,
              totalAmount: amount,
              userId,
            });

            const verifyRes = await axios.post(`${BACKEND_URL}/api/razorpay/paymentVerification`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: location.state?.cartItems || cartItems,
              totalAmount: amount,
              userId,
            });

            if (verifyRes.data.success) {
              dispatch(clearCart());
              alert(verifyRes.data.message || "Payment successful!");

              // Pass real orderId and paymentId to Bill page
              navigate('/bill', {
                replace: true,
                state: {
                  cartItems: location.state?.cartItems || cartItems,
                  totalAmount: amount,
                  orderId: verifyRes.data.orderId,         // <-- from backend
                  paymentId: verifyRes.data.paymentId,     // <-- from backend
                  orderDbId: verifyRes.data.orderDbId,     // <-- MongoDB _id if needed
                },
              });
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed. Please contact support.");
            navigate('/cart');
          }
        },
        modal: {
          confirm_close: true,
          escape: false,
          animation: true,
          ondismiss: function () {
            navigate('/cart');
          },
        },
        theme: {
          color: "#f97316",
          backdrop_color: "rgba(0,0,0,0.8)",
        },
      };

      const razor = new window.Razorpay(options);

      // ✅ Handle payment failure
      razor.on('payment.failed', function (response) {
        console.error("Payment Failed:", response.error);
        alert("Payment Failed. Please try again.");
        navigate('/cart');
      });

      razor.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      navigate('/cart');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back Button */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Cart
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 mt-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">Payment Details</h1>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">Order Amount</span>
              <span className="text-2xl font-bold text-orange-500">₹{amount.toFixed(2)}</span>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-medium text-orange-800 mb-2">Secure Payment</h3>
              <p className="text-sm text-orange-600">
                Your payment is secured by Razorpay. We don't store any payment details.
              </p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <span>Pay Securely</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
