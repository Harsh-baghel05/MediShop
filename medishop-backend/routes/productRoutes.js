import express from "express";
import Product from "../model/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/featured", async (req, res) => {
  const products = await Product.find({ featured: true }).limit(6);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  res.json(p);
});

export default router;
