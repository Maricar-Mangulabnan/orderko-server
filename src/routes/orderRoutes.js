// src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create order
router.post("/", orderController.createOrder);

// Get all orders (admin summary)
router.get("/", orderController.getOrders);

module.exports = router;
