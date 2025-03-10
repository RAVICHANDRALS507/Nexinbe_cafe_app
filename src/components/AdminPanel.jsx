import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"; // Import Admin Navbar
import AdminOrders from "./AdminOrders";
import AdminMenu from "./AdminMenu";

const AdminPanel = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login"); // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div>
      {/* Use Admin Navbar */}
      <AdminNavbar onLogout={onLogout} />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        {/* Admin Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`px-4 py-2 rounded ${
              activeSection === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className={`px-4 py-2 rounded ${
              activeSection === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setActiveSection("menu")}
            className={`px-4 py-2 rounded ${
              activeSection === "menu" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Manage Menu
          </button>
        </div>

        {/* Render Different Sections */}
        <div className="border p-4 rounded-lg shadow">
          {activeSection === "dashboard" && (
            <div>
              <h3 className="text-xl font-bold">Dashboard Overview</h3>
              <p>Welcome, Admin! Manage your cafe from here.</p>
            </div>
          )}

          {activeSection === "orders" && <AdminOrders />} {/* Show Orders Section */}
          {activeSection === "menu" && <AdminMenu />} {/* Show Menu Section */}
        </div>

        
      </div>
    </div>
  );
};

export default AdminPanel;
