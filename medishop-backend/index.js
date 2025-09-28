import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/medishop")
  .then(() => {
    console.log("MongoDB connected");
    const server = app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on ${process.env.PORT || 5000}`)
    );

    const gracefulShutdown = () => {
      console.log('Received signal, shutting down gracefully...');
      server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close().then(() => {
          console.log('MongoDB connection closed.');
          process.exit(0);
        });
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGHUP', gracefulShutdown);
  })
  .catch((err) => console.error("MongoDB connect error", err));
