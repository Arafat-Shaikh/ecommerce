const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products");
const cartRouter = require("./routes/Cart");
const cors = require("cors");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/myEcommerce");
  console.log("database connected");
}

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter.router);
app.use("/cart", cartRouter.router);

app.listen(8080, () => {
  console.log("server is running.");
});
