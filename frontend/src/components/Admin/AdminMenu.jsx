import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { toast, ToastContainer } from 'react-toastify'; // Add ToastContainer here
import 'react-toastify/dist/ReactToastify.css';

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVHic7ZsxTsMwFIb/Z2NBYkGq1IXF9AacA3EGzkA5A0dgYOIYHIFDcA5gY2FhQQiJpVJ3kNrBVGKIkzhO47xn9/ukN9WJ/ed7sp3IgOd/UZoTRLQC8ADgyx1XB3zO5YjIA+AZwMo0TRfOuZ/guQEwf+eoEfacc+vw4LEwJz/GrwEAd+PGqRcAiwC4HT9OvQDAMoQ4TqB6AUQL+JAgrEU1vbgEZg0vgVnDS2DW8BKYNbwEZg0vgVnDS2DW8BKYNbwEZo0+JagA7AFsAZQAyu7YAng0c3PODfbhr0gPfQLwbOZSSGEJ1ABWZq6EFBT+ZZhLIgGFzwG5NBJQ+ByQSyQBhc8BuVQSUPgckEsmAYXPAbmJJEhxn7AE8GbmUkhB4deWuSQSUPgckEsjAYXPAbkkElD4HJBLIQGFzwG5BBKkuN0tAbwDeDFzKaSQQm51ANYALgF8dMclgA0uvePjOM4JRHQBoALwCeDaOfcdPDf/zvU4y865r/DhF6ys7wclKe1qAAAAAElFTkSuQmCC";

// ✅ Backend API URL
// const BACKEND_URL = "http://localhost:5000";
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";


const AdminMenu = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "", // Changed from "Drinks" to empty string
    price: "",
    quantity: "",
    unit: "", // Changed from "units" to empty string
  });
  const [image, setImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [itemAddedMessage, setItemAddedMessage] = useState(null); // State for item added message
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1, // Limit the file size to 1MB
      maxWidthOrHeight: 1024, // Resize the image to fit within 1024px
    };
    const compressedFile = await imageCompression(file, options); // Compress the image
    setImage(compressedFile);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditing(true);
    setNewItem({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      quantity: item.quantity || "", // Add quantity
      unit: item.unit || "units",    // Add unit
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/menu/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Item deleted successfully!");
        fetchMenuItems(); // Refresh the menu items list
      } else {
        const result = await response.json();
        toast.error(`Failed to delete item: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error occurred while deleting item");
    }
  };

  const fetchMenuItems = async () => {
    try {
      setStatusMessage("Loading menu items...");
      setStatusType("info");
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/api/menu`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setMenuItems(data);
        setShowMenu(true);
        setStatusMessage(null);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setStatusMessage("❌ Failed to fetch menu items. Please try again.");
      setStatusType("error");
      setShowMenu(false);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMenuItems = () => {
    if (activeCategory === "All") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced validation
    if (!newItem.name.trim()) {
      toast.error("Item name is required!");
      return;
    }
    if (!newItem.description.trim()) {
      toast.error("Description is required!");
      return;
    }
    if (!newItem.category) {
      toast.error("Please select a category!");
      return;
    }
    if (!newItem.price || newItem.price <= 0) {
      toast.error("Please enter a valid price!");
      return;
    }
    if (!newItem.quantity || newItem.quantity <= 0) {
      toast.error("Please enter a valid quantity!");
      return;
    }
    if (!newItem.unit) {
      toast.error("Please select a unit of measurement!");
      return;
    }
    if (!isEditing && !image) {
      toast.error("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("category", newItem.category);
    formData.append("price", newItem.price);
    formData.append("quantity", newItem.quantity);  // Add quantity
    formData.append("unit", newItem.unit);          // Add unit
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = isEditing
        ? `${BACKEND_URL}/api/menu/${editingItem._id}`
        : `${BACKEND_URL}/api/menu/add`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Show success toast based on operation
        toast.success(isEditing ? "Item updated successfully!" : "Item added successfully!");
        
        setNewItem({
          name: "",
          description: "",
          category: "",
          price: "",
          quantity: "",
          unit: "",
        });
        setImage(null);
        setIsEditing(false);
        setEditingItem(null);
        fetchMenuItems();
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} menu item: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const MenuItemSkeleton = () => (
    <div className="min-w-[250px] bg-white rounded-lg shadow p-4 flex flex-col animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">{isEditing ? "Edit Item" : "Add New Item"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={newItem.name} onChange={handleChange} placeholder="Item Name" className="border p-2 rounded" required />
          <input name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
          <select name="category" value={newItem.category} onChange={handleChange} className="border p-2 rounded" required>
            <option value="" disabled>Select Category</option>
            <option value="Drinks">Drinks</option>
            <option value="Food">Food</option>
            <option value="Desserts">Desserts</option>
            <option value="NonVeg">NonVeg</option>
            <option value="Others">Others</option>
          </select>
          <input name="price" type="number" value={newItem.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" required />
          <input name="quantity" type="number" value={newItem.quantity} onChange={handleChange} placeholder="Quantity" className="border p-2 rounded" required />
          <select name="unit" value={newItem.unit} onChange={handleChange} className="border p-2 rounded" required>
            <option value="" disabled>Select Unit</option>
            <option value="kg">kg</option>
            <option value="liters">liters</option>
            <option value="units">units</option>
            <option value="plates">plates</option>
            <option value="others">others</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded" required={!isEditing} />
          {/* Buttons below file input, full width */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2 mt-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
              {isEditing ? "Update" : "Add"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setNewItem({ name: "", description: "", category: "", price: "", quantity: "", unit: "" });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Drinks", "Food", "Desserts", "NonVeg", "Others"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full border ${activeCategory === cat ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items Display */}
      <div className="flex flex-nowrap overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(6).fill().map((_, index) => <MenuItemSkeleton key={index} />)
          : getFilteredMenuItems().map((item) => (
              <div key={item._id} className="min-w-[250px] bg-white rounded-lg shadow p-4 flex flex-col">
                <img src={item.image || PLACEHOLDER_IMAGE} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-blue-500 font-bold mt-1">₹{item.price}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))
        }
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminMenu;
