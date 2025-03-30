// src/controllers/userController.js
const prisma = require("../config/prisma");

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  // Build the update object conditionally.
  const updateData = {};
  if (username !== undefined) {
    updateData.username = username;
  }
  if (password !== undefined) {
    updateData.password = password;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "At least one field (username or password) must be provided for update." });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData,
    });
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
