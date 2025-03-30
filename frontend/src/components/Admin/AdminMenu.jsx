import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { toast, ToastContainer } from 'react-toastify'; // Add ToastContainer here
import 'react-toastify/dist/ReactToastify.css';

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVHic7ZsxTsMwFIb/Z2NBYkGq1IXF9AacA3EGzkA5A0dgYOIYHIFDcA5gY2FhQQiJpVJ3kNrBVGKIkzhO47xn9/ukN9WJ/ed7sp3IgOd/UZoTRLQC8ADgyx1XB3zO5YjIA+AZwMo0TRfOuZ/guQEwf+eoEfacc+vw4LEwJz/GrwEAd+PGqRcAiwC4HT9OvQDAMoQ4TqB6AUQL+JAgrEU1vbgEZg0vgVnDS2DW8BKYNbwEZg0vgVnDS2DW8BKYNbwEZo0+JagA7AFsAZQAyu7YAng0c3PODfbhr0gPfQLwbOZSSGEJ1ABWZq6EFBT+ZZhLIgGFzwG5NBJQ+ByQSyQBhc8BuVQSUPgckEsmAYXPAbmJJEhxn7AE8GbmUkhB4deWuSQSUPgckEsjAYXPAbkkElD4HJBLIQGFzwG5BBKkuN0tAbwDeDFzKaSQQm51ANYALgF8dMclgA0uvePjOM4JRHQBoALwCeDaOfcdPDf/zvU4y865r/DhF6ys7wclKe1qAAAAAElFTkSuQmCC";

//const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app";


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

  return (
    <div className="p-6 bg-gray-100">
      {statusMessage && (
        <div
          className={`p-3 mb-4 text-white rounded-lg ${statusType === "success" ? "bg-green-500" : statusType === "info" ? "bg-blue-500" : "bg-red-500"}`}
        >
          {statusMessage}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
        <span>Menu Management</span>
        {/* {itemAddedMessage && (
          <span className="text-green-500 font-bold">{itemAddedMessage}</span>
        )} */}
      </h3>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-semibold">
            {isEditing ? "Edit Menu Item" : "Add New Item"}
          </h4>
          {itemAddedMessage && (
            <span className="text-green-500 font-bold">{itemAddedMessage}</span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Item Name *"
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="description"
            value={newItem.description}
            onChange={handleChange}
            placeholder="Description *"
            className="border p-2 rounded-lg w-full"
            required
          />
          <select
            name="category"
            value={newItem.category}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          >
            <option value="" disabled >Select Category *</option>
            <option value="Drinks">Drinks</option>
            <option value="Food">Food</option>
            <option value="Desserts">Desserts</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            placeholder="Price *"
            className="border p-2 rounded-lg w-full"
            required
            min="1"
          />
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            placeholder="Quantity *"
            className="border p-2 rounded-lg w-full"
            required
            min="1"
          />
          <select
            name="unit"
            value={newItem.unit}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          >
            <option value="" disabled>Units of Measurement *</option>
            <option value="kg">kg</option>
            <option value="liters">liters</option>
            <option value="units">units</option>
            <option value="pcs">pcs</option>
            <option value="others">others</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded-lg w-full"
            required={!isEditing}
          />
          <div className="col-span-2 flex gap-4">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-blue-600"
            >
              {isEditing ? "Update Item" : "Add Item"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setNewItem({
                    name: "",
                    description: "",
                    category: "", // Changed from "Drinks" to empty string
                    price: "",
                    quantity: "",
                    unit: "", // Changed from "units" to empty string
                  });
                }}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-gray-600"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {showMenu && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Menu Items</h4>
          {/* Category Filter */}
          <div className="mb-4">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`mr-4 ${activeCategory === "All" ? "font-bold" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange("Drinks")}
              className={`mr-4 ${activeCategory === "Drinks" ? "font-bold" : ""}`}
            >
              Drinks
            </button>
            <button
              onClick={() => handleCategoryChange("Food")}
              className={`mr-4 ${activeCategory === "Food" ? "font-bold" : ""}`}
            >
              Food
            </button>
            <button
              onClick={() => handleCategoryChange("Desserts")}
              className={`mr-4 ${activeCategory === "Desserts" ? "font-bold" : ""}`}
            >
              Desserts
            </button>
            <button
              onClick={() => handleCategoryChange("Others")}
              className={`mr-4 ${activeCategory === "Others" ? "font-bold" : ""}`}
            >
              Others
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {getFilteredMenuItems().map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md w-48">
                <img
                  src={item.image || PLACEHOLDER_IMAGE}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <div className="mt-2">
                  <h5 className="font-semibold">{item.name}</h5>
                  <p className="text-sm">{item.description}</p>
                  <p className="font-bold">Rs {item.price}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} {item.unit}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
  );
};

export default AdminMenu;
