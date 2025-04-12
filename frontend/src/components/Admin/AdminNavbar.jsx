import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = ({ setIsAdminLoggedIn }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    if (setIsAdminLoggedIn) {
      setIsAdminLoggedIn(false);
    }
    toast.success("Admin logged out successfully");
    setTimeout(() => {
      navigate('/home');
      window.location.reload();
    }, 1000);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Admin Panel</h1>
      
      <div className="flex items-center space-x-4">
        {adminName && <span className="text-md font-semibold">{adminName}</span>}
        
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
