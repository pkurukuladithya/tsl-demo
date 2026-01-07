import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["tshirt", "trouser", "cap", "tie", "sports"]
    },
    basePrice: { type: Number, required: true, min: 0 },
    images: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, "At least one image is required"]
    },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    materials: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
