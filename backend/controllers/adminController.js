// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/Admin");

// const adminRegister = async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     let admin = await Admin.findOne({ name });
//     if (admin) return res.status(400).json({ message: "Admin already exists" });

//     admin = new Admin({ name, password });
//     await admin.save();

//     res.status(201).json({ message: "Admin registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// const adminLogin = async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ name });
//     if (!admin) return res.status(401).json({ message: "Admin not found" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: admin._id, name: admin.name },
//       process.env.JWT_SECRET || "default_secret",
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// module.exports = { adminRegister, adminLogin };

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
  const { name, password } = req.body; // ✅ Change 'email' to 'name'

  try {
    const admin = await Admin.findOne({ name });
    if (!admin) return res.status(400).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
