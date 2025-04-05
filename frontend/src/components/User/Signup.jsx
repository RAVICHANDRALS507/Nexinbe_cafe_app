// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "./Navbar"; // Add this import

// const BACKEND_URL = "http://localhost:5000";
// //const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   // ✅ Handle Input Changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Signup Data:", formData);

//     try {
//       // ✅ API Call to Backend
//       const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("🎉 User registered successfully!");
        
//         // ✅ Redirect to login page after 2 seconds
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         toast.error(data.error || "Failed to register");
//       }
//     } catch (error) {
//       console.error("❌ Error connecting to backend:", error);
//       toast.error("Failed to connect to the server. Please try again.");
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
//             paddingTop: '10rem', // Adjust padding to avoid overlap with Navbar
//         }}
//       >
//         {/* Dark Overlay for better text visibility */}
//         <div className="absolute inset-0 bg-black opacity-50"></div>

//         <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
//           <h2 className="text-2xl font-bold text-center mb-6">Register User Account</h2>

//           {/* ✅ Success or Error Message */}
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           {success && <p className="text-green-500 text-center mb-4">{success}</p>}

//           {/* ✅ Signup Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
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
//               type="text"
//               name="number"
//               placeholder="Number"
//               value={formData.number}
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
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="mt-4 text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>

//         {/* Add ToastContainer at the end of the component */}
//         <ToastContainer
//           position="bottom-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />
//       </div>
//     </>
//   );
// };

// export default Signup;



// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const BACKEND_URL = "http://localhost:5000";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [signupSuccess, setSignupSuccess] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
    
//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

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
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     // Phone validation
//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!phoneRegex.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid 10-digit phone number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(`${BACKEND_URL}/api/users/signup`, {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone
//         });

//         if (response.data) {
//           setSignupSuccess(true);
//           setTimeout(() => {
//             navigate('/login');
//           }, 2000);
//         }
//       } catch (error) {
//         setErrors({
//           submit: error.response?.data?.message || 'Something went wrong. Please try again.'
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col items-center justify-center p-4">
//       {/* Logo and Navigation */}
//       <div className="w-full max-w-md text-center mb-8">
//         <Link to="/" className="inline-block">
//           <motion.h1 
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-bold text-orange-500"
//           >
//             Nexinbe <span className="text-gray-800">Cafe</span>
//           </motion.h1>
//         </Link>
//       </div>

//       {/* Main Card */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="w-full max-w-md"
//       >
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Create your account
//           </h2>

//           {/* Success Message */}
//           {signupSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center"
//             >
//               Account created successfully! Redirecting to login...
//             </motion.div>
//           )}

//           {/* Error Message */}
//           {errors.submit && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center"
//             >
//               {errors.submit}
//             </motion.div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.name ? 'border-red-500' : 'border-gray-200'
//                 } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                 placeholder="Enter your full name"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-500">{errors.name}</p>
//               )}
//             </div>

//             {/* Email Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.email ? 'border-red-500' : 'border-gray-200'
//                 } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     errors.password ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                   placeholder="Create a password"
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
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Confirm Password
//               </label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
//                 } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
//               )}
//             </div>

//             {/* Phone Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 rounded-lg border ${
//                   errors.phone ? 'border-red-500' : 'border-gray-200'
//                 } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300`}
//                 placeholder="Enter your phone number"
//               />
//               {errors.phone && (
//                 <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 
//                 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'}`}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
//                   Creating Account...
//                 </div>
//               ) : (
//                 'Sign Up'
//               )}
//             </button>
//           </form>

//           {/* Login Link */}
//           <p className="mt-6 text-center text-gray-600">
//             Already have an account?{' '}
//             <Link
//               to="/login"
//               className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300"
//             >
//               Log In
//             </Link>
//           </p>
//         </div>
//       </motion.div>

//       {/* Footer */}
//       <p className="mt-8 text-center text-gray-500 text-sm">
//         By signing up, you agree to our{' '}
//         <a href="#" className="text-orange-500 hover:text-orange-600">
//           Terms of Service
//         </a>{' '}
//         and{' '}
//         <a href="#" className="text-orange-500 hover:text-orange-600">
//           Privacy Policy
//         </a>
//       </p>
//     </div>
//   );
// };

// export default Signup;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { motion } from "framer-motion/dist/framer-motion";
import axios from 'axios';

//const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BACKEND_URL}/api/users/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });

        if (response.data) {
          setSignupSuccess(true);
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || 'Something went wrong.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('https://th.bing.com/th/id/OIP.vflclr4yRBpju0nL7ImkvQHaFj?w=230&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')`
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

          {signupSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center"
            >
              Account created! Redirecting to login...
            </motion.div>
          )}

          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center"
            >
              {errors.submit}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", type: "text", placeholder: "Full Name" },
              { name: "email", type: "email", placeholder: "Email" },
              { name: "password", type: showPassword ? "text" : "password", placeholder: "Password" },
              { name: "confirmPassword", type: showPassword ? "text" : "password", placeholder: "Confirm Password" },
              { name: "phone", type: "tel", placeholder: "Phone Number" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-orange-500 outline-none`}
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
                )}
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
    </div>
  );
};

export default Signup;

