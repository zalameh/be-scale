const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProducts);

async function createProduct(req, res) {
  const { no } = req?.body;

  try {
    const existingDoc = await Product.isExisted(no);
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
  const newProduct = new Product({ no });

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

async function updateProduct(req, res) {
  const { _id, sapId } = req.body;

  // Check if the product already has sapId
  const product = await Product.findById(_id);
  if (product.sapId === sapId) {
    return res.status(304).json({
      message: "Product already has the provided sapId",
      data: product,
    });
  }

  let result;
  try {
    result = await Product.findByIdAndUpdate(_id, { sapId }, { new: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }

  return res.status(200).json({
    message: "Document updated",
    data: result,
  });
}

async function getProducts(req, res) {
  const { sapId, status } = req.query;

  const isCompleted = status === "true";

  let result;
  try {
    if (sapId && status) {
      result = await Product.find({ sapId, isCompleted });
    } else if (sapId) {
      result = await Product.find({ sapId });
    } else if (status) {
      result = await Product.find({ isCompleted });
    } else {
      result = await Product.find();
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }

  return res.status(200).json({
    message: "Success",
    data: result,
  });
}

async function getProduct(req, res) {
  const { id } = req?.params;
  // const { sapId } = req?.query;

  if (id.length !== 24 || !id) {
    return res.status(404).json({
      message: "Invalid query or params",
    });
  }

  let result;
  try {
    result = await Product.findOne({ _id: id });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }

  if (!result) {
    return res.status(400).json({
      message: "Not found",
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
