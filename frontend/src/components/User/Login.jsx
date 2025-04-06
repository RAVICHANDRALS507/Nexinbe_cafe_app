import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'; // Import toast
import Navbar from "./Navbar"; // Add this import

//const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ssprojects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          localStorage.setItem('token', data.token);
          toast.success("🎉 Login successful!");
          setTimeout(() => {
            navigate('/menu');
          }, 500);
        } else {
          // Check if the error indicates that the user doesn't exist
          if (data.error && data.error.includes('user not found')) {
            toast.error("It seems like you don't have an account. Please sign up first!");
          } else {
            toast.error(data.error || 'Invalid email or password');
          }
        }
      } catch (error) {
        console.error("❌ Error during login:", error);
        toast.error("Failed to connect to server!");
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 relative">
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
              Nexinbe <span className="text-orange-500">Cafe</span>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back User Login</h2>

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
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email
                Address</label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  placeholder="Enter your email"
                  required // Added required attribute
                />
              </motion.div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <motion.div whileTap={{ scale: 0.995 }} className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  placeholder="Enter your password"
                  required // Added required attribute
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? '👁️' : '🔒'}
                </button>
              </motion.div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              {/* <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange
600">
                Forgot Password?
              </Link>  */}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300
${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate
spin mr-2"></div>
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

          {/* Manual Button to Go to Menu Page */}
          <div className="mt-6 text-center">
            <Link to="/menu" className="text-sm text-blue-600 hover:underline">
                      Go to Menu Page
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 mt-8 text-center text-white text-sm"
      >
        By logging in, you agree to our{' '}
        <a href="#" className="text-orange-400 hover:text-orange-300">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-orange-400 hover:text-orange-300">
          Privacy Policy
        </a>
      </motion.p>
    </div>
    </>
  );
};

export default Login;