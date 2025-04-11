// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/User/Home";
// import Menu from "./components/User/Menu";
// import Cart from "./components/User/Cart";
// import Signup from "./components/User/Signup";
// import Login from "./components/User/Login";
// import AdminLogin from "./components/Admin/AdminLogin";
// import AdminPanel from "./components/Admin/AdminPanel";
// import InactivityTimeout from "./components/InactivityTimeout"; // Import the InactivityTimeout component
// import { ToastContainer } from "react-toastify"; // Uncomment if you want to use ToastContainer

// function App() {
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

//   // Function to handle admin login
//   const handleAdminLogin = () => {
//     setIsAdminAuthenticated(true);
//   };

//   // Private route for admin panel
//   const PrivateRoute = ({ element }) => {
//     return isAdminAuthenticated ? element : <Navigate to="/admin-login" />;
//   };

//   return (
//     <Router>
      
//       <InactivityTimeout />
//       <Routes>
        
//         <Route path="/home" element={<Home />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />
//         <Route path="/admin-panel" element={<PrivateRoute element={<AdminPanel />} />} />
//         <Route path="/admin-dashboard" element={<AdminPanel />} />
//         <Route path="*" element={<Navigate to="/home" />} />
//       </Routes>
//       <ToastContainer />
//     </Router>
//   );
// }

// export default App;












import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/User/UserNavbar";
import AdminNavbar from "./components/Admin/AdminNavbar"; // Make sure you import the AdminNavbar
import Home from "./components/User/Home";
import Menu from "./components/User/Menu";
import Cart from "./components/User/Cart";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPanel from "./components/Admin/AdminPanel";
import InactivityTimeout from "./components/InactivityTimeout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ProtectedRoute component for user auth
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    const pageName = location.pathname
      .split("/")[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    toast.error(`🔒 Please login to access ${pageName}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Protected Route for admin
const PrivateAdminRoute = ({ element }) => {
  const isAdminAuthenticated = localStorage.getItem("adminToken");
  return isAdminAuthenticated ? element : <Navigate to="/admin-login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    setIsLoggedIn(!!token);
    setIsAdminAuthenticated(!!adminToken);
  }, []);

  const handleAdminLogin = () => {
    localStorage.setItem("adminToken", "someDummyToken"); // Simulate admin login
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken"); // Also clear admin token
    setIsLoggedIn(false);
    setIsAdminAuthenticated(false); // Clear admin status
  };

  return (
    <Router>
      {/* Render the appropriate Navbar based on the authentication status */}
      {isLoggedIn ? <UserNavbar onLogout={handleLogout} /> : <Navbar />}

      
      <InactivityTimeout />

      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />

        {/* Protected User Routes */}
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/order-tracking" element={<ProtectedRoute><div className="p-4 text-center">Order Tracking Page (To be implemented)</div></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/admin-panel" element={<PrivateAdminRoute element={<AdminPanel />} />} />
        <Route path="/admin-dashboard" element={<PrivateAdminRoute element={<AdminPanel />} />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;


























// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import UserNavbar from "./components/User/UserNavbar";
// import Home from "./components/User/Home";
// import Menu from "./components/User/Menu";
// import Cart from "./components/User/Cart";
// import Signup from "./components/User/Signup";
// import Login from "./components/User/Login";
// import AdminLogin from "./components/Admin/AdminLogin";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import OrderTracking from "./components/User/Order";
// import InactivityTimeout from "./components/InactivityTimeout";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Protected Route for user
// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("token");
//   const location = useLocation();

//   if (!isLoggedIn) {
//     const pageName = location.pathname
//       .split("/")[1]
//       .replace(/-/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());

//     toast.error(`🔒 Please login to access ${pageName}`);
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// // Protected Route for admin
// const PrivateAdminRoute = ({ element }) => {
//   const isAdmin = localStorage.getItem("adminToken");
//   return isAdmin ? element : <Navigate to="/admin-login" />;
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   // On mount, check tokens
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const adminToken = localStorage.getItem("adminToken");

//     setIsLoggedIn(!!token);
//     setIsAdmin(!!adminToken);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   // Handle admin login
//   const handleAdminLogin = () => {
//     localStorage.setItem("adminToken", "someDummyToken");
//     setIsAdmin(true);
//   };

//   return (
//     <Router>
//       {/* Dynamic Navbar */}
//       {isLoggedIn && !isAdmin ? <UserNavbar onLogout={handleLogout} /> : <Navbar />}

//       <InactivityTimeout />

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/login"
//           element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />

//         {/* Protected User Routes */}
//         <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
//         <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//         <Route path="/order-tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

//         {/* Protected Admin Routes */}
//         <Route path="/admin-panel" element={<PrivateAdminRoute element={<AdminDashboard />} />} />
//         <Route path="/admin-dashboard" element={<PrivateAdminRoute element={<AdminDashboard />} />} />

//         {/* Fallback Route */}
//         <Route path="*" element={<Navigate to="/home" />} />
//       </Routes>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </Router>
//   );
// }

// export default App;






























// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Menu from "./components/Menu";
// import Cart from "./components/Cart";
// import Signup from "./components/Signup";
// import Login from "./components/Login";

// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         {/* Add other routes as needed */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;







































































































// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Menu from "./components/Menu";
// import Cart from "./components/Cart";
// import Signup from "./components/Signup";
// import Login from "./components/Login";

// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         {/* Add other routes as needed */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;