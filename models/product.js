const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		no: {
			type: String,
			required: true,
		},
		sapId: {
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
