import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    navigate("/login"); // Redirect to login page after signup
  };

  const handleGoogleSignup = () => {
    console.log("Google Sign-Up Clicked");
    // Implement Google OAuth signup here
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <input type="text" name="number" placeholder="Number" value={formData.text} onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Sign Up</button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>

        <div className="mt-4">
          <button 
            onClick={handleGoogleSignup} 
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg">
            <img src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-480x432.png" 
                 alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
