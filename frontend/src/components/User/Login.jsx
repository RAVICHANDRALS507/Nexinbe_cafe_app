import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar"; // Add this import
import { toast } from "react-toastify"; // Import toast

import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

//const REACT_APP_BACKEND_URL = "http://localhost:5000";
 //const REACT_APP_BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store JWT token in localStorage
        localStorage.setItem("token", data.token);

        // ✅ Show success toast message
        toast.success("🎉 Login successful!");

        // ✅ Redirect to menu page after 2 seconds
        setTimeout(() => {
          navigate("/menu"); // Redirecting to '/menu' route
        }, 500);
      } else {
        toast.error(data.error || "Invalid credentials!"); // Show error toast
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      toast.error("Failed to connect to server!"); // Show error toast for server failure
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
          paddingTop: "10rem", // Adjust padding to avoid overlap with Navbar
        }}
      >
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
