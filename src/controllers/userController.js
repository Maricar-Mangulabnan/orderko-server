// src/controllers/userController.js
const prisma = require("../config/prisma");

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      // Pass the id as a string directly; do not convert to Number
      where: { id: id },
      data: { username, password, role },
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
