const express = require("express");
const {
  createNewProduct,
  fetchFilteredProducts,
  fetchProductById,
  fetchAllProducts,
} = require("../controller/Product");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Product } = require("../model/Product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder to /uploads
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // Set the filename to the original name of the file
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create a multer middleware with the storage and file filter options
const upload = multer({ storage: storage });

router
  .get("/", fetchFilteredProducts)
  .get("/detail/:id", fetchProductById)
  .get("/filter", fetchAllProducts)

  .post("/", upload.array("images"), async (req, res) => {
    try {
      // const images = req.files.map((file) => file.path);
      console.log("files below");
      console.log(req.files);
      console.log("files above");

      console.log("image here");
      console.log(req.body.images);
      console.log(body);
      res.status(201).json("hii");
    } catch (err) {
      console.log(err);
    }
  });

exports.router = router;
