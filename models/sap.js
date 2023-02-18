const mongoose = require("mongoose");

const sapSchema = new mongoose.Schema(
	{
		no: {
			type: String,
			required: true,
		},
	},
	{
		collection: "sap",
		versionKey: false,
		statics: {
			isAlready(no) {
				console.log(no);
				return this.findOne({ no });
			},
		},
	}
);

const SAP = mongoose.model("sap", sapSchema);

module.exports = SAP;
