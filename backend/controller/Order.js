const { Order } = require("../model/Order");

exports.createOrder = async (req, res) => {
  try {
    const dateString = new Date();

    const year = dateString.getFullYear();
    const month = dateString.getMonth();
    const day = dateString.getDate();

    const order = new Order({
      ...req.body,
      createdAt: { year: year, month: month, day: day, date: dateString },
    });
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.fetchOrdersByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id });
    res.status(201).json(orders);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.fetchOrdersByFilter = async (req, res) => {
  try {
    let filteredOrder = Order.find({});
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;

    const totalOrders = await Order.countDocuments();

    filteredOrder = filteredOrder.skip((page - 1) * pageSize).limit(pageSize);

    const orders = await filteredOrder.exec();
    res.set("X-TOTAL-DOCUMENT", totalOrders);
    res.status(201).json(orders);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
