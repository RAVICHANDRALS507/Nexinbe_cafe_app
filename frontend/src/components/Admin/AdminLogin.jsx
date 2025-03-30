import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../User/Navbar";

// ✅ Backend API URL
//const REACT_APP_BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center pt-16"
        style={{
          backgroundImage:
            "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
            paddingTop: '4rem', // Adjust padding to avoid overlap with Navbar
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Admin Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
