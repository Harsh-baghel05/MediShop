import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Product from "../model/Product.js";
import User from "../model/user.js";

dotenv.config();

// Generate 40 sample products
const products = Array.from({ length: 40 }).map((_, i) => {
  const categories = ["Tablets", "Syrups", "Devices", "Personal Care"];
  const category = categories[i % 4];
  const keywords = {
    "Tablets": "pill,tablet,medicine",
    "Syrups": "syrup,bottle,liquid-medicine",
    "Devices": "medical-device,inhaler,syringe",
    "Personal Care": "bandage,health-care,vitamin"
  };
  const keyword = keywords[category].split(',')[i % keywords[category].split(',').length];
  return {
    name:
      ["Paracetamol", "Cough Syrup", "Inhaler", "Antacid", "Vitamin C", "Bandage", "Insulin", "Pain Relief"][i % 8] +
      " " +
      (i + 1),
    description: "Reliable pharmacy item. Use as directed.",
    price: Math.floor(Math.random() * 500) + 20,
    stock: Math.floor(Math.random() * 100),
    image: `https://source.unsplash.com/400x300/?${keyword}`,
    category: category,
    featured: i % 6 === 0,
  };
});

// MongoDB URI
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/medishop";

const seedProducts = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products cleared");

    // Insert new products
    await Product.insertMany(products);
    console.log("Seeded products successfully");

    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users cleared");

    // Seed admin user
    const adminEmail = "admin@medishop.com";
    const adminHashedPassword = await bcrypt.hash("adminpass", 10);
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: adminHashedPassword,
      role: "admin"
    });
    console.log("Admin user seeded successfully");

    // Seed regular user
    const userEmail = "user@medishop.com";
    const userHashedPassword = await bcrypt.hash("userpass", 10);
    await User.create({
      name: "Regular User",
      email: userEmail,
      password: userHashedPassword,
      role: "user"
    });
    console.log("Regular user seeded successfully");

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedProducts();
