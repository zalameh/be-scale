const express = require("express");
const router = express.Router();

const SAP = require("../models/sap");

router.post("/", createSAP);
router.get("/", getAllSAP);
router.delete("/", deleteAllSAP);

async function createSAP(req, res) {
  const { no } = req?.body;

  // VALIDATE SAP NUMBER
  const isReqBodyValid = sapInputValidation(no);
  if (!isReqBodyValid) {
    return res.status(400).json({
      message: 'Invalid input for "no" field',
    });
  }

  // CHECK WHETHER SAP EXISTS
  try {
    const existingDoc = await SAP.isExisted(no);
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
  const SAPDoc = new SAP({ no });

  let result;
  try {
    result = await SAPDoc.save();
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

async function getAllSAP(req, res) {
  let result;

  try {
    result = await SAP.find();
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

function sapInputValidation(payload) {
  if (
    !payload ||
    payload.trim() === "" ||
    payload.startsWith("-") ||
    !/^\d+$/.test(payload)
  ) {
    return false;
  }
  return true;
}

module.exports = router;
