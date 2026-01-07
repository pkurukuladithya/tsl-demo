import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const item = await Item.create({ name: req.body.name });
  res.json(item);
});

// Read
router.get("/", async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

export default router;
