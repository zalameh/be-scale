const express = require("express");
const router = express.Router();

const Product = require("../models/product"); // Product model
const Material = require("../models/material"); // Material model

router.put("/start", startTime);
router.put("/end", endTime);

async function startTime(req, res) {
  const { productId, materialNo } = req.query;
  const timestamp = +new Date();

  // Find the corresponding material document
  const correspondingMaterials = await Material.find({
    productId,
  });

  const isStartedExist = correspondingMaterials.some(m => m.startTime);

  if (!isStartedExist) {
    // Find the corresponding product document
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the startTime field for the product document
    product.startTime = timestamp;
    await product.save();
  }

  // Find the corresponding material document
  const material = await Material.findOne({ productId, no: materialNo });
  if (!material) {
    return res.status(404).json({ message: "Material not found" });
  }

  // Update the startTime field for the material document
  material.startTime = timestamp;
  await material.save();

  // Check if all materials for the product have been started
  return res.json({ message: "Success" });
}

async function endTime(req, res) {
  const { productId, materialNo } = req.query;
  const timestamp = +new Date();

  // Find the corresponding material document
  const material = await Material.findOne({ productId, no: materialNo });
  if (!material) {
    return res.status(404).json({ message: "Material not found" });
  }

  // Update the endTime field and set isCompleted to true for the material document
  material.endTime = timestamp;
  material.isCompleted = true;
  await material.save();

  // Find all materials for the given productId that haven't been completed
  const materials = await Material.find({ productId });
  const isAnyNotCompleted = materials.some(m => !m.isCompleted);

  // Check if all materials for the product have been completed
  if (!isAnyNotCompleted) {
    // Find the corresponding product document
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the endTime field and set isCompleted to true for the product document
    product.endTime = timestamp;
    product.isCompleted = true;
    await product.save();
  }

  return res.json({ message: "Success" });
}

module.exports = router;
