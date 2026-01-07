import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    guestName: { type: String, trim: true },
    guestMobile: { type: String, trim: true },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ["initiated", "confirmed", "delivered"],
      default: "initiated"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
