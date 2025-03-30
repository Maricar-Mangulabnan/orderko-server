// src/controllers/productController.js
const prisma = require("../config/prisma");

// Create a product
exports.createProduct = async (req, res) => {
  const { name, imgUrl, price, stock } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, imgUrl, price, stock },
    });
    res.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, imgUrl, price, stock } = req.body;
  try {
    // Do not convert id to Number since it's a string (cuid)
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: { name, imgUrl, price, stock },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product along with its order records
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // First delete all OrderRecord entries that reference this product
    await prisma.orderRecord.deleteMany({
      where: { productId: id },
    });
    // Now delete the product itself
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });
    res.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Error retrieving products" });
  }
};
