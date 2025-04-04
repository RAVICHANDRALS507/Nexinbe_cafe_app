const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// ✅ Register User Route
router.post("/register", registerUser);

// ✅ Login User Route
router.post("/login", loginUser);

module.exports = router;
