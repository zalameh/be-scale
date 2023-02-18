const express = require("express");
const router = express.Router();

const SAP = require("../models/sap");

router.post("/", createSAP);
router.delete("/", deleteAllSAP);

async function createSAP(req, res) {
  const SAPDoc = new SAP({ ...req?.body });
  let result;

  try {
    const check = await SAPDoc.isAlready(req?.body?.no);
    console.log(check);
  } catch (e) {
    return res.status(400).json({
      message: "tai",
      error: e,
    });
  }

  try {
    result = await sap.save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }

  return res.status(201).json({
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
