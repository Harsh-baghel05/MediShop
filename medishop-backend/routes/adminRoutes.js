import express from "express";
import User from "../model/user.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
