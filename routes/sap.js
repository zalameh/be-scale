const express = require("express");
const router = express.Router();

const SAP = require("../models/sap");

router.post("/", createSAP);
router.delete("/", deleteAllSAP);

async function createSAP(req, res) {
  const sap = new SAP({ ...req?.body });

  try {
    const result = await sap.save();
    res.status(201).json({
      message: "Handling POST requests to /products",
      createdProduct: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }
}

async function deleteAllSAP(req, res) {
  try {
    const result = await SAP.deleteMany();
    res.status(200).json({
      message: "Delete All",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }
}

module.exports = router;
