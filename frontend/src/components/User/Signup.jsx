import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar"; // Add this import

//const BACKEND_URL = "http://localhost:5000"; // Make sure this is correct for your backend
const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

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
        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          number: formData.number,
        });

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
          backgroundImage: `url('https://th.bing.com/th/id/OIP.vflclr4yRBpju0nL7ImkvQHaFj?w=230&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')`,
          paddingTop: '6rem', // Adjust padding to avoid overlap with Navbar
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0"></div>

        {/* Logo */}
        <div className="w-full max-w-md text-center mb-8 z-10">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            Cafe<span className="text-orange-500">Signup</span>
          </motion.h1>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md z-10"
        >
          <div className="bg-white/90 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Create your account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name', type: 'text', placeholder: 'Full Name' },
                { name: 'email', type: 'email', placeholder: 'Email' },
                { name: 'number', type: 'tel', placeholder: 'Phone Number' },
                { name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Password' },
              ].map((field) => (
                <div key={field.name}>
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-2 rounded-lg border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 outline-none`}
                    required={field.name !== 'name' ? true : false} // Adjust required as needed
                  />
                  {errors[field.name] && <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>}
                </div>
              ))}

              {/* Toggle Password Visibility */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>

              {/* Submit */}
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

        {/* Toast Container */}
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