import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      status: "initiated"
    });

    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1
    });
    return res.json(orders);
  } catch (error) {
    return next(error);
  }
};
