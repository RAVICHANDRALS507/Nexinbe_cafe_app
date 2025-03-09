const express = require("express");
const { adminRegister, adminLogin } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", adminRegister); // Endpoint to register an admin
router.post("/login", adminLogin); // Endpoint for admin login

module.exports = router;
