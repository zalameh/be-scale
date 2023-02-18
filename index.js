const express = require("express");
const mongoose = require("mongoose");
const sapRouter = require("./routes/sap");

const PORT = 3000;

mongoose.set("strictQuery", false);

const app = express();
app.use(express.json());
main();

async function main() {
	try {
		const mgs = await mongoose.connect("mongodb://127.0.0.1:27017/scale");

		app.get("/", (req, res) => {
			res.send("Hello World!");
		});

		app.use("/sap", sapRouter);

		app.listen(PORT, appListen);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

function appListen() {
	console.log(`Example app listening on port ${PORT}`);
}
