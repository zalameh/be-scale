const express = require("express");
const mongoose = require("mongoose");
const sapRouter = require("./routes/sap");

// MONGOOSE SETUP
mongoose.set("strictQuery", false);

// EXPRESS SETUP
const PORT = 3000;
const app = express();
app.use(express.json());

// INITIALIZE DB CONNECTION
connectDB();

// INITIALIZE APP
initExpress();

async function initExpress() {
	try {
		app.get("/", helloWorld);

		app.use("/sap", sapRouter);

		app.listen(PORT, appListen);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
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
	res.send("Hello World!");
}
