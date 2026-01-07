import Cart from "../models/Cart.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    return res.json({ items: cart ? cart.items : [] });
  } catch (error) {
    return next(error);
  }
};

export const syncCart = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Items array is required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { items } },
      { new: true, upsert: true }
    );

    return res.json({ items: cart.items });
  } catch (error) {
    return next(error);
  }
};
