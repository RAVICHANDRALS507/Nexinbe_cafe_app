import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login"); // Redirect to login if no token
    }
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken"); // Logout functionality
          navigate("/admin-login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
