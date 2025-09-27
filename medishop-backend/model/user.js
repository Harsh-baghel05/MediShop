import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, default: 1 },
    },
  ],
  wishlist: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

export default mongoose.model("User", userSchema);
