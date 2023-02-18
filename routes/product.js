const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/", deleteProducts);

async function createProduct(req, res) {
  // CHECK WHETHER PRODUCT EXISTS
  try {
    const existingDoc = await Product.isExisted(
      req?.body?.no,
      req?.body?.sapId
    );
    if (existingDoc) {
      return res.status(200).json({
        message: "Document existed",
        data: existingDoc,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred",
      error: e,
    });
  }

  // CREATE NEW DOCUMENT
  const newProduct = new Product({ ...req?.body });

  let result;
  try {
    result = await newProduct.save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }

  return res.status(201).json({
    message: "Document created",
    data: result,
  });
}

async function getProducts(req, res) {
  let result;

  try {
    result = await Product.find();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }

  res.status(200).json({
    message: "Success",
    data: result,
  });
}

async function deleteProducts(req, res) {
  let result;

  try {
    result = await Product.deleteMany();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }

  res.status(200).json({
    message: "Delete All",
  });
}

module.exports = router;
