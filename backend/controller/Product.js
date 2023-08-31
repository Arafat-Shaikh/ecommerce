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
    const pageSize = parseInt(req.query.limit) || 2;
    let query = Product.find({});
    let productCount = await Product.countDocuments();
    console.log(productCount);

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

    const docs = await query.exec();
    res.setHeader("X-DOCUMENT-COUNT", productCount);
    res.status(201).json(docs);
  } catch (err) {
    res.status(401).json(err);
    console.log(err);
  }
};
