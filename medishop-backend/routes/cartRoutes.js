
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
  const existing = req.user.cart.find((i) => i.productId.equals(productId));
  if (existing) existing.qty++;
  else req.user.cart.push({ productId, qty: 1 });
  await req.user.save();
  await req.user.populate("cart.productId");
  res.json({ items: req.user.cart });
});

router.post("/remove", auth, async (req, res) => {
  const { productId } = req.body;
  req.user.cart = req.user.cart.filter((i) => !i.productId.equals(productId));
  await req.user.save();
  await req.user.populate("cart.productId");
  res.json({ items: req.user.cart });
});

export default router;
