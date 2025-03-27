const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  createdAtDate: { type: String }, // ✅ Stores date in dd/mm/yy format
  createdAtTime: { type: String }, // ✅ Stores time in hh:mm:ss format
});

const User = mongoose.model("User", userSchema);
module.exports = User;
