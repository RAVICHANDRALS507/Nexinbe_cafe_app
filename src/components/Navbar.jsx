import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Cafe</h1>
      <div className="space-x-4">
        <Link to="/home" className="mx-2">Home</Link>
        <Link to="/menu" className="mx-2">Menu</Link>
        <Link to="/cart" className="mx-2">Cart</Link>
        <Link to="/order-tracking" className="mx-2">Track Order</Link>
        <Link to="/signup" className="mx-2 px-3 py-1 bg-blue-500 rounded-lg">Sign Up</Link>
        <Link to="/login" className="mx-2 px-3 py-1 bg-green-500 rounded-lg">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;