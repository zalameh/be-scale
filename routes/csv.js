const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Material = require("../models/material");

router.post("/", createFromCsv);

async function createFromCsv(req, res) {
  const { data } = req.body;

  const products = [];
  const materials = [];

  let savedProduct;

  try {
    for (let i = 0; i < data.length; i++) {
      const { productNo, materialNo } = data[i];
      let product;

      if (savedProduct && productNo === savedProduct.no) {
        product = savedProduct;
      } else {
        const newProduct = new Product({ no: productNo });
        product = await newProduct.save();

        savedProduct = product;
      }

      const newMaterial = new Material({
        no: materialNo,
        productId: product._id,
      });
      const material = await newMaterial.save();

      products.push(product);
      materials.push(material);
    }

    return res.status(201).json({ products, materials });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = router;
