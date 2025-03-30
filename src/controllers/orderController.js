// src/controllers/orderController.js
const prisma = require("../config/prisma");

// Create an order and update product stock in a transaction
exports.createOrder = async (req, res) => {
  // Expecting { userId, productId, count } in the request body
  const { userId, productId, count } = req.body;

  if (!userId || !productId || !count) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Retrieve the product to get its price and current stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if enough stock is available
    if (product.stock < count) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    // Calculate total amount (price * count)
    const totalAmount = product.price * count;

    // Create order and update product stock in one transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.orderRecord.create({
        data: {
          userId: userId,
          productId: productId,
          count: count,
          totalAmount: totalAmount,
        },
      });

      // Update product stock
      await tx.product.update({
        where: { id: productId },
        data: { stock: product.stock - count },
      });

      return newOrder;
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
