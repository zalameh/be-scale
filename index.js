const express = require("express");
const cors = require("cors");
const csv = require("csvtojson");
const mongoose = require("mongoose");

// REQUIRE COLLECTIONS
const sapRouter = require("./routes/sap");
const productRouter = require("./routes/product");
const materialRouter = require("./routes/material");
const timerRouter = require("./routes/timer");

// Test Schema
const dataSchema = new mongoose.Schema({
	name: String,
	age: Number,
});
const Data = mongoose.model("testcsv", dataSchema);

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
	app.get("/", helloWorld);

	app.use("/sap", sapRouter);
	app.use("/product", productRouter);
	app.use("/material", materialRouter);
	app.use("/timer", timerRouter);

	app.post("/csv", impCsv);

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
	res.send({ message: "Hello World" });
}

function impCsv(req, res) {
	const csvFilePath = req.body.csvFilePath;

	// Use csvtojson to convert the CSV file to an array of objects
	csv()
		.fromFile(csvFilePath)
		.then(jsonArray => {
			// Loop through each object in the array and create a new Mongoose document for it
			jsonArray.forEach(data => {
				const newData = new Data({
					name: data.name,
					age: data.age,
				});
				// Save the new document to the database
				newData.save();
			});
			res.send("CSV data imported successfully");
		})
		.catch(err => {
			console.error(err);
			res.status(500).send("Error importing CSV data");
		});
}

function importCsv(req, res) {
	fs.createReadStream(req.body.file)
		.pipe(csv())
		.on("data", row => {
			// handle missing values
			if (row["name"] == "") {
				row["name"] = last_name;
			} else {
				last_name = row["name"];
			}

			// create a new instance of the model and save to the database
			const newDoc = new myModel({
				name: row["name"],
				age: row["age"],
			});
			newDoc.save();
		})
		.on("end", () => {
			res.send("Import completed!");
		});
}
