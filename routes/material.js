const express = require("express");
const router = express.Router();

const SAP = require("../models/sap"); // SAP model
const Product = require("../models/product"); // Product model
const Material = require("../models/material"); // Material model

router.post("/", createMaterial);
router.get("/", getMaterials);
router.get("/details/:no", getMaterialDetails);
router.delete("/", deleteMaterials);

async function createMaterial(req, res) {
  const { no, productId } = req?.body;

  // CHECK WHETHER MATERIAL EXISTS
  // try {
  //   const existingDoc = await Material.isExisted(no, productId);
  //   if (existingDoc) {
  //     return res.status(200).json({
  //       message: "Document existed",
  //       data: existingDoc,
  //     });
  //   }
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({
  //     message: "An error occurred",
  //     error: e,
  //   });
  // }

  // CREATE NEW DOCUMENT
  const newMaterial = new Material({ no, productId });

  let result;
  try {
    result = await newMaterial.save();
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

async function getMaterials(req, res) {
  const { productId } = req?.query;

  let result;
  try {
    if (productId) {
      if (productId.length !== 24) {
        return res.status(404).json({
          message: "Invalid query",
        });
      }
      result = await Material.find({ productId });
    } else {
      result = await Material.find();
    }
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

async function getMaterialDetails(req, res) {
  const { no } = req?.params;
  const { productId, sapId } = req?.query;

  try {
    // Find a Material document that matches the provided no and productId
    const material = await Material.findOne({ no, productId });

    // Find a Product document that matches the provided productId
    const product = await Product.findOne({ _id: productId });

    // Find a SAP document that matches the provided sapId
    const sap = await SAP.findOne({ _id: sapId });

    // Return the Material, Product, and SAP documents as a JSON response
    res.json({ material, product, sap });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteMaterials(req, res) {
  let result;

  try {
    result = await Material.deleteMany();
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
