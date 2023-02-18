const express = require("express");
const router = express.Router();

const SAP = require("../models/sap");

router.post("/", (req, res) => {
  const sap = new SAP({ ...req?.body });

  sap
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
