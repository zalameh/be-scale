const mongoose = require("mongoose");

const sapSchema = new mongoose.Schema(
	{
		no: String,
	},
	{ collection: "sap", versionKey: false }
);

const SAP = mongoose.model("sap", sapSchema);

module.exports = SAP;
