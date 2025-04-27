import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUserShield, FaBoxes, FaPlusCircle, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Backend API URL
//const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";

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
  const [showStock, setShowStock] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [editStock, setEditStock] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    unit: "units",
  });

  // ✅ Fetch user and admin stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admin/dashboard`);
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

      const response = await axios.post(`${BACKEND_URL}/api/admin/add`, payload);
      toast.success('Admin added successfully!');
      setShowForm(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("❌ Error adding admin:", err.response ? err.response.data : err.message);
      toast.error("❌ Error adding admin:", err.response ? err.response.data : err.message);
    }
  };

  // ✅ Fetch admins when Show Admins button is clicked
  const handleShowAdmins = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/admins`); // Changed from /api/admins to /api/admin/admins
      setAdminList(response.data);
      setShowAdmins(true);
      setShowStock(false); // Hide stock when showing admins
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
        const verifyResponse = await axios.post(`${BACKEND_URL}/api/admin/verify-password`, {
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
        `${BACKEND_URL}/api/admin/update/${editingAdmin._id}`, 
        updateData
      );

      if (response.data.message) {
        toast.success('Admin updated successfully!');
        setEditingAdmin(null);
        setShowPasswordFields(false);
        setCurrentPassword('');
        setEditPassword('');
        handleShowAdmins(); // Refresh admin list
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      toast.error(error.response?.data?.message || 'Failed to update admin');
    }
  };

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/admin/delete/${adminId}`);
        toast.success('Admin deleted successfully!');
        // Refresh admin list
        handleShowAdmins();
      } catch (error) {
        console.error('Error deleting admin:', error);
        toast.error('Failed to delete admin');
      }
    }
  };

  const handleViewStock = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/menu`);
      setStockList(response.data);
      setShowStock(true);
      setShowAdmins(false); // Hide admins when showing stock
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to load menu items');
    }
  };

  const deleteStockItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${BACKEND_URL}/api/stock/delete/${id}`);
        toast.success('Stock item deleted successfully!');
        handleViewStock(); // Refresh stock list
      } catch (error) {
        console.error("❌ Error deleting stock item:", error);
        toast.error("Failed to delete stock item");
      }
    }
  };

  const handleUpdateStock = (item) => {
    setEditingStock(item);
    setEditStock({
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
    });
  };

  const handleSaveStockUpdate = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/menu/${editingStock._id}`, editStock);
      toast.success('Menu item updated successfully!');
      setEditingStock(null);
      handleViewStock(); // Refresh list
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast.error('Failed to update menu item');
    }
  };

  return (
    <>
      {/* <AdminNavbar />  */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4 md:p-6 flex justify-center">
        <div className="w-full max-w-full sm:max-w-4xl md:max-w-6xl lg:max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1800px]">
          {/* Dashboard Header */}
          <div className="bg-white rounded-xl shadow-md mx-auto mb-4 sm:mb-8 px-4 sm:px-8 py-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage your cafe's users, admins, and inventory</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 mx-auto mb-8 px-2 sm:px-4 md:px-8">
            {/* Users Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaUsers className="text-3xl text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Registered Users</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {loading ? (
                      <div className="animate-pulse h-8 w-16 bg-gray-200 rounded" />
                    ) : (
                      stats.users
                    )}
                  </h3>
                </div>
              </div>
            </div>

            {/* Admins Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaUserShield className="text-3xl text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Existing Admins</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {loading ? (
                      <div className="animate-pulse h-8 w-16 bg-gray-200 rounded" />
                    ) : (
                      stats.admins
                    )}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={handleAddAdmin}
                  className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaPlusCircle className="mr-2" /> Add Admin
                </button>
                <button
                  onClick={handleShowAdmins}
                  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaUsers className="mr-2" /> View All
                </button>
              </div>
            </div>

            {/* Stock Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FaBoxes className="text-3xl text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Stock Management</p>
                  <h3 className="text-2xl font-bold text-gray-800">Inventory</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={handleViewStock}
                  className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <FaBoxes className="mr-2" /> View Stock
                </button>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          {(showAdmins || showStock) && (
            <div className="bg-white rounded-xl shadow-md overflow-x-auto mx-auto mt-8 p-2 sm:p-4 md:p-8">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {showAdmins ? 'Admin List' : 'Stock Management'}
                </h2>
              </div>
              <div className="overflow-x-auto">
                {showAdmins && (
                  <div className="p-4 sm:p-6">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                              Created Date
                            </th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                              Created Time
                            </th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {adminList.length > 0 ? (
                            adminList.map((admin) => (
                              <tr key={admin._id} className="hover:bg-gray-50">
                                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-center">
                                  {editingAdmin && editingAdmin._id === admin._id ? (
                                    <div className="space-y-4 max-w-md">
                                      <div className="flex flex-col items-center">
                                        <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
                                        <input
                                          type="text"
                                          value={editName}
                                          onChange={(e) => setEditName(e.target.value)}
                                          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          placeholder="Name"
                                        />
                                      </div>
                                      <button
                                        onClick={togglePasswordFields}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center gap-2 justify-center"
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
                                      {showPasswordFields && (
                                        <div className="space-y-3 border-t pt-3">
                                          <div className="flex flex-col items-center">
                                            <label className="text-sm font-medium text-gray-600 mb-1">Current Password</label>
                                            <input
                                              type="password"
                                              value={currentPassword}
                                              onChange={(e) => setCurrentPassword(e.target.value)}
                                              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                              placeholder="Enter current password"
                                            />
                                          </div>
                                          <div className="flex flex-col items-center">
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
                                  ) : (
                                    <div className="text-sm font-medium text-gray-900 flex justify-center items-center h-full">{admin.name}</div>
                                  )}
                                </td>
                                {/* Hide on small screens */}
                                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                                  <div className="text-sm text-gray-500">{admin.createdAtDate}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                                  <div className="text-sm text-gray-500">{admin.createdAtTime}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-center">
                                  {editingAdmin && editingAdmin._id === admin._id ? (
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center">
                                      <button
                                        onClick={handleSaveUpdate}
                                        className="text-green-600 hover:text-green-900 md:mr-4"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingAdmin(null)}
                                        className="text-gray-600 hover:text-gray-900"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center">
                                      <button
                                        onClick={() => handleUpdate(admin)}
                                        className="text-indigo-600 hover:text-indigo-900 md:mr-4"
                                      >
                                        Update
                                      </button>
                                      <button
                                        onClick={() => handleDelete(admin._id)}
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="px-4 sm:px-6 py-3 sm:py-4 text-center text-sm text-gray-500">
                                No admins found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {showStock && (
                  <div className="p-4 sm:p-6">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stockList.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                {editingStock && editingStock._id === item._id ? (
                                  <input
                                    type="text"
                                    value={editStock.name}
                                    onChange={(e) => setEditStock({ ...editStock, name: e.target.value })}
                                    className="border rounded-md px-3 py-1 w-full"
                                  />
                                ) : (
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                )}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                {editingStock && editingStock._id === item._id ? (
                                  <select
                                    value={editStock.category}
                                    onChange={(e) => setEditStock({ ...editStock, category: e.target.value })}
                                    className="border rounded-md px-3 py-1 w-full"
                                  >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Food">Food</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Others">Others</option>
                                  </select>
                                ) : (
                                  <div className="text-sm text-gray-500">{item.category}</div>
                                )}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                {editingStock && editingStock._id === item._id ? (
                                  <input
                                    type="number"
                                    value={editStock.price}
                                    onChange={(e) => setEditStock({ ...editStock, price: Number(e.target.value) })}
                                    className="border rounded-md px-3 py-1 w-full"
                                  />
                                ) : (
                                  <div className="text-sm text-gray-500">₹{item.price}</div>
                                )}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                {editingStock && editingStock._id === item._id ? (
                                  <input
                                    type="number"
                                    value={editStock.quantity}
                                    onChange={(e) => setEditStock({ ...editStock, quantity: Number(e.target.value) })}
                                    className="border rounded-md px-3 py-1 w-full"
                                  />
                                ) : (
                                  <div className="text-sm text-gray-500">{item.quantity}</div>
                                )}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                {editingStock && editingStock._id === item._id ? (
                                  <select
                                    value={editStock.unit}
                                    onChange={(e) => setEditStock({ ...editStock, unit: e.target.value })}
                                    className="border rounded-md px-3 py-1 w-full"
                                  >
                                    <option value="" disabled>Select Category</option>
                                    <option value="kg">kg</option>
                                    <option value="Liters">Liters</option>
                                    <option value="Units">Units</option>
                                    <option value="plates">plates</option>
                                    <option value="Other">Other</option>
                                  </select>
                                ) : (
                                  <div className="text-sm text-gray-500">{item.unit}</div>
                                )}
                              </td>
                              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                {editingStock && editingStock._id === item._id ? (
                                  <>
                                    <button
                                      onClick={handleSaveStockUpdate}
                                      className="text-green-600 hover:text-green-900"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingStock(null)}
                                      className="text-gray-600 hover:text-gray-900"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleUpdateStock(item)}
                                      className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                      Update
                                    </button>
                                    {/* <button
                                      onClick={() => deleteStockItem(item._id)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      <FaTrash className="inline-block mr-1" /> Delete
                                    </button> */}
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-4 sm:p-6 relative">
                <button
                  onClick={() => {
                    setShowForm(false);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-xl" />
                </button>
                <div>
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
              </div>
            </div>
          )}

          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;