const { Cart } = require("../model/Cart");

exports.addToCart = async (req, res) => {
  try {
    const item = new Cart({ ...req.body, user: req.user.id });
    const doc = await item.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.find({ user: id }).populate("product");
    res.status(201).json(cart);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");

    res.status(201).json(item);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(201).json("Item deleted.");
  } catch (err) {
    res.status(401).json(err);
  }
};
