import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="p-4 bg-gray-800 text-white fixed w-full top-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Cafe</h1>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/menu" className="hover:text-gray-300">Menu</Link>
          <Link to="/cart" className="hover:text-gray-300">Cart</Link>
          <Link to="/order-tracking" className="hover:text-gray-300">Track Order</Link>
          <Link to="/signup" className="px-3 py-1 bg-blue-500 rounded-lg hover:bg-blue-600">Sign Up</Link>
          <Link to="/login" className="px-3 py-1 bg-blue-500 rounded-lg hover:bg-blue-600">Login</Link>
          <Link to="/admin-panel" className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600">Admin Login</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col mt-2 space-y-2 md:hidden">
          <Link to="/home" className="block p-2 bg-gray-700 rounded" onClick={closeMenu}>Home</Link>
          <Link to="/menu" className="block p-2 bg-gray-700 rounded" onClick={closeMenu}>Menu</Link>
          <Link to="/cart" className="block p-2 bg-gray-700 rounded" onClick={closeMenu}>Cart</Link>
          <Link to="/order-tracking" className="block p-2 bg-gray-700 rounded" onClick={closeMenu}>Track Order</Link>
          <Link to="/signup" className="block p-2 bg-blue-500 rounded-lg" onClick={closeMenu}>Sign Up</Link>
          <Link to="/login" className="block p-2 bg-blue-500 rounded-lg" onClick={closeMenu}>Login</Link>
          <Link to="/admin-panel" className="block p-2 bg-green-500 rounded-lg" onClick={closeMenu}>Admin Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
