const express = require("express");
const cors = require("cors");
const csv = require("csvtojson");
const mongoose = require("mongoose");

// REQUIRE COLLECTIONS
const sapRouter = require("./routes/sap");
const productRouter = require("./routes/product");
const materialRouter = require("./routes/material");
const timerRouter = require("./routes/timer");
const csvRouter = require("./routes/csv");

// MONGOOSE SETUP
mongoose.set("strictQuery", false);

// EXPRESS SETUP
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

// INITIALIZE DB CONNECTION
connectDB();

// INITIALIZE APP
initExpress();

function initExpress() {
	// app.get("/", helloWorld);
	// app.post("/", helloPost);

	app.use("/sap", sapRouter);
	app.use("/product", productRouter);
	app.use("/material", materialRouter);
	app.use("/timer", timerRouter);
	app.use("/csv", csvRouter);

	// app.post("/csv", impCsv);

	app.listen(PORT, appListen);
}

async function connectDB() {
	try {
		const db = await mongoose.connect("mongodb://127.0.0.1:27017/scale");
	} catch (e) {
		consle.error(e);
		console.error(e);
		process.exit(1);
	}
}

function appListen() {
	console.log(`Example app listening on port ${PORT}`);
}

function helloWorld(req, res) {
	res.send({ message: "Hello World", data: req?.body });
}

function helloPost(req, res) {
	return res.status(201).json({ message: "Hello World", data: req?.body });
}
