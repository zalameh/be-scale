const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/", createProduct);

async function createProduct(req, res) {
  // // VALIDATE SAP NUMBER
  // const isReqBodyValid = sapInputValidation(req?.body?.no);
  // if (!isReqBodyValid) {
  //   return res.status(400).json({
  //     message: 'Invalid input for "no" field',
  //   });
  // }

  // CHECK WHETHER PRODUCT EXISTS
  try {
    const existingDoc = await Product.isExisted(
      req?.body?.no,
      req?.body?.sapId
    );
    if (existingDoc) {
      return res.status(200).json({
        message: "Document existed",
        product: existingDoc,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred",
      error: e,
    });
  }

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
    product: result,
  });
}

module.exports = router;
