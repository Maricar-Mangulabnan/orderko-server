// src/controllers/userController.js
const prisma = require("../config/prisma");

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  // Log the incoming request details.
  console.log("Received updateUser request with id:", id);
  console.log("Request body:", req.body);

  // Validate that all fields are provided.
  if (!username || !password || !role) {
    console.log("Missing required fields. Username, password, and role must be provided.");
    return res.status(400).json({ error: "Username, password, and role must be provided." });
  }

  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({ where: { id } });
    console.log("Existing user found:", existingUser);
    if (!existingUser) {
      console.log("User not found with id:", id);
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user record with all fields.
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, password, role },
    });
    console.log("User updated successfully:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      // Pass the id as a string directly
      where: { id: id },
    });
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
