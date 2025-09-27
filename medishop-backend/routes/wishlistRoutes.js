import express from "express";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  await req.user.populate("wishlist.productId");
  res.json({ items: req.user.wishlist });
});

router.post("/toggle", auth, async (req, res) => {
  const { productId } = req.body;
  const exists = req.user.wishlist.find((w) => w.productId.equals(productId));
  if (exists)
    req.user.wishlist = req.user.wishlist.filter((w) => !w.productId.equals(productId));
  else req.user.wishlist.push({ productId });
  await req.user.save();
  await req.user.populate("wishlist.productId");
  res.json({ items: req.user.wishlist });
});

export default router;
