import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react"; 
import Navbar from "./components/Navbar"; 
import UserNavbar from "./components/User/UserNavbar"; 
import AdminNavbar from "./components/Admin/AdminNavbar"; 
import Home from "./components/User/Home"; 
import Menu from "./components/User/Menu"; 
import Cart from "./components/User/Cart"; 
import Signup from "./components/User/Signup"; 
import Payment from "./components/User/Payment"; 
import Login from "./components/User/Login"; 
import AdminLogin from "./components/Admin/AdminLogin"; 
import AdminPanel from "./components/Admin/AdminPanel"; 
import Bill from "./components/User/Bill"; 
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
const ProtectedAdminRoute = ({ children }) => { 
  const adminToken = localStorage.getItem("adminToken"); 
  const location = useLocation(); 
   
  if (!adminToken) { 
    toast.error("Please login as admin to access this page"); 
    return <Navigate to="/admin-login" state={{ from: location }} replace />; 
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
        <UserNavbar setIsLoggedIn={setIsLoggedIn} /> 
      ) : ( 
        <Navbar /> 
      )} 
 
      <InactivityTimeout /> 
      <Routes> 
        {/* Public Routes */} 
        <Route path="/" element={<Navigate to="/home" replace />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="bill" element={<Bill/>}/>
        <Route  
          path="/login"  
          element={ 
            isLoggedIn ? ( 
              <Navigate to="/home" replace /> 
            ) : ( 
              <Login setIsLoggedIn={setIsLoggedIn} /> 
            ) 
          }  
        /> 
        <Route  
          path="/admin-login"  
          element={ 
            isAdminLoggedIn ? ( 
              <Navigate to="/admin-panel" replace /> 
            ) : ( 
              <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} /> 
            ) 
          }  
        /> 
 
        {/* Protected User Routes */} 
        <Route path="/menu" element={<Menu />} /> 
        <Route  
          path="/cart"  
          element={ 
            <ProtectedRoute> 
              <Cart /> 
            </ProtectedRoute> 
          }  
        /> 
        <Route  
          path="/payment"  
          element={ 
            <ProtectedRoute> 
              <Payment /> 
            </ProtectedRoute> 
          }  
        /> 
        <Route  
          path="/order-tracking"  
          element={ 
            <ProtectedRoute> 
              <div className="p-4 text-center"> 
                Order Tracking Page (To be implemented) 
              </div> 
            </ProtectedRoute> 
          }  
        /> 
 
        {/* Protected Admin Routes */} 
        <Route  
          path="/admin-panel"  
          element={ 
            <ProtectedAdminRoute> 
              <AdminPanel /> 
            </ProtectedAdminRoute> 
          }  
        /> 
        <Route  
          path="/admin-dashboard"  
          element={ 
            <ProtectedAdminRoute> 
              <AdminPanel /> 
            </ProtectedAdminRoute> 
          }  
        /> 
 
        {/* Fallback Route */} 
        <Route path="*" element={<Navigate to="/home" replace />} /> 
      </Routes> 
      <ToastContainer  
        position="top-right"  
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      /> 
    </Router> 
  ); 
} 
 
export default App;