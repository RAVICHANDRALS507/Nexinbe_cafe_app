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

    toast.error(`Please login to access ${pageName}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Protected Route for admin
const PrivateAdminRoute = ({ element }) => {
  const isAdminAuthenticated = localStorage.getItem("adminToken");
  return isAdminAuthenticated ? element : <Navigate to="/admin-login" />;
};

const ProtectedAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  
  if (!adminToken) {
    toast.error("Please login as admin to access this page");
    return <Navigate to="/admin-login" />;
  }
  
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");
      setIsLoggedIn(!!token);
      setIsAdminLoggedIn(!!adminToken);
    };

    checkAuth();
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <Router>
      {/* Conditional Navbar Rendering */}
      {isAdminLoggedIn ? (
        <AdminNavbar setIsAdminLoggedIn={setIsAdminLoggedIn} />
      ) : isLoggedIn ? (
        <UserNavbar setIsLoggedIn={setIsLoggedIn} /> // Pass setIsLoggedIn here
      ) : (
        <Navbar />
      )}

      <InactivityTimeout />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          } 
        />
        <Route 
          path="/admin-login" 
          element={
            isAdminLoggedIn ? (
              <Navigate to="/admin-panel" />
            ) : (
              <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />
            )
          } 
        />

        {/* Protected User Routes */}
        <Route path="/menu" element={<Menu />} /> {/* Ensure Menu route exists */}
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