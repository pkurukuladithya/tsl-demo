import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    notes: { type: String, default: "" }
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
