import express from "express";
import auth from "../middleware/authMiddleware.js";
import Return from "../model/Return.js";

const router = express.Router();

// Request a return (user)
router.post("/", auth, async (req, res) => {
  try {
    const { productId, reason } = req.body;
    const returnRequest = new Return({
      userId: req.user._id,
      productId,
      reason
    });
    await returnRequest.save();
    res.status(201).json(returnRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's return requests (user)
router.get("/", auth, async (req, res) => {
  try {
    const returns = await Return.find({ userId: req.user._id }).populate('productId');
    res.json(returns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
