import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar"; // Add this import

// const REACT_APP_BACKEND_URL = "http://localhost:5000";
//const REACT_APP_BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    try {
      // ✅ API Call to Backend
      const response = await fetch(`${REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("🎉 User registered successfully!");
        
        // ✅ Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.error || "Failed to register");
      }
    } catch (error) {
      console.error("❌ Error connecting to backend:", error);
      toast.error("Failed to connect to the server. Please try again.");
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
            paddingTop: '10rem', // Adjust padding to avoid overlap with Navbar
        }}
      >
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Register User Account</h2>

          {/* ✅ Success or Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {/* ✅ Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
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
              type="text"
              name="number"
              placeholder="Number"
              value={formData.number}
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
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Add ToastContainer at the end of the component */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default Signup;
