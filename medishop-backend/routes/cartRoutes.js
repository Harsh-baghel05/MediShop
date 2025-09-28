
import express from "express";
import auth from "../middleware/authMiddleware.js";
import User from "../model/user.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  await req.user.populate("cart.productId");
  res.json({ items: req.user.cart });
});

router.post("/add", auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  const result = await User.findOneAndUpdate(
    { _id: userId, "cart.productId": productId },
    { $inc: { "cart.$.qty": 1 } },
    { new: true }
  );
  if (!result) {
    const newResult = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { cart: { productId, qty: 1 } } },
      { new: true }
    );
    await newResult.populate("cart.productId");
    return res.json({ items: newResult.cart });
  }
  await result.populate("cart.productId");
  res.json({ items: result.cart });
});

router.post("/remove", auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { cart: { productId } } },
    { new: true }
  );
  await result.populate("cart.productId");
  res.json({ items: result.cart });
});

export default router;
