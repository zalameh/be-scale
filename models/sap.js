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
	}
);

sapSchema.statics.isAlreadyEntered = async function (no) {
	const existingDoc = await this.findOne({ no });
	return existingDoc;
};

const SAP = mongoose.model("sap", sapSchema);

module.exports = SAP;
