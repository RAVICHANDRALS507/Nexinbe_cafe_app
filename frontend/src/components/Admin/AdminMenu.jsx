// import React, { useState } from "react";

// const AdminMenu = () => {
//   const [newItem, setNewItem] = useState({
//     name: "",
//     description: "",
//     category: "Drinks",
//     price: "",
//   });
//   const [image, setImage] = useState(null);
//   const [statusMessage, setStatusMessage] = useState(null);
//   const [statusType, setStatusType] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem({ ...newItem, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newItem.name || !newItem.description || !newItem.price) {
//       setStatusMessage("❌ Please fill all fields!");
//       setStatusType("error");
//       return;
//     }

//     if (!image) {
//       setStatusMessage("❌ Please select an image!");
//       setStatusType("error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", newItem.name);
//     formData.append("description", newItem.description);
//     formData.append("category", newItem.category);
//     formData.append("price", newItem.price);
//     formData.append("image", image);

//     try {
//       const response = await fetch("http://localhost:5000/api/menu/add", {
//       const response = await fetch("https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app/api/menu/add", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setStatusMessage("✅ Menu item added successfully!");
//         setStatusType("success");
//         setNewItem({
//           name: "",
//           description: "",
//           category: "Drinks",
//           price: "",
//         });
//         setImage(null);
//       } else {
//         setStatusMessage(`❌ Failed to add menu item: ${result.message}`);
//         setStatusType("error");
//       }
//     } catch (error) {
//       console.error("❌ Error:", error);
//       setStatusMessage("❌ An error occurred while submitting the form.");
//       setStatusType("error");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       {statusMessage && (
//         <div
//           className={`p-3 mb-4 text-white rounded-lg ${
//             statusType === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {statusMessage}
//         </div>
//       )}
//       <h3 className="text-2xl font-bold mb-4">Menu Management</h3>
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h4 className="text-lg font-semibold mb-3">Add New Item</h4>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             value={newItem.name}
//             onChange={handleChange}
//             placeholder="Item Name"
//             className="border p-2 rounded-lg w-full"
//             required
//           />
//           <input
//             type="text"
//             name="description"
//             value={newItem.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="border p-2 rounded-lg w-full"
//             required
//           />
//           <select
//             name="category"
//             value={newItem.category}
//             onChange={handleChange}
//             className="border p-2 rounded-lg w-full"
//           >
//             <option value="Drinks">Drinks</option>
//             <option value="Food">Food</option>
//             <option value="Desserts">Desserts</option>
//           </select>
//           <input
//             type="number"
//             name="price"
//             value={newItem.price}
//             onChange={handleChange}
//             placeholder="Price"
//             className="border p-2 rounded-lg w-full"
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="border p-2 rounded-lg w-full"
//             required
//           />
//           <button
//             type="submit"
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full col-span-2 cursor-pointer"
//           >
//             Add Item
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminMenu;



import React, { useState } from "react";

const AdminMenu = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "Drinks",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description || !newItem.price || !image) {
      setStatusMessage("❌ Please fill all fields and select an image!");
      setStatusType("error");
      return;
    }

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("category", newItem.category);
    formData.append("price", newItem.price);
    formData.append("image", image);

    try {
      //const response = await fetch("http://localhost:5000/api/menu/add", {
      const response = await fetch("https://nexinbe-cafe-app-git-main-ravichandra-l-ss-projects.vercel.app/api/menu/add", {

        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage("✅ Menu item added successfully!");
        setStatusType("success");
        setNewItem({ name: "", description: "", category: "Drinks", price: "" });
        setImage(null);
      } else {
        setStatusMessage(`❌ Failed to add menu item: ${result.message}`);
        setStatusType("error");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setStatusMessage("❌ An error occurred while submitting the form.");
      setStatusType("error");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {statusMessage && (
        <div className={`p-3 mb-4 text-white rounded-lg ${statusType === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {statusMessage}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">Menu Management</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-3">Add New Item</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" name="name" value={newItem.name} onChange={handleChange} placeholder="Item Name" className="border p-2 rounded-lg w-full" required />
          <input type="text" name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded-lg w-full" required />
          <select name="category" value={newItem.category} onChange={handleChange} className="border p-2 rounded-lg w-full">
            <option value="Drinks">Drinks</option>
            <option value="Food">Food</option>
            <option value="Desserts">Desserts</option>
          </select>
          <input type="number" name="price" value={newItem.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded-lg w-full" required />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-lg w-full" required />
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full col-span-2 cursor-pointer">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMenu;
