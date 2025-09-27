import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../model/Product.js";

dotenv.config();

// Generate 40 sample products
const products = Array.from({ length: 40 }).map((_, i) => ({
  name:
    ["Paracetamol", "Cough Syrup", "Inhaler", "Antacid", "Vitamin C", "Bandage", "Insulin", "Pain Relief"][i % 8] +
    " " +
    (i + 1),
  description: "Reliable pharmacy item. Use as directed.",
  price: Math.floor(Math.random() * 500) + 20,
  stock: Math.floor(Math.random() * 100),
  image: `https://picsum.photos/seed/med${i}/400/300`,
  category: ["Tablets", "Syrups", "Devices", "Personal Care"][i % 4],
  featured: i % 6 === 0,
}));

// MongoDB URI
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/medishop";

const seedProducts = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products cleared");

    // Insert new products
    await Product.insertMany(products);
    console.log("Seeded products successfully");

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedProducts();
