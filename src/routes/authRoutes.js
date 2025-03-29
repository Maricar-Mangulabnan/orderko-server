// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Sign In endpoint
router.post("/signin", authController.signIn);

module.exports = router;
