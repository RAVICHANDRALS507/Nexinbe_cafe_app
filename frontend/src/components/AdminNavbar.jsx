import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Retrieve admin's name from localStorage (assuming it's stored as "adminName")
    const storedName = localStorage.getItem("adminName");
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token
    localStorage.removeItem("adminName"); // Remove admin name
    navigate("/admin-login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Admin Panel</h1>
      
      <div className="flex items-center space-x-4">
        {/* Display Admin's Name */}
        {adminName && <span className="text-md font-semibold">{adminName}</span>}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
