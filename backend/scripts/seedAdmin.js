require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const addAdmin = async () => {
  try {
    // ✅ Connect using the latest recommended method
    await mongoose.connect(process.env.MONGO_URI);

    // ✅ Check if admin already exists
    const existingAdmin = await Admin.findOne({ name: "123" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists in the database.");
      mongoose.connection.close();
      return;
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash("123", 10);

    // ✅ Insert Admin
    await Admin.create({
      name: "123",
      password: hashedPassword,
    });

    console.log("✅ Admin added successfully");
  } catch (error) {
    console.error("❌ Error adding admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
addAdmin();
