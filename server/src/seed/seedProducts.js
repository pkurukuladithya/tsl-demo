import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Studio Essential Tee",
    category: "tshirt",
    basePrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Ink", "Teal"],
    materials: ["Cotton", "Blend"],
    isFeatured: true
  },
  {
    name: "Oversize Street Tee",
    category: "tshirt",
    basePrice: 3800,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Ink", "Coral"],
    materials: ["Cotton", "Polyester"],
    isFeatured: true
  },
  {
    name: "Panel Contrast Tee",
    category: "tshirt",
    basePrice: 3600,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Teal", "Ink"],
    materials: ["Cotton", "Blend"]
  },
  {
    name: "Everyday Crew Tee",
    category: "tshirt",
    basePrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1633966887768-64f9a867bdba?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Sand", "Navy"],
    materials: ["Cotton"],
    isFeatured: true
  },
  {
    name: "Tailored Utility Trouser",
    category: "trouser",
    basePrice: 5200,
    images: [
      "https://images.unsplash.com/photo-1493357335960-4583bfa6f8d9?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ink", "Sand", "Navy"],
    materials: ["Cotton", "Blend"],
    isFeatured: true
  },
  {
    name: "Relaxed City Pant",
    category: "trouser",
    basePrice: 4800,
    images: [
      "https://images.unsplash.com/photo-1519211777646-3a7ccf759b64?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ink", "Olive", "Sand"],
    materials: ["Cotton", "Polyester"]
  },
  {
    name: "Tapered Performance Trouser",
    category: "trouser",
    basePrice: 5600,
    images: [
      "https://images.unsplash.com/photo-1649566650740-cb0a625e1b40?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1715532098035-a343b26eaeaa?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ink", "Navy", "Teal"],
    materials: ["Polyester", "Blend"],
    isFeatured: true
  },
  {
    name: "Structured Logo Cap",
    category: "cap",
    basePrice: 2200,
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Ink", "Coral"],
    materials: ["Cotton"],
    isFeatured: true
  },
  {
    name: "Washed Heritage Cap",
    category: "cap",
    basePrice: 2100,
    images: [
      "https://images.unsplash.com/photo-1606483956061-46a898dce538?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1466992133056-ae8de8e22809?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Sand", "Ink"],
    materials: ["Cotton"]
  },
  {
    name: "Silk Satin Tie",
    category: "tie",
    basePrice: 2600,
    images: [
      "https://images.unsplash.com/photo-1666852327656-5e9fd213209b?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1558545541-c8e2470bbf71?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Navy", "Coral"],
    materials: ["Blend", "Polyester"]
  },
  {
    name: "Textured Knit Tie",
    category: "tie",
    basePrice: 2400,
    images: [
      "https://images.unsplash.com/photo-1762232977391-ff39c5b0ad42?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1597136076085-34828af0ff64?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Ink", "Sand"],
    materials: ["Cotton", "Blend"],
    isFeatured: true
  },
  {
    name: "Custom Sports Jersey",
    category: "sports",
    basePrice: 4800,
    images: [
      "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1649520937981-763d6a14de7d?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Teal", "Coral", "Ink"],
    materials: ["Polyester", "Blend"],
    isFeatured: true
  },
  {
    name: "Training Mesh Top",
    category: "sports",
    basePrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1662096909714-e2f206d0a636?auto=format&fit=crop&w=900&h=1100&q=80",
      "https://images.unsplash.com/photo-1696300064576-c072b92f4c55?auto=format&fit=crop&w=900&h=1100&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Teal", "Ink"],
    materials: ["Polyester"]
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
