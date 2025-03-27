// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // ✅ Ensure 'name' is required
//   password: { type: String, required: true }
// });

// const Admin = mongoose.model("Admin", adminSchema);
// module.exports = Admin;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const getFormattedDateTime = () => {
  const now = new Date();
  const date = [
    now.getDate().toString().padStart(2, '0'),
    (now.getMonth() + 1).toString().padStart(2, '0'),
    now.getFullYear(),
  ].join('/');

  const time = [
    now.getHours().toString().padStart(2, '0'),
    now.getMinutes().toString().padStart(2, '0'),
    now.getSeconds().toString().padStart(2, '0'),
  ].join(':');

  return { date, time };
};

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAtDate: { 
    type: String, 
    default: () => getFormattedDateTime().date, 
  },
  createdAtTime: { 
    type: String, 
    default: () => getFormattedDateTime().time, 
  },
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
