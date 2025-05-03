import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import Navbar from "../Navbar";

// ✅ Backend API URL
// const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/menu');
    }
  }, [navigate, setIsLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        const contentType = response.headers.get("Content-Type");
        if (!response.ok) {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
          } else {
            throw new Error("Unexpected response format from server.");
          }
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        toast.success("Login successful! Redirecting...", { autoClose: 3000 });
        navigate('/menu');
      } catch (error) {
        console.error("Error during login:", error);
        toast.error(error.message || "Failed to connect to server!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white">
              {/* Nexinbe <span className="text-orange-500">Cafe</span> */}
            </h1>
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-95"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Login</h2>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center"
            >
              {loginError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300`}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300`}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Log In'
              )}
            </motion.button>

            <p className="mt-6 text-center text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
