import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUserShield } from "react-icons/fa";

// ✅ Backend API URL
const API_BASE_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminList, setAdminList] = useState([]); // To store the list of admins
  const [showAdmins, setShowAdmins] = useState(false); // To toggle showing admins

  // ✅ Fetch user and admin stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard`);
        if (response.data) {
          setStats({
            users: response.data.users || 0, // 📊 Registered Users
            admins: response.data.admins || 0, // 👨‍💼 Existing Admins
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchStats(); // 🔥 Call the function when the component mounts
  }, []);

  // ✅ Handle adding a new admin (toggle form visibility)
  const handleAddAdmin = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  // ✅ Handle form submission to add a new admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please provide both username and password.");
      return;
    }

    try {
      // Prepare the payload for the backend
      const payload = {
        name: username,  // Backend expects 'name'
        password,        // Backend expects 'password'
      };

      // Check if the payload is formatted correctly
      console.log("Sending Payload:", payload);

      const response = await axios.post(`${API_BASE_URL}/api/admin/add`, payload);

      // Handle successful admin addition
      console.log("Admin added:", response.data);
      setShowForm(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      // More detailed error logging
      console.error("❌ Error adding admin:", err.response ? err.response.data : err.message);
      setError("Failed to add new admin.");
    }
  };

  // ✅ Fetch admins when Show Admins button is clicked
  const handleShowAdmins = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admins`);
      setAdminList(response.data); // Set the admin list
      setShowAdmins(true); // Toggle to show the admin list
    } catch (err) {
      console.error("❌ Error fetching admins:", err);
      setError("Failed to load admin details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ✅ Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* 📊 Registered Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Registered Users
              </h2>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
              )}
            </div>
          </div>
        </div>

        {/* 👨‍💼 Existing Admins */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center space-x-4">
            <FaUserShield className="text-4xl text-red-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Existing Admins
              </h2>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
              )}
            </div>
          </div>

          {/* Buttons for Add New Admin and Show Existing Admins */}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleAddAdmin}
              className="w-1/2 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
            >
              Add New Admin
            </button>
            <button
              onClick={handleShowAdmins}
              className="w-1/2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Show Existing Admins
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the form for adding a new admin */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Add New Admin</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300"
              >
                Add Admin
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display List of Admins if Show Admins button is clicked */}
      {showAdmins && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Admin List</h3>
          <ul className="mt-4 space-y-2">
            {adminList.length > 0 ? (
              adminList.map((admin, index) => (
                <li key={index} className="p-2 border-b">
                  <p className="text-lg font-semibold">{admin.name}</p>
                  <p className="text-sm text-gray-500">
                    Created at: {admin.createdAtDate} {admin.createdAtTime}
                  </p>
                </li>
              ))
            ) : (
              <p>No admins found</p>
            )}
          </ul>
        </div>
      )}

      {/* ❌ Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default AdminDashboard;
