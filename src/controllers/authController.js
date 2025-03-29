const prisma = require("../config/prisma");

exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Check if user exists and password matches (plain text for this exercise)
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Remove the password field before returning the user data
    const { password: _, ...userData } = user;

    // Return the user data, including the role
    res.json({ message: "Sign in successful", user: userData });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Error signing in" });
  }
};
