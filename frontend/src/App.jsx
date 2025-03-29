import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/User/Navbar";
import Home from "./components/User/Home";
import Menu from "./components/User/Menu";
import Cart from "./components/User/Cart";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPanel from "./components/Admin/AdminPanel";

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Function to handle admin login
  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  // Private route for admin panel
  const PrivateRoute = ({ element }) => {
    return isAdminAuthenticated ? element : <Navigate to="/admin-login" />;
  };

  return (
    <Router>
      
      
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleAdminLogin} />} />
        <Route path="/admin-panel" element={<PrivateRoute element={<AdminPanel />} />} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;










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