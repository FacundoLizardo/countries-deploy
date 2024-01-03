const server = require("./src/server");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const sendDataToDb = require("./src/controllers/pushDataToDB");

conn
	.sync()
	.then(() => {
		console.log("Database connected successfully");
	})
	.then(() => sendDataToDb())
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	})
	.catch((error) => console.error("Error during initialization:", error));
