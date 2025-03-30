// src/controllers/orderController.js
const prisma = require("../config/prisma");

// Create an order
exports.createOrder = async (req, res) => {
  // Expecting { userId, productId, count } in the request body
  const { userId, productId, count } = req.body;

  try {
    // Retrieve the product to get its price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate total amount (price * count)
    const totalAmount = product.price * count;

    // Create a new order record
    const order = await prisma.orderRecord.create({
      data: {
        userId: userId,
        productId: productId,
        count,
        totalAmount,
      },
    });

    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Get all orders (for admin summary)
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.orderRecord.findMany({
      include: {
        user: true,
        product: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
};
