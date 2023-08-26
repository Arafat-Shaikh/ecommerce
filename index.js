const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Product } = require("./model/Product");
const cors = require("cors");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/myEcommerce");
  console.log("database connected");
}

app.use(cors());
app.use(express.json());

app.post("/products", async (req, res) => {
  console.log(req.body);
  try {
    const product = new Product(req.body);
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

app.listen(8080, () => {
  console.log("server is running.");
});
