import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors
    setSuccess(""); // Reset success message

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store JWT token in localStorage
        localStorage.setItem("token", data.token);
        
        // ✅ Show success message
        setSuccess("🎉 Login successful!");

        // ✅ Redirect to homepage after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.error || "Invalid credentials!");
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      setError("Failed to connect to server!");
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://s.yimg.com/uu/api/res/1.2/kzhpTHJTqgFCN1aFKaHN4Q--~B/aD0zNjgwO3c9NTUyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://img.huffingtonpost.com/asset/5ce9c6192100006d0c80b350.jpeg')",
      }}
    >
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>

        {/* ✅ Show Success or Error Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
            className="w-full p-2 border rounded-lg" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange}
            className="w-full p-2 border rounded-lg" 
            required 
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
