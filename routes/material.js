const express = require("express");
const router = express.Router();

const Material = require("../models/material");

router.get("/", (req, res) => {
  res.send("Material");
});
router.post("/", createMaterial);

async function createMaterial(req, res) {
  // CHECK WHETHER MATERIAL EXISTS
  try {
    const existingDoc = await Material.isExisted(
      req?.body?.no,
      req?.body?.productId
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
  const newMaterial = new Material({ ...req?.body });

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

module.exports = router;
