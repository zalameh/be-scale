const express = require("express");
const router = express.Router();

const SAP = require("../models/sap");

router.post("/", createSAP);
router.delete("/", deleteAllSAP);

async function createSAP(req, res) {
  const sap = new SAP({ ...req?.body });
  let result;

  try {
    result = await sap.save();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }

  res.status(201).json({
    message: "Handling POST requests to /sap",
    sap: result,
  });
}

async function deleteAllSAP(req, res) {
  let result;

  try {
    result = await SAP.deleteMany();
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
