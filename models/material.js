const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new mongoose.Schema(
	{
		no: {
			type: String,
			required: true,
		},
		productId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		startTime: {
			type: Number,
			default: null,
		},
		endTime: {
			type: Number,
			default: null,
		},
		duration: {
			type: Number,
			default: null,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
		quantity: {
			type: Number,
			required: true,
			default: null,
		},
		actualQuantity: {
			type: Number,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

materialSchema.statics.isExisted = async function (no, productId) {
	const existingDoc = await this.findOne({ no, productId });
	return existingDoc;
};

const Material = mongoose.model("material", materialSchema);

module.exports = Material;
