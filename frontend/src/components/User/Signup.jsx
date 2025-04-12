import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar";

// Icons
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from 'react-icons/fa';

// ✅ Backend API URL
//const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    const phoneRegex = /^\d{10}$/;
    if (!formData.number.trim()) newErrors.number = 'Phone is required';
    else if (!phoneRegex.test(formData.number)) newErrors.number = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, formData);
        if (response.data) {
          toast.success("🎉 Account created! Redirecting to login...");
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please correct the form errors.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md z-10 mt-20"
        >
          <div className="bg-white/90 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Create User Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                <input
                  name="number"
                  type="tel"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.number ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                />
                {errors.number && <p className="text-sm text-red-500 mt-1">{errors.number}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full pl-10 px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>

              {/* Show/Hide Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300
                  ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            {/* Login Redirect */}
            <p className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-8 text-white text-sm text-center z-10 drop-shadow">
          By signing up, you agree to our{' '}
          <a href="#" className="text-orange-300 underline">Terms</a> and{' '}
          <a href="#" className="text-orange-300 underline">Privacy Policy</a>.
        </p>

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
