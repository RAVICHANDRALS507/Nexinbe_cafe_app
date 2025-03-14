const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Ensure 'name' is required
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
