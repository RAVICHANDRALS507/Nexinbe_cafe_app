// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Navbar from "./Navbar"; // Add this import
// import { toast } from "react-toastify"; // Import toast

// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

// const BACKEND_URL = "http://localhost:5000";
// //const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   // ✅ Handle Input Changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // ✅ Store JWT token in localStorage
//         localStorage.setItem("token", data.token);

//         // ✅ Show success toast message
//         toast.success("🎉 Login successful!");

//         // ✅ Redirect to menu page after 2 seconds
//         setTimeout(() => {
//           navigate("/menu"); // Redirecting to '/menu' route
//         }, 500);
//       } else {
//         toast.error(data.error || "Invalid credentials!"); // Show error toast
//       }
//     } catch (error) {
//       console.error("❌ Error during login:", error);
//       toast.error("Failed to connect to server!"); // Show error toast for server failure
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
//           paddingTop: "10rem", // Adjust padding to avoid overlap with Navbar
//         }}
//       >
//         {/* Dark Overlay for better text visibility */}
//         <div className="absolute inset-0 bg-black opacity-50"></div>

//         <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
//           <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-lg"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-4 text-center">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-500">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;



// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const BACKEND_URL = "http://localhost:5000";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginError, setLoginError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear errors when user types
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//     setLoginError('');
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(`${BACKEND_URL}/api/users/login`, {
//           email: formData.email,
//           password: formData.password
//         });

//         if (response.data) {
//           // Store the token in localStorage
//           localStorage.setItem('token', response.data.token);
//           // Redirect to dashboard or home page
//           navigate('/');
//         }
//       } catch (error) {
//         setLoginError(error.response?.data?.message || 'Invalid email or password');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
//       {/* Background Image with Overlay */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-8"
//         >
//           <Link to="/" className="inline-block">
//             <h1 className="text-4xl font-bold text-white">
//               Nexinbe <span className="text-orange-500">Cafe</span>
//             </h1>
//           </Link>
//         </motion.div>

//         {/* Login Card */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-95"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Welcome Back
//           </h2>

//           {/* Error Message */}
//           {loginError && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center"
//             >
//               {loginError}
//             </motion.div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Email Address
//               </label>
//               <motion.div
//                 whileTap={{ scale: 0.995 }}
//               >
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.email ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                   placeholder="Enter your email"
//                 />
//               </motion.div>
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Password
//               </label>
//               <motion.div
//                 whileTap={{ scale: 0.995 }}
//                 className="relative"
//               >
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.password ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   )}
//                 </button>
//               </motion.div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//               )}
//             </div>

//             {/* Forgot Password Link */}
//             <div className="flex justify-end">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-300"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300
//                 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'}`}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
//                   Logging in...
//                 </div>
//               ) : (
//                 'Log In'
//               )}
//             </motion.button>

//             {/* Sign Up Link */}
//             <p className="mt-6 text-center text-gray-600">
//               Don't have an account?{' '}
//               <Link
//                 to="/signup"
//                 className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </form>
//         </motion.div>
//       </div>

//       {/* Footer */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="relative z-10 mt-8 text-center text-white text-sm"
//       >
//         By logging in, you agree to our{' '}
//         <a href="#" className="text-orange-400 hover:text-orange-300">
//           Terms of Service
//         </a>{' '}
//         and{' '}
//         <a href="#" className="text-orange-400 hover:text-orange-300">
//           Privacy Policy
//         </a>
//       </motion.p>
//     </div>
//   );
// };

// export default Login;





import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

//const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
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
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, {
          email: formData.email,
          password: formData.password
        });

        if (response.data) {
          localStorage.setItem('token', response.data.token);
          // ✅ Redirect to menu page after login
          navigate('/menu');
        }
      } catch (error) {
        setLoginError(error.response?.data?.message || 'Invalid email or password');
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
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

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
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </motion.div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
                Forgot Password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              }`}
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

          {/* ✅ Manual Button to Go to Menu Page */}
          <div className="mt-6 text-center">
            <Link to="/menu" className="text-sm text-blue-600 hover:underline">
              🚀 Go to Menu Page
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
  );
};

export default Login;

