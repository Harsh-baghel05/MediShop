import express from "express";
import User from "../model/user.js";
import Return from "../model/Return.js";
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

// Update user (admin only)
router.put("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete user (admin only)
router.delete("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all return requests (admin only)
router.get("/returns", adminMiddleware, async (req, res) => {
  try {
    const returns = await Return.find().populate('userId').populate('productId');
    res.json(returns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve a return request (admin only)
router.put("/returns/:id/approve", adminMiddleware, async (req, res) => {
  try {
    const returnRequest = await Return.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!returnRequest) return res.status(404).json({ message: "Return request not found" });
    res.json(returnRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reject a return request (admin only)
router.put("/returns/:id/reject", adminMiddleware, async (req, res) => {
  try {
    const returnRequest = await Return.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!returnRequest) return res.status(404).json({ message: "Return request not found" });
    res.json(returnRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
