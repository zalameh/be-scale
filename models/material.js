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
		versionKey: false,
	}
);

productSchema.statics.isExisted = async function (no, sapId) {
	const existingDoc = await this.findOne({ no, sapId });
	return existingDoc;
};

const Product = mongoose.model("product", productSchema);

module.exports = Product;
