import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  UtensilsCrossed,
  LogOut,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

// ✅ Backend API URL
// const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const UserNavbar = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate('/home');
      window.location.reload(); // Force reload to update state
    }, 1000);
  };

  const navLinks = [
    { to: "/home", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    { to: "/menu", label: "Menu", icon: <UtensilsCrossed className="w-4 h-4 mr-2" /> },
    {
      to: "/cart",
      label: "Cart",
      icon: (
        <span className="relative flex items-center">
          <ShoppingCart className="w-4 h-4 mr-2" />
          {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none shadow">
              {totalQuantity}
            </span>
          )}
        </span>
      ),
    },
    { to: "/order-tracking", label: "Track Order" },
  ];

  return (
    <nav className="p-4 bg-gray-800 text-white fixed w-full top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-orange-500">Nexinbe Cafe</h1>
          {userName && (
            <p className="text-sm text-gray-400">Welcome, {userName}</p>
          )}
        </div>

        <button className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-gray-300 px-2 py-1 rounded flex items-center ${
                location.pathname === link.to
                  ? "text-orange-400 font-semibold"
                  : ""
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow transition duration-300 flex items-center cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) setIsOpen(false);
              }}
              className="fixed top-0 right-0 h-full w-64 backdrop-blur-md bg-white/70 text-gray-800 shadow-2xl rounded-l-2xl z-50 flex flex-col p-6 space-y-4 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`block p-2 rounded-xl text-base font-medium transition-all duration-300 ${
                      location.pathname === link.to
                        ? "bg-orange-500 text-white shadow"
                        : "hover:bg-orange-100 hover:text-orange-600"
                    } flex items-center`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t border-gray-300 my-4" />

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <LogOut className="inline-block w-4 h-4 mr-2" />
                Logout
              </button>

              <div className="mt-auto pt-6 text-center text-[11px] text-gray-500 border-t border-dashed text-orange-500">
                Nexinbe Cafe v1.0.0
                <br />
                © 2025 All rights reserved
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UserNavbar;
