import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminOrders from "./AdminOrders";
import AdminMenu from "./AdminMenu";
import AdminDashboard from "./AdminDashboard";

const AdminPanel = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center p-6 relative"
      style={{
        backgroundImage:
          "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative">
        <div className="p-0">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Admin Dashboard
          </h2>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`px-4 py-2 rounded w-full sm:w-auto ${
                activeSection === "dashboard"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`px-4 py-2 rounded w-full sm:w-auto ${
                activeSection === "orders"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              Orders
            </button>

            <button
              onClick={() => setActiveSection("menu")}
              className={`px-4 py-2 rounded w-full sm:w-auto ${
                activeSection === "menu" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              Manage Menu
            </button>
          </div>

          {/* Render Sections */}
          <div className="border p-4 rounded-lg shadow bg-white w-full max-w-full sm:max-w-5xl md:max-w-7xl lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-[2000px] mx-auto">
            {activeSection === "dashboard" && <AdminDashboard />}
            {activeSection === "orders" && <AdminOrders />}
            {activeSection === "menu" && <AdminMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
