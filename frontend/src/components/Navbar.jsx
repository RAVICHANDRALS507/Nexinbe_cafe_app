import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, UtensilsCrossed, ShoppingCart, X, Menu } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isAuthenticated = !!localStorage.getItem("token");

  const handleProtectedClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      // Show toast messages for protected pages
      if (["/cart", "/order-tracking"].includes(path)) {
        // const pageName = path
        //   .split("/")[1]
        //   .replace(/-/g, " ")
        //   .replace(/\b\w/g, (char) => char.toUpperCase());
      
        toast.error(`Please login to access ${path} page`);
        navigate("/login", { state: { from: path } });
      }
      
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-800 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-10 py-4">
        <div>
          <h1 className="text-2xl font-bold text-orange-500 leading-tight">
            Nexinbe Cafe
          </h1>
        </div>

        <nav className="flex items-center gap-6 text-white font-medium">
          <Link
            to="/home"
            className={`hover:text-orange-500 flex items-center gap-1 ${currentPath === "/home" ? "text-orange-500 font-semibold" : ""}`}
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/menu"
            className={`hover:text-orange-500 flex items-center gap-1 ${currentPath === "/menu" ? "text-orange-500 font-semibold" : ""}`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Menu
          </Link>
          <button
            onClick={() => handleProtectedClick("/cart")}
            className={`hover:text-orange-500 flex items-center gap-1 ${currentPath === "/cart" ? "text-orange-500 font-semibold" : "text-white"}`}
          >
            <ShoppingCart className="w-4 h-4" /> Cart
          </button>
          <button
            onClick={() => handleProtectedClick("/order-tracking")}
            className={`hover:text-orange-500 cursor-pointer ${currentPath === "/order-tracking" ? "text-orange-500 font-semibold" : "text-white"}`}
          >
            Track Order
          </button>
        </nav>

        <div className="flex gap-4">
          <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold">Sign Up</Link>
          <Link to="/login" className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-2xl text-sm font-semibold">User Login</Link>
          <Link to="/admin-panel" className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-2xl text-sm font-semibold">Admin Login</Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-orange-500">Nexinbe Cafe</h1>
        </div>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="text-gray-200 cursor-pointer" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-cover bg-center bg-no-repeat backdrop-blur-md text-gray-800 shadow-2xl rounded-l-2xl z-50 flex flex-col p-6 space-y-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white/80 rounded-l-2xl z-[-1]"></div>

        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <Link to="/home" onClick={() => setIsOpen(false)} className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium shadow transition ${currentPath === "/home" ? "bg-orange-500 text-white" : "text-gray-800 hover:text-orange-500"}`}><Home className="w-4 h-4" /> Home</Link>
        <Link to="/menu" onClick={() => setIsOpen(false)} className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium shadow transition ${currentPath === "/menu" ? "bg-orange-500 text-white" : "text-gray-800 hover:text-orange-500"}`}><UtensilsCrossed className="w-4 h-4" /> Menu</Link>
        <button onClick={() => handleProtectedClick("/cart")} className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium shadow transition ${currentPath === "/cart" ? "bg-orange-500 text-white" : "text-gray-800 hover:text-orange-500"}`}><ShoppingCart className="w-4 h-4" /> Cart</button>
        <button onClick={() => handleProtectedClick("/order-tracking")} className={`px-4 py-2 rounded-2xl font-medium shadow transition ${currentPath === "/order-tracking" ? "bg-orange-500 text-white" : "text-gray-800 hover:text-orange-500 cursor-pointer"}`}>Track Order</button>
        <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold px-4 py-2 rounded-2xl shadow transition">Sign Up</Link>
        <Link to="/login" onClick={() => setIsOpen(false)} className="bg-amber-400 hover:bg-amber-500 text-white text-center font-semibold px-4 py-2 rounded-2xl shadow transition">User Login</Link>
        <Link to="/admin-panel" onClick={() => setIsOpen(false)} className="bg-stone-800 hover:bg-stone-900 text-white text-center font-semibold px-4 py-2 rounded-2xl shadow transition">Admin Login</Link>

        <div className="mt-auto pt-6 text-center text-[11px] text-gray-500 border-t border-dashed">
          Nexinbe Cafe v1.0.0
          <br />© 2025 All rights reserved
        </div>
      </div>
    </header>
  );
};

export default Navbar;
