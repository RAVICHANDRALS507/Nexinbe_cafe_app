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
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);

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
      setError(""); // Clear any error message if admin added successfully
    } catch (err) {
      // More detailed error logging
      console.error("❌ Error adding admin:", err.response ? err.response.data : err.message);
      setError("Failed to add new admin.");
    }
  };

  // ✅ Fetch admins when Show Admins button is clicked
  const handleShowAdmins = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/admins`); // Changed from /api/admins to /api/admin/admins
      setAdminList(response.data);
      setShowAdmins(true);
    } catch (err) {
      console.error("❌ Error fetching admins:", err);
      setError("Failed to load admin details.");
    }
  };

  const handleUpdate = async (admin) => {
    setEditingAdmin(admin);
    setEditName(admin.name);
    setEditPassword('');
    setCurrentPassword('');
    setShowPasswordFields(false); // Reset password fields visibility
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handleSaveUpdate = async () => {
    try {
      let updateData = { name: editName };

      if (showPasswordFields) {
        if (!currentPassword) {
          setError('Please enter your current password');
          return;
        }
        if (!editPassword) {
          setError('Please enter a new password');
          return;
        }

        // First verify current password
        const verifyResponse = await axios.post(`${API_BASE_URL}/api/admin/verify-password`, {
          adminId: editingAdmin._id,
          currentPassword
        });

        if (!verifyResponse.data.isValid) {
          setError('Current password is incorrect');
          return;
        }

        // Include password in update data if verification successful
        updateData.password = editPassword;
      }

      // Proceed with update
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/update/${editingAdmin._id}`, 
        updateData
      );

      if (response.data.message) {
        setEditingAdmin(null);
        setShowPasswordFields(false);
        setCurrentPassword('');
        setEditPassword('');
        handleShowAdmins(); // Refresh admin list
        setError(''); // Clear any existing errors
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      setError(error.response?.data?.message || 'Failed to update admin. Please try again.');
    }
  };

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/admin/delete/${adminId}`);
        // Refresh admin list
        handleShowAdmins();
      } catch (error) {
        console.error('Error deleting admin:', error);
        setError('Failed to delete admin');
      }
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
          <div className="mt-4">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminList.length > 0 ? (
                  adminList.map((admin) => (
                    <tr key={admin._id}>
                      {editingAdmin && editingAdmin._id === admin._id ? (
                        <td className="px-6 py-4">
                          <div className="space-y-4 max-w-md">
                            {/* Name Input */}
                            <div className="flex flex-col">
                              <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Name"
                              />
                            </div>

                            {/* Password Toggle Button */}
                            <button
                              onClick={togglePasswordFields}
                              className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center gap-2"
                            >
                              {showPasswordFields ? (
                                <>
                                  <span>Hide Password Fields</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <span>Change Password</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                  </svg>
                                </>
                              )}
                            </button>
                            
                            {/* Password Fields */}
                            {showPasswordFields && (
                              <div className="space-y-3 border-t pt-3">
                                <div className="flex flex-col">
                                  <label className="text-sm font-medium text-gray-600 mb-1">Current Password</label>
                                  <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter current password"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-sm font-medium text-gray-600 mb-1">New Password</label>
                                  <input
                                    type="password"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter new password"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{admin.createdAtDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{admin.createdAtTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingAdmin && editingAdmin._id === admin._id ? (
                          <button
                            onClick={handleSaveUpdate}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdate(admin)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Update
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(admin._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No admins found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ❌ Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default AdminDashboard;
