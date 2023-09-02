const { Product } = require("../model/Product");

exports.createNewProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  console.log("hello");
  try {
    const product = await Product.find({});
    res.status(201).json(product);
  } catch (err) {
    res.status(401).json(err);
    console.log(err);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.fetchFilteredProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.perPage) || 6;
    let query = Product.find({});
    let productCount = "";

    const sort = req.query.sort;
    const sortValue = req.query.order == "asc" ? 1 : -1;

    if (sort && sortValue) {
      query = query.sort({ [sort]: sortValue });
    }

    if (req.query.category) {
      query = query.find({ category: req.query.category });
    }

    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
    }

    query = query.skip((page - 1) * pageSize).limit(pageSize);

    if (req.query.category || req.query.brand) {
      productCount = await Product.countDocuments(query);
    } else {
      productCount = await Product.countDocuments();
    }

    const docs = await query.exec();
    res.set("X-DOCUMENT-COUNT", productCount);
    res.status(201).json(docs);
  } catch (err) {
    res.status(401).json(err);
    console.log(err);
  }
};
